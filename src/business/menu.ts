import TreeMenuResolver, { type Menu } from "menu-resolver";
import { BusinessLogic } from "../consts";

const EXPENSES_ACTIONS = BusinessLogic.APPLICATION_CAPABILITIES.business.expenses.actions;

const menu: Menu[] = [
  {
    label: "Manage expenses",
    resolve: BusinessLogic.APPLICATION_CAPABILITIES.app.actions.listExpensesOptions,
    children: [
      {
        label: "Create a new expense",
        resolve: EXPENSES_ACTIONS.add
      },
      {
        label: "Edit the amount of the expense",
        resolve: EXPENSES_ACTIONS.edit
      },
      {
        label: "Delete expense",
        resolve: EXPENSES_ACTIONS.remove
      },
      {
        label: "List of expenses",
        resolve: EXPENSES_ACTIONS.list
      },
      {
        label: "<- Go back",
        resolve: ({ goBack }) => goBack(),
      }
    ]
  },
  {
    label: "Exit the application",
    resolve: BusinessLogic.APPLICATION_CAPABILITIES.app.actions.exit
  }
];

const AppMenu = new TreeMenuResolver(menu);
export default AppMenu;