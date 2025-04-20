import { ApplicationTypes, Commands } from "@budgetTypes/bussiness";
import TryCatch from "../../infraestructure/trycatch";
import { select } from "@inquirer/prompts";
import View from "../view";

export default class ExpensesView extends View {
  private expensesOptions = [
    {
      name: "Create a new expense",
      value: "expense:action:add",
      description: "create a new transaction",
    },
    {
      name: "Edit the amount of the expense",
      value: "expense:action:edit",
      description: "choose a transaction to edit",
    },
    {
      name: "Delete expense",
      value: "expense:action:delete",
      description: "delete an specific transactions",
    },
    {
      name: "List of expenses",
      value: "expense:action:list",
      description: "display all the transactions",
    },
    {
      name: "<- Go back",
      value: "application:action:history:go-back",
      description: "go to application",
    },
  ];

  async getUserChoice() {
    this.clearView();

    const action = await TryCatch.runAsync(() =>
      select({
        message: "Your expenses",
        choices: this.expensesOptions,
      }),
    ).then((r) => r.unwrapOr("application:action:exit"));

    console.log(action);

    return action as
      | Commands.ExpenseCommands
      | ApplicationTypes.ApplicationActions;
  }
}
