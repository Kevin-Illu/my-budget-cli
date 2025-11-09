import TryCatch from "../infraestructure/trycatch";
import { rawlist, select, confirm } from "@inquirer/prompts";
import View from "./view";
import { BusinessLogic } from "../consts";
import { ExpensesTypes } from "@budgetTypes/bussiness";
import { Entities } from "@budgetTypes/entities";

export default class ExpensesView extends View
  implements Presentation.View {
  private expensesOptions = [
    {
      name: "Create a new expense",
      value: BusinessLogic.APPLICATION_CAPABILITIES.business.expenses.actions.add,
      description: "create a new transaction",
    },
    {
      name: "Edit the amount of the expense",
      value: BusinessLogic.APPLICATION_CAPABILITIES.business.expenses.actions.edit,
      description: "choose a transaction to edit",
    },
    {
      name: "Delete expense",
      value: BusinessLogic.APPLICATION_CAPABILITIES.business.expenses.actions.remove,
      description: "delete an specific transactions",
    },
    {
      name: "List of expenses",
      value: BusinessLogic.APPLICATION_CAPABILITIES.business.expenses.actions.list,
      description: "display all the transactions",
    },
    {
      name: "<- Go back",
      value: BusinessLogic.APPLICATION_CAPABILITIES.app.history.actions.goBack,
      description: "go to application",
    },
  ];

  async getUserChoice() {
    this.clearView();

    const command = await TryCatch.runAsync(() =>
      select({
        message: "Your expenses",
        choices: this.expensesOptions,
      })
    ).then((r) => r.unwrapOr(BusinessLogic.APPLICATION_CAPABILITIES.app.history.actions.goBack));


    return command;
  }

  async listExpenses(expenses: Entities.Expense[]) {
    if (expenses.length === 0) {
      const answer = await confirm({
        message: "No expenses found. Do you want to add a new expense?",
        default: true,
      })
      return answer;
    }

    const selection = await rawlist({
      message: "List of expenses",
      choices: expenses.map((expense) => ({
        name: `${expense.description} - $${expense.amount} `,
        value: expense.id,
      })),
    })

    return selection;
  }
}
