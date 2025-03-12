// Objective: handle the bussiness errors
export default class BussinessError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'BussinessErrors';
    }
}