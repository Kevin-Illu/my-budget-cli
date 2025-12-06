import TreeMenuResolver, { type Menu } from "menu-resolver";
import { BusinessLogic } from "../consts";

const EXPENSES_ACTIONS =
  BusinessLogic.APPLICATION_CAPABILITIES.business.expenses.actions;

const EXPENSES_COMMANDS =
  BusinessLogic.APPLICATION_CAPABILITIES.business.expenses.commands;

const APPLICATION_ACTIONS = BusinessLogic.APPLICATION_CAPABILITIES.app.actions;

type InquirerListItem = {
  name: string;
  value?: string;
  description?: string;
};

export class AppMenu {
  private tree: Menu<InquirerListItem>[] = [
    {
      data: {
        name: "Manage expenses",
        value: APPLICATION_ACTIONS.listExpensesOptions,
        description: "Just manage your expenses",
      },
      children: [
        {
          data: {
            name: "Create a new expense",
            value: EXPENSES_ACTIONS.add,
          },
          resolve: EXPENSES_COMMANDS.add,
        },
        {
          data: {
            name: "Edit the amount of the expense",
            value: EXPENSES_ACTIONS.edit,
          },
          resolve: EXPENSES_ACTIONS.edit,
        },
        {
          data: {
            name: "Delete expense",
          },
          resolve: EXPENSES_ACTIONS.remove,
        },
        {
          data: {
            name: "List of expenses",
          },
          resolve: EXPENSES_ACTIONS.list,
        },
        {
          data: {
            name: "<- Go back",
            description: "Just go back",
          },
          resolve: (api) => {
            api.goBack();
            api.goBack();
          },
        },
      ],
    },
    {
      data: {
        name: "Configuration",
        description: "Just configuration",
      },
      children: [
        {
          data: {
            name: "Choose the curren storage method",
          },
          children: [
            {
              data: {
                name: "LinkedList storage",
                description: "This method only save change in memory",
              },
              resolve: (api) => {
                // TODO: save the selection
                api.choose(api.currentNode.id);
                api.goBack();
              },
            },
            {
              data: {
                name: "JSON storage",
                description: "This method save change in a JSON file",
              },
              resolve: (api) => {
                // TODO: save the selection
                api.choose(api.currentNode.id);
                api.goBack();
              },
            },
            {
              data: {
                name: "SQLite Storage",
                description: "This method save change in a SQLite database",
              },
              resolve: (api) => {
                // TODO: save the selection
                api.choose(api.currentNode.id);
                api.goBack();
              },
            },
            {
              data: {
                name: "<- Go back",
                description: "Just go back",
              },
              resolve: ({ goBack, currentNode, choose }) => {
                goBack();
                goBack();
              },
            },
          ],
        },
        {
          data: {
            name: "<- Go back",
            description: "Just go back",
          },
          resolve: ({ goBack, currentNode, choose }) => {
            goBack();
            goBack();
          },
        },
      ],
    },
    {
      data: {
        name: "Exit the application",
      },
      resolve: () => process.exit(),
    },
  ];

  menu: TreeMenuResolver;

  constructor() {
    this.menu = new TreeMenuResolver(this.tree);
  }
}

export default AppMenu;
