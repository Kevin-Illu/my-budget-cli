import { ApplicationTypes } from "@budgetTypes/bussiness";
import BudgetView from "../views/budget/budget.view";
import ExpensesPresenter from "./expenses.presenter";

export default class BudgetPresenter {

    constructor(
        private view: BudgetView,
        private expensesPresenter: ExpensesPresenter
    ) { }

    async startBudgetPresenter() {
        let actionType: ApplicationTypes.UserCommands;

        actionType = await this.view.getUserChoice();

        if (actionType === 'application:exit') {
            this.view.sayGoodBye();
            return;
        }

        if (actionType === 'application:expenses') {
            this.expensesPresenter.displayUserOptions()
        }

    }
}