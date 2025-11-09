import { BusinessLogic } from "../consts";
import { Entities } from "./entities";

export interface UserTransaction
  extends Omit<Entities.Expense, "id" | "date"> { }

/**
 * Represent all the command available in the system
 */
export type UserCommandsAndActions = (typeof BusinessLogic.CAPABILITIES)[number];

export namespace ApplicationTypes {
  export type ApplicationActions = Extract<
    UserCommandsAndActions,
    `application:action:${string}`
  >;

  export type ApplicationHistoryActions = Extract<
    UserCommandsAndActions,
    `application:action:history:${string}`
  >;
}

export namespace ExpensesTypes {
  export type ExpensesActions = Extract<
    UserCommandsAndActions,
    `expenses:action:${string}`
  >;
}

export namespace Commands {
  export type Commands = Extract<UserCommandsAndActions, `${string}:command:${string}`>;
}
