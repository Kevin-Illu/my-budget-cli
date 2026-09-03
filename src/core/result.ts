export type Success<T> = { success: true; value: T };
export type Failure<E> = { success: false; error: E };

type ResultType<T, E> = Success<T> | Failure<E>;

export class Result<T, E = Error> {
  private constructor(private readonly result: ResultType<T, E>) {}

  static ok<T>(value: T): Result<T, never> {
    return new Result({ success: true, value });
  }

  static err<E>(error: E): Result<never, E> {
    return new Result({ success: false, error });
  }

  isOk(): this is Result<T, E> & { result: Success<T> } {
    return this.result.success;
  }

  isErr(): this is Result<T, E> & { result: Failure<E> } {
    return !this.result.success;
  }

  map<U>(fn: (value: T) => U): Result<U, E> {
    const res = this.result;
    if (res.success) return Result.ok(fn(res.value));
    return Result.err(res.error);
  }

  mapErr<F>(fn: (error: E) => F): Result<T, F> {
    const res = this.result;
    return res.success ? Result.ok(res.value) : Result.err(fn(res.error));
  }

  flatMap<U>(fn: (value: T) => Result<U, E>): Result<U, E> {
    const res = this.result;
    return res.success ? fn(res.value) : Result.err(res.error);
  }

  async flatMapAsync<U>(
    fn: (value: T) => Promise<Result<U, E>>,
  ): Promise<Result<U, E>> {
    const res = this.result;
    return res.success ? await fn(res.value) : Result.err(res.error);
  }

  tap(fn: (value: T) => void): Result<T, E> {
    const res = this.result;
    if (res.success) fn(res.value);
    return this;
  }

  tapErr(fn: (error: E) => void): Result<T, E> {
    const res = this.result;
    if (!res.success) fn(res.error);
    return this;
  }

  match<U>(handlers: { ok: (value: T) => U; err: (error: E) => U }): U {
    const res = this.result;
    return res.success ? handlers.ok(res.value) : handlers.err(res.error);
  }

  unwrap(): T {
    const res = this.result;
    if (res.success) return res.value;
    const err = res.error;
    throw err instanceof Error ? err : new Error(String(err));
  }

  unwrapOr(defaultValue: T): T {
    const res = this.result;
    return res.success ? res.value : defaultValue;
  }

  unwrapOrElse(fn: (error: E) => T): T {
    const res = this.result;
    return res.success ? res.value : fn(res.error);
  }
}

type MaybePromise<T> = T | Promise<T>;

export class TryCatch {
  static runSync<T, E = Error>(
    fn: () => T,
    mapError?: (e: unknown) => E,
  ): Result<T, E> {
    try {
      return Result.ok(fn());
    } catch (error) {
      return Result.err(mapError ? mapError(error) : (error as E));
    }
  }

  static async run<T, E = Error>(
    fn: () => MaybePromise<T>,
    mapError?: (e: unknown) => E,
  ): Promise<Result<T, E>> {
    try {
      const value = await fn();
      return Result.ok(value);
    } catch (error) {
      return Result.err(mapError ? mapError(error) : (error as E));
    }
  }
}
