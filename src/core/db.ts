import { Database } from "bun:sqlite";
import TryCatch from "../core/result";
import { appconfig } from "../config/app";
import File from "../core/file.io";
import Logger from "../services/logger";
const { FILE_PATHS } = appconfig;

export default class DB {
  private db: Database;

  public async init() {
    const result = await TryCatch.run(async () => {
      Logger.info("Initializing database...");

      this.db = new Database(FILE_PATHS.databasepath, {
        strict: true,
        create: true,
      });
      this.db.run("PRAGMA foreign_keys = ON;");
      Logger.info("The database is initializared");
    });

    if (result.isError()) {
      Logger.error("Database failed!", result.error);
      process.exit(1);
    }
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

    if (script.isError()) {
      throw script.error;
    }

    const scriptText = await script.value.text();

    return scriptText
      .replace(/--.*$/gm, "") // Elimina comentarios de una línea (-- comentario)
      .split(";")
      .map((query) => query.trim())
      .filter((query) => query.length > 0);
  }
}
