export namespace BussinesLogic {
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
        "application:exit",
        "application:expenses",
        "expense:add",
        "expense:edit",
        "expense:remove",
        "expense:list",
    ] as const;
}