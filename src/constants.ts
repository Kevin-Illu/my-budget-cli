import z from "zod";

/**
 * @description all the app config files the app needs to know internally
 * like his own cofiguration or where to save the logs or whatever it needs.
 */
export module appconfig {
  /**
   * @constant FILE_PATHS
   * @description A list of paths where my app can found config,log,databse files
   * to operate correctly.
   */
  export const FILE_PATHS = {
    logfilepath: "./data/budget.logs.txt",
    settingsfilepath: "./data/budgetrc.json",
    databasepath: "./data/budgetdb.sqlite",
  };

  /**
   * Is used to set the default settings in case the file
   * not exist
   */
  export const DEFAULT_SETTINGS: TSettings = {
    store: "sqlite",
  };

  /**
   * It's used to check the user settings file is ok and it not
   * contains any typo or a invented options or wherever that is not allowed by me
   */
  export const SETTINGS = z.object({
    store: z.union(
      [z.literal("sqlite"), z.literal("json"), z.literal("memory")],
      { error: "the store can be sqlite | json | memory" },
    ),
  });

  /**
   * A dictionary of log leves my app can log
   * I'ts used to make sure I write it correctly and get the
   * correct the autocomplete and suggestions from typescript.
   */
  export const LogLevel = {
    error: "ERROR",
    warn: "WARN",
    info: "INFO",
    internal: "INTERNAL",
  } as const;
}

// TYPES

/**
 * The type used to ensure type checks.
 */
export type TSettings = z.infer<typeof appconfig.SETTINGS>;

/**
 * Give me autocompletition of the logLevels my app has :)
 */
export type TLogLevel =
  (typeof appconfig.LogLevel)[keyof typeof appconfig.LogLevel];
