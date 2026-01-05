import { FILE_PATHS, LogLevel, type TLogLevel } from "./const";
import TryCatch from "./result";

type LogPayload = {
  message: string;
  level?: TLogLevel;
  error?: unknown;
  context?: Record<string, unknown>;
};

export class Logger {
  private readonly logFilePath = FILE_PATHS.logfilepath;

  async init(): Promise<void> {
    const result = await TryCatch.run(() => Bun.file(this.logFilePath));

    if (result.isError()) {
      console.error("Logger initialization failed");
      return;
    }

    const file = result.value;

    if (!(await file.exists())) {
      await this.info("Logger initialized successfully");
    }

    this.info("Loggin is ready");
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

    const result = await TryCatch.run(() =>
      Bun.write(this.logFilePath, logMessage),
    );

    if (result.isError()) {
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
