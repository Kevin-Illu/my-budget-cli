import { BussinesLogic } from "../consts";
import BudgetView from "../views/budget/budget.view";

export default class BudgetPresenter {
    constructor(
        private view: BudgetView
    ) { }

    async startBudgetPresenter() {
        const actionType = await this.view.getUserActionType();

        if (actionType === BussinesLogic.USER_ACTIONS.EXIT) {
            this.view.sayGoodBye();
        }
    }
}