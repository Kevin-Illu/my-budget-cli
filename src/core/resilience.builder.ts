import Logger from "../services/logger";
import TryCatch from "./result";

type ErrorPredicate = (error: any) => boolean;

export class ResiliencePolicy<T> {
  private recoveryLogic?: () => Promise<boolean>;
  private errorFilter: ErrorPredicate = () => true; // default all the errors
  private retries = 3;

  constructor(private service: T) {}

  /**
   *
   * @param logic set up the recovery logic for the current service.
   *
   * @returns ResiliencePolicy
   */
  whitRecovery(logic: () => Promise<boolean>): this {
    this.recoveryLogic = logic;
    return this;
  }

  /**
   *
   * @param condition filter when the recovery should be executed
   * @returns ResiliencePolicy
   */
  when(condition: ErrorPredicate): this {
    this.errorFilter = condition;
    return this;
  }

  /**
   * Configure the number of tries the ResiliencePolicy would
   * make to recover the current service.
   *
   * @param count number of retries
   * @returns ResiliencePolicy
   */
  withRetries(count: number) {
    this.retries = count;
    return this;
  }

  /**
   * A method to call a method of the original service
   * passed on the composition
   *
   * @param action function to access the origial service
   * @returns void
   */
  async execute(action: (service: T) => Promise<any>) {
    let lastError: Error;

    for (let i = 0; i <= this.retries; i++) {
      const actionResult = await TryCatch.run(
        async () => await action(this.service as T),
      );

      // if the try is success then we stop trying
      // by returning the result
      if (actionResult.isSuccess()) {
        return actionResult.value;
      }

      lastError = actionResult.error;

      const isRecoverable = this.errorFilter(lastError);

      if (this.recoveryLogic && isRecoverable && i < this.retries) {
        Logger.internal(
          `[Resilience] Intento ${i + 1} fallido. Ejecutando recuperación...`,
        );

        const recovered = await this.recoveryLogic();

        if (!recovered) {
          throw new Error("Recovery Logic Failed to restore service");
        }

        // wait a bit to try again.
        await new Promise((res) => setTimeout(res, 500 * i));
        continue;
      } else {
        break;
      }
    }

    // if we can't recover the service
    // we trhow the error :/
    throw lastError;
  }
}
