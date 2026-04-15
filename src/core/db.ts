import TryCatch from "../core/result";
import { appconfig } from "../config/app";
import File from "../core/file.io";
import Logger from "../services/logger";
import { SQL } from "bun";
const { FILE_PATHS } = appconfig;

export default class DB {
  private _sql: SQL;

  public async init() {
    const result = await TryCatch.run(async () => {
      Logger.info("Initializing database...");

      this._sql = new SQL(FILE_PATHS.databasepath, {
        adapter: "sqlite",
        strict: true,
        create: true,
      });

      await this._sql`PRAGMA foreign_keys = ON;`;
      Logger.info("The database is initializared");
    });

    if (result.isError()) {
      Logger.error("Database failed!", result.error);
      process.exit(1);
    }
  }

  /**
   * El famoso Tagged Template de Bun para consultas seguras y rápidas.
   * Uso: const user = db.query`SELECT * FROM users WHERE id = ${id}`.get();
   */
  public get query(): SQL {
    return this._sql;
  }

  /**
   * Ejecuta una serie de instrucciones dentro de una transacción.
   * Devuelve una función que, al ser llamada, inicia la transacción.
   *
   * Aveces gemini hace paro de los buenos :0
   */
  public transaction<Args extends any[], R>(
    cb: (sql: any, ...args: Args) => Promise<R> | R,
  ): (...args: Args) => Promise<R> {
    // Retornamos una función que acepta los argumentos
    return (...args: Args): Promise<R> => {
      return this._sql.transaction(async (tx) => {
        return await cb(tx, ...args);
      }) as Promise<R>;
    };
  }

  /**
   * Ejecuta un archivo SQL completo.
   */
  public async executeBunScript(filepath: string): Promise<void> {
    await this._sql.file(filepath);
    Logger.info(`Script ${filepath} executed successfully.`);
  }

  /**
   * Ejecuta un archivo SQL con múltiples sentencias.
   */
  public async executeScript(filepath: string): Promise<void> {
    const queries = await this.scriptToQueries(filepath);

    await this._sql.transaction(async (tx) => {
      // Is important to execute one by one because
      // unsafe dont support multiples statements :/
      for (const query of queries) {
        await tx.unsafe([query] as any);
      }
    });

    Logger.info(
      `Script ${filepath} executed successfully (${queries.length} queries).`,
    );
  }

  public async executeFile(filepath: string) {
    await this._sql.file(filepath);
  }

  /**
   * Get an Array of strings where strings represent
   * each query clause you want to execute.
   *
   * @param filepath path for the sql file to parse
   * @returns Array<String>
   */
  public async scriptToQueries(filepath: string): Promise<string[]> {
    const script = await File.file(filepath);
    if (script.isError()) throw script.error;

    const scriptText = await script.value.text();

    return scriptText
      .replace(/--.*$/gm, "")
      .split(";")
      .map((query) => query.trim())
      .filter((query) => query.length > 0);
  }

  /**
   * Cierra la conexión de forma segura.
   */
  public close() {
    this._sql.close();
  }
}
