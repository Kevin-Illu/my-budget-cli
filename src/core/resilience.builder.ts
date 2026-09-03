import Logger from "./logger";
import { Failure, Result, TryCatch } from "./result";

type ErrorPredicate<E> = (error: E) => boolean;

type AsyncFn<T, R> = (service: T) => Promise<R>;

export class ResiliencePolicy<T, E = Error> {
  private recoveryLogic?: () => Promise<boolean>;
  private errorFilter: ErrorPredicate<E> = () => true;
  private retries = 3;
  private delay = 500;

  constructor(private readonly service: T) {}

  withRecovery(logic: () => Promise<boolean>): this {
    this.recoveryLogic = logic;
    return this;
  }

  when(condition: ErrorPredicate<E>): this {
    this.errorFilter = condition;
    return this;
  }

  withRetries(count: number): this {
    this.retries = count;
    return this;
  }

  withDelay(ms: number): this {
    this.delay = ms;
    return this;
  }

  async execute<R>(action: AsyncFn<T, R>): Promise<Result<R, E>> {
    let lastError: E | null = null;

    for (let i = 0; i <= this.retries; i++) {
      const result = await TryCatch.run<R, E>(() => action(this.service));

      if (result.isOk()) {
        return result;
      }

      let error = (result as unknown as Failure<E>).error;
      lastError = error;

      const shouldRecover =
        this.recoveryLogic && this.errorFilter(error) && i < this.retries;

      if (!shouldRecover) break;

      Logger.internal(
        `[Resilience] Retry ${i + 1} failed. Attempting recovery...`,
      );

      const recovered = await this.recoveryLogic!();

      if (!recovered) {
        return Result.err(error);
      }

      await this.sleep(this.delay * (i + 1));
    }

    return Result.err(lastError as E);
  }

  private sleep(ms: number) {
    return new Promise((res) => setTimeout(res, ms));
  }
}
