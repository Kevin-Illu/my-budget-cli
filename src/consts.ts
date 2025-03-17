export namespace BussinesLogic {

    // this const describe the actions that the user can do
    // in the application
    // this actions can be applied to all the diferents concerns
    export const USER_ACTIONS = {
        ADD: "add",
        EDIT: "edit",
        DELETE: "delete",
        LIST: "list",
        EXIT: "exit"
    } as const;

    export const USER_ACTIONS_SCOPES = {
        expenses: [USER_ACTIONS.ADD, USER_ACTIONS.EDIT, USER_ACTIONS.DELETE, USER_ACTIONS.LIST],
        application: [USER_ACTIONS.EXIT]
    } as const;
}