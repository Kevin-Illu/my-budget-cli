import { ApplicationTypes, Commands } from "@budgetTypes/bussiness";
import ExpensesView from "../views/budget/expenses.view";
import { BusinessLogic } from "../consts";
import APPLICATION_COMMANDS = BusinessLogic.APPLICATION_CAPABILITIES;
import ApplicationActions = ApplicationTypes.ApplicationActions;

export default class ExpensesPresenter {
  constructor(private view: ExpensesView) {}

  async displayUserOptions(): Promise<ApplicationTypes.ApplicationHistoryActions> {
    do {
      let command:
        | ApplicationTypes.ApplicationActions
        | Commands.ExpenseCommands;

      command = await this.view.getUserChoice();

      if (
        command === APPLICATION_COMMANDS.app.history.actions.goBack ||
        command === APPLICATION_COMMANDS.app.history.actions.goForward ||
        command === APPLICATION_COMMANDS.app.actions.exit
      ) {
        return command as ApplicationTypes.ApplicationHistoryActions;
      }

      // TODO: execute actions for expenses :-)
    } while (true);
  }
}
