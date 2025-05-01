import { ApplicationTypes, Commands } from "@budgetTypes/bussiness";
import BudgetView from "../views/budget/budget.view";
import ExpensesPresenter from "./expenses.presenter";
import { BusinessLogic } from "../consts";
import ResourceProvider from "../infraestructure/resource.provider";
import APPLICATION_COMMANDS = BusinessLogic.APPLICATION_CAPABILITIES;
import ApplicationActions = ApplicationTypes.ApplicationActions;

export default class BudgetPresenter {
  historyManager = ResourceProvider.getHistoryManager();

  constructor(
    private view: BudgetView,
    private expensesPresenter: ExpensesPresenter,
  ) {}

  async startBudgetPresenter() {
    let command: ApplicationTypes.ApplicationActions;
    command = await this.view.getUserChoice();
    this.historyManager.visit(APPLICATION_COMMANDS.app.actions.listOptions);

    // this runs recursively
    await this.handleCommand(command);
  }

  async handleCommand(command: Commands.Commands | ApplicationActions) {
    switch (command) {
      case APPLICATION_COMMANDS.app.actions.exit:
        this.view.sayGoodBye();
        console.log({
          history: ResourceProvider.getHistoryManager().getHistory(),
        });
        return;

      case APPLICATION_COMMANDS.business.expenses.actions.listOptions:
        this.historyManager.visit(command);
        const nextCommand =
          (await this.expensesPresenter.displayUserOptions()) ??
          APPLICATION_COMMANDS.app.actions.exit;
        return await this.handleCommand(nextCommand);

      case APPLICATION_COMMANDS.app.actions.listOptions:
        const userChoice = await this.view.getUserChoice();
        return await this.handleCommand(userChoice);

      case APPLICATION_COMMANDS.app.history.actions.goBack:
      case APPLICATION_COMMANDS.app.history.actions.goForward: {
        const resolvedCommand = this.resolveHistoryCommand(command);
        return await this.handleCommand(resolvedCommand);
      }

      default:
        this.historyManager.clear();
        return;
    }
  }

  resolveHistoryCommand(
    commandHistory: ApplicationTypes.ApplicationHistoryActions,
  ) {
    if (commandHistory === APPLICATION_COMMANDS.app.history.actions.goBack) {
      ResourceProvider.getHistoryManager().back();
      return ResourceProvider.getHistoryManager().getCurrent();
    }

    // go forward
    ResourceProvider.getHistoryManager().forward();
    return ResourceProvider.getHistoryManager().getCurrent();
  }
}
