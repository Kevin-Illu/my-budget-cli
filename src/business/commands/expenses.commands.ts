import { Infrastructure } from "@budgetTypes/infrastructure";
import AppContext from "../../infraestructure/app.context";

export class GetExpensesCommand implements Infrastructure.Command<any[]> {
  async execute() {
    const list = AppContext.getStore().getAll();
    return list;
  }
}