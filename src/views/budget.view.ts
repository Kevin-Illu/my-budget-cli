import { select } from "@inquirer/prompts";
import { ApplicationTypes } from "@budgetTypes/bussiness";
import TryCatch from "./../infraestructure/trycatch";
import View from "./view";
import { BusinessLogic } from "./../consts";

export default class BudgetView extends View
  implements Presentation.View {
  private applicationOptions = [
    {
      name: "Manage expenses",
      value: BusinessLogic.APPLICATION_CAPABILITIES.business.expenses.actions.listOptions,
      description: "View, Edit your expenses.",
    },
    {
      name: "Exit the application",
      value: BusinessLogic.APPLICATION_CAPABILITIES.app.actions.exit,
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
    ).then((r) => r.unwrapOr(BusinessLogic.APPLICATION_CAPABILITIES.app.actions.exit));

    return action as ApplicationTypes.ApplicationActions;
  }

  sayGoodBye() {
    this.clearView();
    console.log("Good Bye! ;)");
  }
}
