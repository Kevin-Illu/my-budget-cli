import BudgetPresenter from "./presenters/budget.presenter";
import BudgetView from "./views/budget/budget.view";

class Application {
  private view: BudgetView;
  private presenter: BudgetPresenter;

  start() {
    this.view = new BudgetView();
    this.presenter = new BudgetPresenter(this.view);
    this.presenter.startBudgetPresenter();
  }
}

new Application().start();
