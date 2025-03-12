// Objective: Handle system errors
export default class SystemError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'SystemError';
    }
}