import { Database } from "bun:sqlite";
import { appconfig } from "./config/app";
import Logger from "./logger";
import TryCatch from "./result";
const { FILE_PATHS } = appconfig;

export default abstract class DB {
  static db: Database;

  static async init() {
    const result = await TryCatch.run(async () => {
      Logger.info("Initializing database...");

      this.db = new Database(FILE_PATHS.databasepath, {
        strict: true,
        create: true,
      });

      this.db.run("PRAGMA foreign_keys = ON;");
      await this.createSchema();
    });

    if (result.isError()) {
      Logger.error("Database failed!", result.error);
      return;
    }
  }

  static async createSchema() {
    Logger.info("Creating database schema...");
    // FIX: I need to handle this errors! and stop the aplication!.
    const schema = ``;

    DB.db.run(schema);
    Logger.info("The database is ready");
  }
}
