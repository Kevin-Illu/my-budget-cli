
export namespace Entities {

    export type Expense = {
        id: string;
        category: string;
        amount: number;
        description: string;
        date: string;
    }

    export type NewExpense = Omit<Expense, 'id'>

}
