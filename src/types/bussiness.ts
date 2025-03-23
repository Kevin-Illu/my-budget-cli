import { BussinesLogic } from "../consts";
import { BussinessEntities } from "./entities";

export interface UserTransaction extends Omit<BussinessEntities.Expense, "id" | "date"> { }

export namespace ApplicationTypes {
    export type UserCommands = typeof BussinesLogic.USER_COMMANDS[number];
    export type ExpenseCommands = Extract<UserCommands, `expense:${string}`>;
    export type ApplicationCommands = Extract<UserCommands, `application:${string}`>;
}
