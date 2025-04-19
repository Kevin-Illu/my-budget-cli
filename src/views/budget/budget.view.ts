import { select } from "@inquirer/prompts";
import { ApplicationTypes } from "@budgetTypes/bussiness";
import TryCatch from "../../infraestructure/trycatch";
import View from "../view";

export default class BudgetView extends View {
  private applicationOptions = [
    {
      name: "Manage expenses",
      value: "application:expenses:list-options",
      description: "View, Edit your expenses.",
    },
    {
      name: "Exit the application",
      value: "application:exit",
      description: "exit to the application ;)",
    },
  ];

  async getUserChoice(): Promise<ApplicationTypes.ApplicationCommands> {
    this.clearView();

    const userAction = await TryCatch.runAsync(() =>
      select({
        message: "Your expenses",
        choices: this.applicationOptions,
      }),
    ).then((r) => r.unwrapOr("application:exit"));

    return userAction as ApplicationTypes.ApplicationCommands;
  }

  sayGoodBye() {
    this.clearView();
    console.log("Good Bye! ;)");
  }
}
