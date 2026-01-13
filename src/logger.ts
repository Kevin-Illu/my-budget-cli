import { FILE_PATHS, LogLevel, type TLogLevel } from "./const";
import TryCatch from "./result";
import File from "./file.io";

type LogPayload = {
  message: string;
  level?: TLogLevel;
  error?: unknown;
  context?: Record<string, unknown>;
};

export class Logger {
  private readonly logFilePath = FILE_PATHS.logfilepath;

  async init(): Promise<void> {
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
        level: "INFO",
        message: "The logs file was created successfully",
      });

      return;
    }

    this.newLine();
    this.info("STARTING LOGGIN");
  }

  async log({
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

  info(message: string, context?: Record<string, unknown>) {
    return this.log({ message, level: LogLevel.info, context });
  }

  warn(message: string, context?: Record<string, unknown>) {
    return this.log({ message, level: LogLevel.warn, context });
  }

  error(message: string, error?: unknown, context?: Record<string, unknown>) {
    return this.log({ message, level: LogLevel.error, error, context });
  }

  internal(message: string, context?: Record<string, unknown>) {
    return this.log({ message, level: LogLevel.internal, context });
  }

  private formatError(error: unknown): string {
    if (error instanceof Error) {
      return `${error.name}: ${error.message}\n${error.stack ?? ""}`;
    }
    return String(error);
  }

  private async newLine() {
    await File.append(this.logFilePath, "\n");
  }
}
