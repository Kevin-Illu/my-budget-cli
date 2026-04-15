import DB from "../core/db";
import ServiceLocator from "../core/locator";
import Logger from "../core/logger";
import { ResiliencePolicy } from "../core/resilience.builder";
import Env from "./env";

/**
 * Here is defined all the configuration and the setup
 * of all the services in the aplication.
 */
export default async function boostrap() {
  // The initializacion of the logger is necesary to create the
  // log file
  await Logger.init();

  ServiceLocator.register("db", () => {
    const dbInstance = new DB();
    const db = new ResiliencePolicy<DB>(dbInstance)
      .when(
        (err) =>
          err.code === "SQLITE_CANTOPEN" || err.code === "SQLITE_CORRUPT",
      )
      .withRetries(3)
      .whitRecovery(async () => {
        await dbInstance.init();
        return true;
      });

    db.execute(async (s) => await s.init());
    return db;
  });

  const dbService = ServiceLocator.get("db");

  await dbService.execute(async (db) => {
    Logger.info("Creating database schema if not exists...");
    await db.executeScript(Env.env.DB_SCHEMA_PATH);
  });

  if (Env.env.ENVIRONMENT === "dev") {
    await dbService.execute(async (db) => {
      const row = await db.query`select count(*) as total from source_funding`;
      const total = row[0].total;
      if (row && total > 0) {
        Logger.info("The database is already filled");
        return;
      }

      Logger.info("Filling the database with data ;)");
      await db.executeScript(Env.env.DB_SEED_PATH);
    });
  }

  Logger.info("The database is ready");
}
