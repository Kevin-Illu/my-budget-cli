import z from "zod";

export const DEFAULT_SETTINGS = {
  store: "default",
};

export const SETTINGS = z.object({
  store: z.union(
    [z.literal("sqlite"), z.literal("json"), z.literal("memory")],
    { error: "the store can be sqlite | json | memory" },
  ),
});

export type TSettings = z.infer<typeof SETTINGS>;

export const FILE_PATHS = {
  logfilepath: "./data/budget.logs.txt",
  settingsfilepath: "./data/budgetrc.json",
};

// desribe the type of logs the app has
export const LogLevel = {
  error: "ERROR",
  warn: "WARN",
  info: "INFO",
  internal: "INTERNAL",
} as const;

export type TLogLevel = (typeof LogLevel)[keyof typeof LogLevel];
