import z from "zod";

export const DEFAULT_SETTINGS = {
  store: "default",
};

export const SETTINGS = z.object({
  store: z
    .string()
    .nonempty("the store can be default | sqllite | file system"),
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
