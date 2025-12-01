import TryCatch from "../infraestructure/trycatch";
import { rawlist, select, confirm } from "@inquirer/prompts";
import View from "./view";
import { BusinessLogic } from "../consts";
import { ExpensesTypes } from "@budgetTypes/bussiness";
import { Entities } from "@budgetTypes/entities";

const EXPENSES_ACTIONS = BusinessLogic.APPLICATION_CAPABILITIES.business.expenses.actions;
const HISTORY_ACTIONS = BusinessLogic.APPLICATION_CAPABILITIES.app.history.actions;

export default class ExpensesView extends View
  implements Presentation.View {
  private expensesOptions = [
    {
      name: "Create a new expense",
      value: EXPENSES_ACTIONS.add,
      description: "create a new transaction",
    },
    {
      name: "Edit the amount of the expense",
      value: EXPENSES_ACTIONS.edit,
      description: "choose a transaction to edit",
    },
    {
      name: "Delete expense",
      value: EXPENSES_ACTIONS.remove,
      description: "delete an specific transactions",
    },
    {
      name: "List of expenses",
      value: EXPENSES_ACTIONS.list,
      description: "display all the transactions",
    },
    {
      name: "<- Go back",
      value: HISTORY_ACTIONS.goBack,
      description: "go to application",
    },
  ];

  private subMenuesOptions = {
    list_of_expenses: [
      {
        name: "Add a new expense",
        value: EXPENSES_ACTIONS.add
      },
      {
        name: "<- Go back",
        value: HISTORY_ACTIONS.goBack
      }
    ]
  }

  async getUserChoice() {
    this.clearView();

    const command = await TryCatch.runAsync(() =>
      select({
        message: "Your expenses",
        choices: this.expensesOptions,
      })
    ).then((r) => r.unwrapOr(HISTORY_ACTIONS.goBack));


    return command;
  }

  async listExpenses(expenses: Entities.Expense[]) {
    const response = {
      selected_expense_id: null,
      wants_to_add: false,
      history_action: null
    }

    if (expenses.length === 0) {
      const answer = await confirm({
        message: "No expenses found. Do you want to add a new expense?",
        default: true,
      })
      return {
        ...response,
        wants_to_add: answer
      };
    }

    const selection = await rawlist({
      message: "List of expenses",
      choices: expenses.map((expense) => ({
        name: `${expense.description} - $${expense.amount} `,
        value: expense.id,
      })).concat(this.subMenuesOptions.list_of_expenses),
    })

    if (selection === EXPENSES_ACTIONS.add) {
      return {
        ...response,
        wants_to_add: true
      };
    }

    if (selection === HISTORY_ACTIONS.goBack) {
      return {
        ...response,
        history_action: HISTORY_ACTIONS.goBack
      };
    }


    return {
      ...response,
      selected_expense_id: selection
    };
  }
}
