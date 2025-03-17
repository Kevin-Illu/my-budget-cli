import { select, Separator } from "@inquirer/prompts";
import { ApplicationTypes } from "@budgetTypes/bussiness";
import { BussinesLogic } from "../../consts";

export default class BudgetView {
    private userOptions = [
        {
            name: "Create a new expense",
            value: "add",
            description: "create a new transaction",
        },
        {
            name: "Edit the amount of the expense",
            value: "edit",
            description: "choose a transaction to edit",
        },
        {
            name: "Delete expense",
            value: "delete",
            description: "delete an especifyc transactions",
        },
        {
            name: "List of expenses",
            value: "list",
            description: "display all the transactions",
        }
    ]

    private aplicationOptions = [
        {
            name: "exit",
            value: "exit",
            description: "exit to the application ;)",
        }
    ]

    private selectableOptions = select({
        message: "Your expenses",
        choices: [
            ...this.userOptions,
            new Separator(),
            ...this.aplicationOptions
        ]
    })

    async getUserActionType(): Promise<ApplicationTypes.ActionType> {
        try {
            const answer = await this.selectableOptions as ApplicationTypes.ActionType;
            return answer;
        } catch (error) {
            console.error(error);
            return BussinesLogic.USER_ACTIONS.EXIT;
        }
    }

    sayGoodBye() {
        console.log("Good Bye! ;)");
    }
}