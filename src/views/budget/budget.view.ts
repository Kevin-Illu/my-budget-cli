import { select, Separator } from "@inquirer/prompts";
import { ApplicationTypes } from "@myTypes/bussiness";

export default class BudgetView {
    private userOptions = [
        {
            name: "Create a new transaction",
            value: "add",
            description: "create a new transaction",
        },
        {
            name: "Edit the amount of transaction",
            value: "edit",
            description: "choose a transaction to edit",
        },
        {
            name: "Delete transaction",
            value: "delete",
            description: "delete an especifyc transactions",
        },
        {
            name: "List of transactions",
            value: "list",
            description: "display all the transactions",
        }
    ]

    private selectableOptions = select({
        message: "Your budget",
        choices: [
            ...this.userOptions,
            new Separator(),
            {
                name: "exit",
                value: "exit",
                description: "exit",
            }
        ]
    })

    async handlingActionChoice(): Promise<ApplicationTypes.ActionTypes> {
        // TODO: handle the Ctrl+C event to exit the application
        // or just async await errors
        const answer = await this.selectableOptions as ApplicationTypes.ActionTypes;
        return answer;
    }
}