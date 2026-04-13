import { z } from "zod";
import { StringModule } from "../utils/string";

const envSchema = z.object({
  ENVIRONMENT: z.enum(["dev", "prod"]),
  LOG_FILE_PATH: z.string(),
  SETTINGS_FILE_PATH: z.string(),
  DATABASE_PATH: z.string(),
  STORE_TYPE: z.enum(["sqlite", "json", "memory"]),
  DB_SCHEMA_PATH: z.string(),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  const err = z.treeifyError(result.error, (e) => e.message).properties;
  throw new Error(
    `Invalid Environment Variables:\n${StringModule.prettifyJSON(err)}`,
  );
}

export default abstract class Env {
  public static readonly env = result.data;
}
