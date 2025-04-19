import { ApplicationTypes } from "@budgetTypes/bussiness";
import BudgetView from "../views/budget/budget.view";
import ExpensesPresenter from "./expenses.presenter";
import { BusinessLogic } from "../consts";
import ResourceProvider from "../infraestructure/resource.provider";
import APPLICATION_COMMANDS = BusinessLogic.APPLICATION_COMMANDS;

export default class BudgetPresenter {
  historyManager = ResourceProvider.getHistoryManager();

  constructor(
    private view: BudgetView,
    private expensesPresenter: ExpensesPresenter,
  ) {}

  async startBudgetPresenter() {
    // TODO: execute the command :)

    let command: ApplicationTypes.UserApplicationCommands;
    command = await this.view.getUserChoice();

    this.historyManager.visit(APPLICATION_COMMANDS.app.listOptions);

    do {
      if (command === APPLICATION_COMMANDS.app.exit) {
        this.view.sayGoodBye();
        break;
      }

      if (command === APPLICATION_COMMANDS.business.expenses.listOptions) {
        this.historyManager.visit(
          APPLICATION_COMMANDS.business.expenses.listOptions,
        );
        command =
          (await this.expensesPresenter.displayUserOptions()) ??
          APPLICATION_COMMANDS.app.exit;
      }

      // if the command doesn't is a business command then
      // should be a history command and need to resolve
      // from the history manager to get the application command
      command = this.resolveHistoryCommand(
        command as ApplicationTypes.ApplicationHistoryActions,
      );

      // if it doesn't is one command of the business command then
      // should be the application.
      if (command === APPLICATION_COMMANDS.app.listOptions) {
        this.historyManager.visit(APPLICATION_COMMANDS.app.listOptions);
        command = await this.view.getUserChoice();
      }
    } while (true);
  }

  resolveHistoryCommand(
    commandHistory: ApplicationTypes.ApplicationHistoryActions,
  ) {
    if (commandHistory === APPLICATION_COMMANDS.history.goBack) {
      ResourceProvider.getHistoryManager().back();
      return ResourceProvider.getHistoryManager().getCurrent();
    }

    // go forward
    ResourceProvider.getHistoryManager().forward();
    return ResourceProvider.getHistoryManager().getCurrent();
  }
}
