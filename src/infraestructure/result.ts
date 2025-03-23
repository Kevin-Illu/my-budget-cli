type Success<T> = { success: true; value: T };
type Failure<E = Error> = { success: false; error: E };

type ResultType<T, E> = Success<T> | Failure<E>;

export default class Result<R, E = Error> {
    private constructor(private readonly result: ResultType<R, E>) { }

    static ok<T>(value: T): Result<T, never> {
        return new Result<T, never>({ success: true, value });
    }

    static err<E>(error: E): Result<never, E> {
        return new Result<never, E>({ success: false, error });
    }

    private isFailure(result: ResultType<R, E>): result is Failure<E> {
        return !result.success;
    }

    get value(): R | undefined {
        return this.result.success ? this.result.value : undefined;
    }

    get error(): E | undefined {
        return this.isFailure(this.result) ? this.result.error : undefined;
    }

    isSuccess(): boolean {
        return this.result.success;
    }

    isError(): boolean {
        return !this.result.success;
    }

    map<U>(fn: (value: R) => U): Result<U, E> {
        if (this.result.success) {
            return Result.ok(fn(this.result.value));
        } else if (this.isFailure(this.result)) {
            return Result.err<E>(this.result.error);
        }
        throw new Error("Unexpected state in map");
    }

    flatMap<U>(fn: (value: R) => Result<U, E>): Result<U, E> {
        if (this.result.success) {
            return fn(this.result.value);
        } else if (this.isFailure(this.result)) {
            return Result.err<E>(this.result.error);
        }
        throw new Error("Unexpected state in flatMap");
    }

    unwrap(): R {
        if (this.result.success) {
            return this.result.value;
        } else if (this.isFailure(this.result)) {
            throw new Error(`Called unwrap on an error result: ${this.result.error}`);
        }
        throw new Error("Unexpected state in unwrap");
    }

    unwrapOr(defaultValue: R): R {
        return this.result.success ? this.result.value : defaultValue;
    }

    unwrapOrElse(fn: (error: E) => R): R {
        return this.result.success ? this.result.value : fn(this.getError());
    }

    private getError(): E {
        if (this.isFailure(this.result)) {
            return this.result.error;
        }
        throw new Error("Called getError on a success result");
    }
}
