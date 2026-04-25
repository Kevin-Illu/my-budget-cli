import { ExpenseRepository } from "@budget/infra/sqlite/expense.repo";
import DB from "@budget/core/db";
import ServiceLocator from "@budget/core/locator";
import Logger from "@budget/core/logger";
import { ResiliencePolicy } from "@budget/core/resilience.builder";
import Env from "./env";
import { TOKENS } from "@budget/core/locator.keys";
import { FundingSourceRepository } from "@budget/infra/sqlite/funding-source.repo";

/**
 * Here is defined all the configuration and the setup
 * of all the services in the aplication.
 */
export default async function boostrap() {
  // The initializacion of the logger is necesary to create the
  // log file
  await Logger.init();

  ServiceLocator.register(TOKENS.db, () => {
    const dbInstance = new DB();
    const db = new ResiliencePolicy<DB>(dbInstance)
      .when(
        (err) =>
          err.code === "SQLITE_CANTOPEN" || err.code === "SQLITE_CORRUPT",
      )
      .whitRetries(3)
      .whitRecovery(async () => {
        await dbInstance.init();
        return true;
      });

    // FIX: await this call somehow
    db.execute(async (s) => await s.init());

    return db;
  });

  ServiceLocator.register(TOKENS.expenseRepo, (locator) => {
    const db = locator.get(TOKENS.db);
    return new ExpenseRepository(db);
  });

  ServiceLocator.register(TOKENS.fundingSourceRepo, (locator) => {
    const db = locator.get(TOKENS.db);
    return new FundingSourceRepository(db);
  });

  //
  //
  // initializacion of the db to make inserts
  //
  //
  const dbService = ServiceLocator.get(TOKENS.db);

  await dbService.execute(async (db) => {
    Logger.info("Creating database schema if not exists...");
    await db.executeScript(Env.env.DB_SCHEMA_PATH);
  });

  if (Env.env.ENVIRONMENT === "dev" || Env.env.ENVIRONMENT === "test") {
    await dbService.execute(async (db) => {
      const row = await db.query`select count(*) as total from funding_source`;
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
