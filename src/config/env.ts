import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  // Allow overriding paths via ENV, but provide defaults
  LOG_FILE_PATH: z.string().default("./data/budget.logs.txt"),
  SETTINGS_FILE_PATH: z.string().default("./data/budgetrc.json"),
  DATABASE_PATH: z.string().default("./data/budgetdb.sqlite"),
  // The store type (sqlite, json, memory)
  STORE_TYPE: z.enum(["sqlite", "json", "memory"]).default("sqlite"),
});

export const env = envSchema.parse(process.env);
