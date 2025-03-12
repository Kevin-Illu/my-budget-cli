import ErrorHandlerManager from "./error/handlers/error.handler";
import ConsoleErrorHandler from "./error/handlers/console-error.handler";

export default class InfraestructureModule {
    public errorManager: ErrorHandlerManager;

    constructor() {
        this.errorManager = new ErrorHandlerManager();
        this.errorManager.registerHandler(new ConsoleErrorHandler());
    }
}