import File from "./file.io";
import { appconfig, type TLogLevel } from "./config/app";
const { FILE_PATHS, LogLevel } = appconfig;

type LogPayload = {
  message: string;
  level?: TLogLevel;
  error?: unknown;
  context?: Record<string, unknown>;
};

export default class Logger {
  static readonly logFilePath = FILE_PATHS.logfilepath;

  static async init(): Promise<void> {
    const result = await File.file(this.logFilePath);

    if (result.isError()) {
      throw result.error;
    }

    const logFile = result.value;
    const exist = await logFile.exists();

    if (!exist) {
      await File.write(
        this.logFilePath,
        "------------ [LOGGER INICIALICED] ------------\n",
      );

      this.log({
        level: LogLevel.error,
        message: "The logs file was created successfully",
      });

      return;
    }

    this.newLine();
    this.info("STARTING LOGGIN");
  }

  static async log({
    message,
    level = LogLevel.info,
    error,
    context,
  }: LogPayload): Promise<void> {
    const timestamp = new Date().toISOString();

    const parts = [
      `[${level}]`,
      `[${timestamp}]`,
      message,
      error ? this.formatError(error) : null,
      context ? JSON.stringify(context) : null,
    ].filter(Boolean);

    const logMessage = parts.join(" | ") + "\n";

    const result = await File.append(this.logFilePath, logMessage);

    if (result.isError()) {
      console.error("Failed to write log entry");
      throw result.error;
    }
  }

  static info(message: string, context?: Record<string, unknown>) {
    return this.log({ message, level: LogLevel.info, context });
  }

  static warn(message: string, context?: Record<string, unknown>) {
    return this.log({ message, level: LogLevel.warn, context });
  }

  static error(
    message: string,
    error?: unknown,
    context?: Record<string, unknown>,
  ) {
    return this.log({ message, level: LogLevel.error, error, context });
  }

  static internal(message: string, context?: Record<string, unknown>) {
    return this.log({ message, level: LogLevel.internal, context });
  }

  static formatError(error: unknown): string {
    if (error instanceof Error) {
      return `${error.name}: ${error.message}\n${error.stack ?? ""}`;
    }
    return String(error);
  }

  static async newLine() {
    await File.append(this.logFilePath, "\n");
  }
}
