import { BusinessLogic } from "../consts";
import { BussinessEntities } from "./entities";

export interface UserTransaction
  extends Omit<BussinessEntities.Expense, "id" | "date"> {}

/**
 * Represent all the command available in the system
 */
export type UserCommands = (typeof BusinessLogic.CAPABILITIES)[number];

export namespace ApplicationTypes {
  export type ApplicationActions = Extract<
    UserCommands,
    `application:action:${string}`
  >;

  export type ApplicationHistoryActions = Extract<
    UserCommands,
    `application:action:history:${string}`
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
