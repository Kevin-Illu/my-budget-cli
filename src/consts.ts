export namespace BusinessLogic {
  /**
   * A constant for application capabilities used to execute commands or
   * do an action.
   *
   * Definition of action and command are described down below :)
   *
   * @remarks
   * ACTION: Used to call UI views or just play or interact with the Interface
   * COMMAND: Used to interact with the DATA. Usually do business logic like
   *  save into the database or check or verify some data.
   */
  export const APPLICATION_CAPABILITIES = {
    app: {
      actions: {
        exit: "application:action:exit",
        listOptions: "application:action:list-options",
      },
      history: {
        actions: {
          goBack: "application:action:history:go-back",
          goForward: "application:action:history:go-forward",
        },
      },
    },
    business: {
      expenses: {
        actions: {
          listOptions: "application:action:expenses:list-options",
          list: "expenses:action:list",
          add: "expenses:action:add",
          edit: "expenses:action:edit",
          remove: "expenses:action:remove",
        },
        commands: {
          list: "expenses:command:list",
          add: "expenses:command:add",
          edit: "expenses:command:edit",
          remove: "expenses:command:remove",
        },
      },
    },
  } as const;

  /**
   * A constant array of user command strings.
   *
   * This array contains the keys for commands used in the application.
   * Each string represents a specific user action or command.
   *
   * @privateRemarks
   * I think this const is not used, it will never be used in the application
   * only for extract correctly the types of commands and actions Dx
   *
   * This need to be updated.
   */
  export const CAPABILITIES = [
    // exit the application
    APPLICATION_CAPABILITIES.app.actions.exit,
    APPLICATION_CAPABILITIES.app.actions.listOptions,

    // these commands are used to navigate between
    // actions.
    APPLICATION_CAPABILITIES.app.history.actions.goBack,
    APPLICATION_CAPABILITIES.app.history.actions.goForward,

    // EXPENSES actions and commands
    APPLICATION_CAPABILITIES.business.expenses.actions.listOptions,
    APPLICATION_CAPABILITIES.business.expenses.actions.add,
    APPLICATION_CAPABILITIES.business.expenses.actions.edit,
    APPLICATION_CAPABILITIES.business.expenses.actions.remove,
    APPLICATION_CAPABILITIES.business.expenses.actions.list,
    APPLICATION_CAPABILITIES.business.expenses.commands.add,
    APPLICATION_CAPABILITIES.business.expenses.commands.edit,
    APPLICATION_CAPABILITIES.business.expenses.commands.remove,
    APPLICATION_CAPABILITIES.business.expenses.commands.list,
  ] as const;
}
