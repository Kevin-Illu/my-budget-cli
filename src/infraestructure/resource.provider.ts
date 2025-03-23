import LinkedList from "./stores/linked-list.store";
import { Store } from "../types/infraestructure";
import { CommandRegistry } from "./command-registry";
import { ApplicationTypes } from "@budgetTypes/bussiness";

export default class ResourceProvider {
    static store: Store.SyncStore<unknown>;
    static commandRegistry: CommandRegistry<ApplicationTypes.UserCommands>;

    static {
        this.store = new LinkedList();
        this.commandRegistry = new CommandRegistry();

        // Optionally, register commands here:
        // this.commandRegistry.register("expense:add", new AddExpenseCommand());
        // this.commandRegistry.register("expense:edit", new EditExpenseCommand());
        // this.commandRegistry.register("application:exit", new ExitApplicationCommand());
    }

    static getStore<T>(): Store.SyncStore<T> {
        return this.store as Store.SyncStore<T>;
    }

    static getRegistry(): CommandRegistry<ApplicationTypes.UserCommands> {
        return this.commandRegistry;
    }
}