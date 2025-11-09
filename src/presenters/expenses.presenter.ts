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
      command !== APPLICATION_COMMANDS.app.history.actions.goBack
      && command !== APPLICATION_COMMANDS.app.history.actions.goForward
      && command !== APPLICATION_COMMANDS.app.actions.exit
    ) {
      command = await this.dispatchCommand(command);
    }

    // Return to the main menu because we dont have other possible actions 
    command = APPLICATION_COMMANDS.app.actions.listOptions;

    return command;
  }

  async dispatchCommand(
    action: ApplicationActions | ExpensesActions,
  ) {
    switch (action) {
      case APPLICATION_COMMANDS.business.expenses.actions.list: {

        const listOfExpenses = await AppContext.commandBus.execute(
          APPLICATION_COMMANDS.business.expenses.commands.list
        )

        console.table(listOfExpenses);

        return APPLICATION_COMMANDS.app.actions.listOptions;
      }
      case APPLICATION_COMMANDS.business.expenses.actions.add:
      case APPLICATION_COMMANDS.business.expenses.actions.edit:
      case APPLICATION_COMMANDS.business.expenses.actions.remove:
        const newCommand = await this.view.getUserChoice();
        return newCommand;
      case APPLICATION_COMMANDS.app.history.actions.goBack:
      case APPLICATION_COMMANDS.app.history.actions.goForward:
        return this.resolveHistoryCommand(action);
      default:
        return APPLICATION_COMMANDS.app.actions.exit;
    }
  }
}
