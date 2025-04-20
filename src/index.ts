import BudgetPresenter from "./presenters/budget.presenter";
import ExpensesPresenter from "./presenters/expenses.presenter";
import BudgetView from "./views/budget/budget.view";
import ExpensesView from "./views/budget/expenses.view";

class Application {
  private presenter: BudgetPresenter;

  start() {
    this.presenter = new BudgetPresenter(
      new BudgetView(),
      new ExpensesPresenter(new ExpensesView()),
    );

    this.presenter.startBudgetPresenter();
  }
}

new Application().start();
