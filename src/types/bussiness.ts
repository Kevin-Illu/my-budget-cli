import { BussinesLogic } from "../consts";
import { Expense } from "./entities";

export interface UserTransaction extends Omit<Expense, "id" | "date"> { }

export namespace ApplicationTypes {
    export type ApplicationCapabilities = typeof BussinesLogic.USER_ACTIONS_SCOPES.application;
    export type ApplicationActionType = ApplicationCapabilities[number];

    /*
    * This type represents the actions that the user can do with the expenses
    */
    export type ExpensesCapabilities = typeof BussinesLogic.USER_ACTIONS_SCOPES.expenses;
    export type ExpensesActionType = ExpensesCapabilities[number];

    /*
    * Actions the the user can do in the application
    */
    export type ActionType =
        ApplicationActionType
        | ExpensesActionType;

    export type Action<P> = {
        type: ActionType,
        payload?: P
    }
}