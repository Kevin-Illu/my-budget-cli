import { ApplicationTypes, ExpensesTypes } from "@budgetTypes/bussiness";
import ExpensesView from "../views/budget/expenses.view";
import { BusinessLogic } from "../consts";
import APPLICATION_COMMANDS = BusinessLogic.APPLICATION_CAPABILITIES;
import ApplicationActions = ApplicationTypes.ApplicationActions;
import ExpensesActions = ExpensesTypes.ExpensesActions;
import ResourceProvider from "../infraestructure/resource.provider";
import HistoryManager from "../infraestructure/history.manager";
import PresenterBase from "./presenter.base";

export default class ExpensesPresenter extends PresenterBase {
  // historyManager: HistoryManager<ExpensesActions> =
  //   ResourceProvider.getHistoryManager();

  constructor(private view: ExpensesView) {
    super();
  }

  async displayMenu(): Promise<ApplicationTypes.ApplicationHistoryActions> {
    let action: ExpensesTypes.ExpensesActions | ApplicationActions =
      await this.view.getUserChoice();

    await this.handleAction(action);

    // do {
    // } while (
    //   // TODO: Is that good?, make sure that this can be extensible and
    //   // easy to understand
    //   await this.handleCommand(command).then((r) => {
    //     if (typeof r !== "string") return r;
    //     command = r;
    //
    //     console.log({ r });
    //     return false;
    //   })
    // );

    return action as ApplicationTypes.ApplicationHistoryActions;
  }

  async handleAction(
    action: ApplicationActions | ExpensesActions,
  ): Promise<boolean | ApplicationTypes.ApplicationHistoryActions> {
    switch (action) {
      case APPLICATION_COMMANDS.business.expenses.actions.add:
        return await this.handleAction(action);
      case APPLICATION_COMMANDS.business.expenses.actions.remove:
        return await this.handleAction(action);
      case APPLICATION_COMMANDS.business.expenses.actions.edit:
        return await this.handleAction(action);
      case APPLICATION_COMMANDS.business.expenses.actions.list:
        const userAction = await this.view.getUserChoice();
        return await this.handleAction(userAction);

      case APPLICATION_COMMANDS.app.history.actions.goBack:
      case APPLICATION_COMMANDS.app.history.actions.goForward:
        const resolvedAction = this.resolveHistoryCommand(action);
        return await this.handleAction(resolvedAction);
      default:
    }
  }
}
