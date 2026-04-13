import { Database } from "bun:sqlite";
import Logger from "./logger";
import TryCatch from "../core/result";
import { appconfig } from "../config/app";
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

      Logger.info("Creating database schema...");
      await this.createSchema();
      Logger.info("The database is ready");
    });

    if (result.isError()) {
      Logger.error("Database failed!", result.error);
      process.exit(1);
    }
  }

  /**
   * Allow us to use this:
   * const users = db.sql`SELECT * FROM users WHERE active = ${1}`;
   */
  public get sql() {
    return this.db.query.bind(this.db);
  }

  private async createSchema() {
    // FIX: I need to handle this errors! and stop the aplication!.
    const schema = `CREATE TABLE IF NOT EXISTS logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      log TEXT NOT NULL
    )`;
    this.db.run(schema);
  }
}
