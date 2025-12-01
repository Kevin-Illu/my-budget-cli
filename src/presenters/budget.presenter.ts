import { ApplicationTypes, Commands } from "@budgetTypes/bussiness";
import BudgetView from "../views/budget.view";
import ExpensesPresenter from "./expenses.presenter";
import { BusinessLogic } from "../consts";
import AppContext from "../infraestructure/app.context";
import APPLICATION_COMMANDS = BusinessLogic.APPLICATION_CAPABILITIES;
import ApplicationActions = ApplicationTypes.ApplicationActions;
import PresenterBase from "./presenter.base";

export default class BudgetPresenter extends PresenterBase
  implements Presentation.Presenter {
  historyManager = AppContext.getHistoryManager();

  constructor(
    private view: BudgetView,
    private expensesPresenter: ExpensesPresenter,
  ) {
    super();
  }

  async displayMenu() {
    this.historyManager.visit(APPLICATION_COMMANDS.app.actions.listOptions);
    let command: ApplicationTypes.ApplicationActions = await this.view.getUserChoice();

    while (command !== APPLICATION_COMMANDS.app.actions.exit) {
      if (
        command !== APPLICATION_COMMANDS.app.history.actions.goBack &&
        command !== APPLICATION_COMMANDS.app.history.actions.goForward
      ) {
        this.historyManager.visit(command);
      }

      command = await this.dispatchCommand(command);
    }

    return command;
  }

  async dispatchCommand(command: ApplicationActions | Commands.Commands) {
    switch (command) {
      case APPLICATION_COMMANDS.app.actions.listExpensesOptions:
        const subCommand = await this.expensesPresenter.displayMenu();
        return subCommand;

      case APPLICATION_COMMANDS.app.history.actions.goBack:
      case APPLICATION_COMMANDS.app.history.actions.goForward:
        return this.resolveHistoryCommand(command);

      case APPLICATION_COMMANDS.app.actions.listOptions:
        return command;
      default:
        return APPLICATION_COMMANDS.app.actions.listOptions;
    }
  }

  stop() {
    this.view.sayGoodBye();
    console.log({ history: this.historyManager.getHistory() });
    this.historyManager.clear();
  }
}
