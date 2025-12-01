import { BusinessLogic } from "./consts";
import BudgetPresenter from "./presenters/budget.presenter";
import ExpensesPresenter from "./presenters/expenses.presenter";
import BudgetView from "./views/budget.view";
import ExpensesView from "./views/expenses.view";

class Application {
  private presenter: BudgetPresenter;

  async start() {
    this.presenter = new BudgetPresenter(
      new BudgetView(),
      new ExpensesPresenter(new ExpensesView()),
    );

    while (true) {
      const command = await this.presenter.displayMenu();

      if (command ===
        BusinessLogic.APPLICATION_CAPABILITIES.app.actions.exit) {
        this.presenter.stop();
        break;
      }

    }
  }
}

new Application().start();
