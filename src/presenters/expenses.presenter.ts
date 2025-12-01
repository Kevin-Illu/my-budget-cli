import { ApplicationTypes, ExpensesTypes } from "@budgetTypes/bussiness";
import ExpensesView from "../views/expenses.view";
import { BusinessLogic } from "../consts";
import APPLICATION_COMMANDS = BusinessLogic.APPLICATION_CAPABILITIES;
import ApplicationActions = ApplicationTypes.ApplicationActions;
import ExpensesActions = ExpensesTypes.ExpensesActions;
import AppContext from "../infraestructure/app.context";
import PresenterBase from "./presenter.base";

export default class ExpensesPresenter extends PresenterBase
  implements Presentation.Presenter {
  historyManager = AppContext.getHistoryManager();

  constructor(private view: ExpensesView) {
    super();
  }

  async displayMenu(): Promise<ApplicationTypes.ApplicationActions> {
    let command: ExpensesTypes.ExpensesActions | ApplicationActions =
      await this.view.getUserChoice();

    while (
      command !== APPLICATION_COMMANDS.app.actions.exit
      && command !== APPLICATION_COMMANDS.app.actions.listExpensesOptions
    ) {
      command = await this.dispatchCommand(command);
    }

    return command;
  }

  async dispatchCommand(
    action: ExpensesActions | ApplicationActions,
  ) {
    switch (action) {
      case APPLICATION_COMMANDS.business.expenses.actions.list: {
        const listOfExpenses = await AppContext.commandBus.execute(
          APPLICATION_COMMANDS.business.expenses.commands.list
        )

        const response = await this.view.listExpenses(listOfExpenses);

        if (response.wants_to_add) {
          return APPLICATION_COMMANDS.business.expenses.actions.add;
        }

        if (response.history_action) {
          return response.history_action;
        }

        // TODO: handle edit/delete based on selected expense id
        // if (response.selected_expense_id)

        return APPLICATION_COMMANDS.business.expenses.actions.list;
      }
      case APPLICATION_COMMANDS.business.expenses.actions.add:
      case APPLICATION_COMMANDS.business.expenses.actions.edit:
      case APPLICATION_COMMANDS.business.expenses.actions.remove:
        const newCommand = await this.view.getUserChoice();
        return newCommand;
      case APPLICATION_COMMANDS.app.history.actions.goBack:
      case APPLICATION_COMMANDS.app.history.actions.goForward:
        const resolvedCommand = this.resolveHistoryCommand(action);
        return resolvedCommand;
      default:
        return action;
    }
  }
}
