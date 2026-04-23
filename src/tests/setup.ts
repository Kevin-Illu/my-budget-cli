import boostrap from "@budget/config/boostrap";
import "@budget/config/env";

import { beforeAll, afterAll } from "bun:test";
import ServiceLocator from "@budget/core/locator";
import { TOKENS } from "@budget/core/locator.keys";
import Logger from "@budget/core/logger";

beforeAll(async () => {
  Logger.internal("The tests is beeing inicializated");
  await boostrap();
  Logger.internal("The tests setup is ready");
});

afterAll(async () => {
  // Teardown: wipe all test data
  const db = ServiceLocator.get(TOKENS.db);
  await db.execute(async (s) => {
    await s.query`DELETE FROM expense WHERE name LIKE 'TEST_%'`;
  });
});
