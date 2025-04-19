import { ApplicationTypes, Commands } from "@budgetTypes/bussiness";
import ExpensesView from "../views/budget/expenses.view";
import { BusinessLogic } from "../consts";
import APPLICATION_COMMANDS = BusinessLogic.APPLICATION_COMMANDS;

export default class ExpensesPresenter {
  constructor(private view: ExpensesView) {}

  async displayUserOptions(): Promise<ApplicationTypes.ApplicationHistoryActions> {
    do {
      let command:
        | Commands.ExpenseCommands
        | ApplicationTypes.ApplicationHistoryActions;
      command = await this.view.getUserChoice();

      if (
        command === APPLICATION_COMMANDS.history.goBack ||
        command === APPLICATION_COMMANDS.history.goForward
      ) {
        return command as ApplicationTypes.ApplicationHistoryActions;
      }

      // TODO: execute actions for expenses :-)
    } while (true);
  }
}
