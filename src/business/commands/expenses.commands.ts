import { Infrastructure } from "@budgetTypes/infrastructure";
import AppContext from "../../infraestructure/app.context";
import { BusinessLogic } from "../../consts";
const EXPENSES_COMMANDS = BusinessLogic.APPLICATION_CAPABILITIES.business.expenses;

export class GetExpensesCommand implements Infrastructure.Command<any[]> {
  async execute() {
    const list = AppContext.commandBus.execute<any[]>(
      EXPENSES_COMMANDS.commands.list
    )

    return list;
  }
}