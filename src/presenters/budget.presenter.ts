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
    let command: ApplicationTypes.ApplicationActions = await this.view.getUserChoice();

    while (command !== APPLICATION_COMMANDS.app.actions.exit) {
      this.historyManager.visit(command);
      command = await this.dispatchCommand(command);
    }

    this.view.sayGoodBye();
    console.log({ history: this.historyManager.getHistory() });
  }

  async dispatchCommand(command: Commands.Commands | ApplicationActions) {
    switch (command) {
      case APPLICATION_COMMANDS.business.expenses.actions.listOptions:
        const subCommand = await this.expensesPresenter.displayMenu();
        return subCommand;

      case APPLICATION_COMMANDS.app.history.actions.goBack:
      case APPLICATION_COMMANDS.app.history.actions.goForward:
        return this.resolveHistoryCommand(command);

      case APPLICATION_COMMANDS.app.actions.listOptions:
        return await this.view.getUserChoice();

      default:
        this.historyManager.clear();
        return APPLICATION_COMMANDS.app.actions.exit;
    }
  }
}
