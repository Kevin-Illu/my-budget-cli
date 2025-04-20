import { select } from "@inquirer/prompts";
import { ApplicationTypes } from "@budgetTypes/bussiness";
import TryCatch from "../../infraestructure/trycatch";
import View from "../view";
import ResourceProvider from "../../infraestructure/resource.provider";

export default class BudgetView extends View {
  private applicationOptions = [
    {
      name: "Manage expenses",
      value: "application:action:expenses:list-options",
      description: "View, Edit your expenses.",
    },
    {
      name: "Exit the application",
      value: "application:action:exit",
      description: "exit to the application ;)",
    },
  ];

  async getUserChoice(): Promise<ApplicationTypes.ApplicationActions> {
    this.clearView();

    const action = await TryCatch.runAsync(() =>
      select({
        message: "Your expenses",
        choices: this.applicationOptions,
      }),
    ).then((r) => r.unwrapOr("application:action:exit"));

    return action as ApplicationTypes.ApplicationActions;
  }

  sayGoodBye() {
    this.clearView();
    console.log("Good Bye! ;)");
  }
}
