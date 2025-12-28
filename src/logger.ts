import { FILE_PATHS, LogLevel, type TLogLevel } from "./const";

type LogPayload = {
  message: string;
  level?: TLogLevel;
  error?: unknown;
  context?: Record<string, unknown>;
};

export class Logger {
  private readonly logFilePath = FILE_PATHS.logfilepath;

  async init(): Promise<void> {
    try {
      const file = Bun.file(this.logFilePath);
      if (!(await file.exists())) {
        await this.info("Logger initialized successfully");
      }
    } catch {
      console.error("Logger initialization failed");
    }
  }

  async log({
    message,
    level = LogLevel.info,
    error,
    context,
  }: LogPayload): Promise<void> {
    try {
      const timestamp = new Date().toISOString();

      const parts = [
        `[${level} | ${timestamp}]`,
        message,
        error ? this.formatError(error) : null,
        context ? JSON.stringify(context) : null,
      ].filter(Boolean);

      const logMessage = parts.join(" | ") + "\n";

      await Bun.write(this.logFilePath, logMessage);
    } catch {
      console.error("Failed to write log entry");
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
}
