import BussinessError from "../bussiness.error";
import SystemError from "../system.error";

export interface K_ErrorEvent {
    error: SystemError | BussinessError | Error;
    timestamp: Date;
    context?: string;
}

export interface ErrorHandler {
    handleError(event: K_ErrorEvent): void;
}

export default class ErrorHandlerManager {
    private handlers: ErrorHandler[] = [];

    public registerHandler(handler: ErrorHandler): void {
        this.handlers.push(handler);
    }

    public notify(event: K_ErrorEvent): void {
        // TODO: Change the way to notify the handlers
        // because i only need one handler at the moment
        // also check if the error is an instance of SystemError or BussinessError
        this.handlers.forEach((handler) => handler.handleError(event));
    }
}