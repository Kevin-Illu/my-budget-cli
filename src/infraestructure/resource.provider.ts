import ErrorHandlerManager from "./error/handlers/error.handler";
import ConsoleErrorHandler from "./error/handlers/console-error.handler";
import LinkedList from "./stores/linked-list.store";
import { Store } from "../types/infraestructure";

export default class ResourceProvider {
    static errorManager: ErrorHandlerManager;
    static store: Store.SyncStore<unknown>;

    static {
        this.errorManager = new ErrorHandlerManager();
        this.errorManager.registerHandler(new ConsoleErrorHandler());
        this.store = new LinkedList();
    }

    static getErrorManager() {
        return this.errorManager;
    }

    static getStore<T>(): Store.SyncStore<T> {
        return this.store as Store.SyncStore<T>;
    }
}