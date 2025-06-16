import { ApplicationTypes, Commands } from "@budgetTypes/bussiness";
import BudgetView from "../views/budget/budget.view";
import ExpensesPresenter from "./expenses.presenter";
import { BusinessLogic } from "../consts";
import ResourceProvider from "../infraestructure/resource.provider";
import APPLICATION_COMMANDS = BusinessLogic.APPLICATION_CAPABILITIES;
import ApplicationActions = ApplicationTypes.ApplicationActions;
import PresenterBase from "./presenter.base";

export default class BudgetPresenter extends PresenterBase {
  historyManager = ResourceProvider.getHistoryManager();

  constructor(
    private view: BudgetView,
    private expensesPresenter: ExpensesPresenter,
  ) {
    super();
  }

  async displayMenu() {
    let command: ApplicationTypes.ApplicationActions;
    command = await this.view.getUserChoice();
    this.historyManager.visit(APPLICATION_COMMANDS.app.actions.listOptions);

    // this runs recursively
    await this.handleCommand(command);
  }

  async handleCommand(command: Commands.Commands | ApplicationActions) {
    switch (command) {
      /*
      Exit the recursion loop if the command is EXIT or
      an exception, whatever happens first.
       */
      case APPLICATION_COMMANDS.app.actions.exit:
        this.view.sayGoodBye();
        // TODO: Do I need to start a log process to get metrics?
        // I think I could ;)
        // console.log({
        //   history: ResourceProvider.getHistoryManager().getHistory(),
        // });
        return;

      // TODO: get a way to group actions from expenses and application
      // TODO: Implement a way to handle nested commands and actions Dx
      case APPLICATION_COMMANDS.business.expenses.actions.listOptions:
        this.historyManager.visit(command);
        const nextCommand =
          (await this.expensesPresenter.displayMenu()) ??
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
}
