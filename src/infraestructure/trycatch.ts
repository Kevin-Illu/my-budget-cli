import Result from "./result";

type MaybePromise<T> = T | Promise<T>;

class TryCatch {
    static runSync<T, E = Error>(fn: () => T): Result<T, E> {
        try {
            return Result.ok(fn());
        } catch (error) {
            return Result.err(error as E);
        }
    }

    static async runAsync<T, E = Error>(fn: () => Promise<T>): Promise<Result<T, E>> {
        try {
            return Result.ok(await fn());
        } catch (error) {
            return Result.err(error as E);
        }
    }

    static runMaybeAsync<T, E = Error>(fn: () => MaybePromise<T>): MaybePromise<Result<T, E>> {
        try {
            const result = fn();
            if (result instanceof Promise) {
                return result
                    .then((data) => Result.ok(data))
                    .catch((error) => Result.err(error as E));
            } else {
                return Result.ok(result);
            }
        } catch (error) {
            return Result.err(error as E);
        }
    }
}

export default TryCatch;
