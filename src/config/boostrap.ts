import { ResiliencePolicy } from "../core/resilience.builder";
import DB from "../services/db";
import ServiceLocator from "../services/locator";
import Logger from "../services/logger";

/**
 * Here is defined all the configuration and the set up
 * of all the services in the aplication.
 */
export default async function boostrap() {
  // The initializacion of the logger is necesary to create the
  // log file
  await Logger.init();

  ServiceLocator.register("db", () => {
    const dbInstance = new DB();
    const db = new ResiliencePolicy(dbInstance)
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

  const db = ServiceLocator.get("db");
}
