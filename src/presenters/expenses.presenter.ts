import { ApplicationTypes } from "@budgetTypes/bussiness";
import ExpensesView from "../views/budget/expenses.view";

export default class ExpensesPresenter {
    constructor(private view: ExpensesView) { }

    async displayUserOptions() {
        let actionType: ApplicationTypes.ExpenseCommands;

        actionType = await this.view.getUserChoice();

        // TODO: execute the command
    }
}