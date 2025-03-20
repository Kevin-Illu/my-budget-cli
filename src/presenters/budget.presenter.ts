import { ApplicationTypes } from "@budgetTypes/bussiness";
import { BussinesLogic } from "../consts";
import BudgetView from "../views/budget/budget.view";

export default class BudgetPresenter {
    constructor(
        private view: BudgetView
    ) { }

    async startBudgetPresenter() {
        let actionType: ApplicationTypes.ActionType;

        do {
            actionType = await this.view.getUserActionType();

            if (actionType === BussinesLogic.USER_ACTIONS.EXIT) {
                this.view.sayGoodBye();
                break;
            }

        } while (true);
    }
}