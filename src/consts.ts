export namespace BusinessLogic {
  /**
   * A constant array of user command strings.
   *
   * This array contains the keys for commands used in the application.
   * Each string represents a specific user action command.
   *
   * @remarks
   * This array should only contain valid command strings that are recognized by the application.
   */
  export const USER_COMMANDS = [
    // exit the application
    "application:exit",
    "application:list-options",

    // these commands are used to navigate between
    // actions.
    "application:history:go-back",
    "application:history:go-forward",

    // display the command expenses list
    "application:expenses:list-options",

    // CRUD for expenses
    "expense:command:add",
    "expense:command:edit",
    "expense:command:remove",
    "expense:command:list",
  ] as const;

  /**
   * A constant for application commands used to execute commands
   *
   * @remarks
   * these are used for checks or validations in the application logic
   */
  export const APPLICATION_COMMANDS = {
    app: {
      exit: "application:exit",
      listOptions: "application:list-options",
    },
    history: {
      goBack: "application:history:go-back",
      goForward: "application:history:go-forward",
    },
    business: {
      expenses: {
        listOptions: "application:expenses:list-options",
      },
    },
  } as const;
}
