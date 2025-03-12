import { ErrorHandler, K_ErrorEvent } from "./error.handler";


export default class ConsoleErrorHandler implements ErrorHandler {
    handleError(event: K_ErrorEvent): void {
        console.error(`[${event.timestamp.toISOString()}] ${event.context || 'unknown'}: ${event.error.message}`);
    }
}