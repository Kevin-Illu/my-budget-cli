import { BusinessLogic } from "../consts";
import { BussinessEntities } from "./entities";

export interface UserTransaction
  extends Omit<BussinessEntities.Expense, "id" | "date"> {}

/**
 * Represent all the command available in the system
 */
export type UserCommands = (typeof BusinessLogic.USER_COMMANDS)[number];

export namespace ApplicationTypes {
  export type ApplicationActions = Extract<
    UserCommands,
    `application:${string}`
  >;

  export type ApplicationHistoryActions = Extract<
    UserCommands,
    `application:history:${string}`
  >;

  /**
   * Represent the commands that execute Application and Business logic
   * Omitting System logic like History or Store Management.
   */
  export type UserApplicationCommands = Omit<
    UserCommands,
    ApplicationHistoryActions
  >;
}

export namespace Commands {
  export type Commands = Extract<UserCommands, `${string}:command:${string}`>;

  /**
   * It's used to Identify only the Expenses Actions
   */
  export type ExpenseCommands = Extract<
    UserCommands,
    `expense:command:${string}`
  >;
}
