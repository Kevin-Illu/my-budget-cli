import { Expense } from "./entities";

export interface UserTransaction extends Omit<Expense, "id" | "date"> { }


export interface StoreAdapter<T> {
    add(t: Expense): Promise<boolean>;
    getAll(): Promise<Expense[]>;
    findById(id: string): Promise<Expense | undefined>;
    update(t: Expense): Promise<boolean>;
    size(): Promise<number>;
    deleteById(id: string): Promise<boolean>;
}

