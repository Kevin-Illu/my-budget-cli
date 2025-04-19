import { ApplicationTypes, Commands } from "@budgetTypes/bussiness";
import TryCatch from "../../infraestructure/trycatch";
import { select } from "@inquirer/prompts";
import View from "../view";

export default class ExpensesView extends View {
  private expensesOptions = [
    {
      name: "Create a new expense",
      value: "expense:add",
      description: "create a new transaction",
    },
    {
      name: "Edit the amount of the expense",
      value: "expense:edit",
      description: "choose a transaction to edit",
    },
    {
      name: "Delete expense",
      value: "expense:delete",
      description: "delete an specific transactions",
    },
    {
      name: "List of expenses",
      value: "expense:list",
      description: "display all the transactions",
    },
    {
      name: "<- Go back",
      value: "application:history:go-back",
      description: "go to application",
    },
  ];

  async getUserChoice() {
    console.clear();

    const userSelection = await TryCatch.runAsync(() =>
      select({
        message: "Your expenses",
        choices: this.expensesOptions,
      }),
    );

    return userSelection.value as
      | Commands.ExpenseCommands
      | ApplicationTypes.ApplicationHistoryActions;
  }
}
