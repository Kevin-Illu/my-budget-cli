import DB from "../core/db";
import { ResiliencePolicy } from "../core/resilience.builder";
import ServiceLocator from "../services/locator";
import Logger from "../services/logger";
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

    db.execute((s) => s.init());
    return db;
  });

  const dbService = ServiceLocator.get("db");

  await dbService.execute(async (db) => {
    Logger.info("Creating database schema if not exists...");
    const queries = await db.scriptToQueries(Env.env.DB_SCHEMA_PATH);
    queries.forEach((query: string) => db.db.run(query));
  });

  if (Env.env.ENVIRONMENT === "dev") {
    await dbService.execute(async (db) => {
      const row = db.db
        .query("select count(*) as count from source_funding")
        .get();

      if (row && row.count > 0) {
        Logger.info("The database is already filled");
        return;
      }

      Logger.info("Filling the database with data ;)");
      const queries = await db.scriptToQueries(Env.env.DB_SEED_PATH);
      queries.forEach((query: string) => db.db.run(query));
    });
  }

  Logger.info("The database is ready");
}
