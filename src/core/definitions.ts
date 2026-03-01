export namespace Core {
  export const TransactionType = {
    income: "INCOME",
    expense: "EXPENSE",
  } as const;

  export class TransactionRepository implements ITransactionRepository {
    private store: Transaction[] = [];

    constructor() {}

    async save(t: Transaction) {
      this.store.push(t);
      return true;
    }

    async getById(id: string): Promise<Transaction | undefined> {
      const result = this.store.filter((t) => t.id === id)[0];
      return result;
    }

    async getAll() {
      return this.store;
    }
  }

  export class TransactionService {
    constructor(private repo: TransactionRepository) {}

    async addIncome(income: {
      amount: number;
      name?: string;
      description?: string;
    }) {
      if (!income.amount) throw new Error("Amount is required!");
      if (income.amount <= 0) throw new Error("Invalid amount.");

      const transaction: Transaction = {
        id: crypto.randomUUID(),
        type: TransactionType.income,
        date: new Date(),
        ...income,
      };

      await this.repo.save(transaction);
    }

    async addExpense(expense: {
      amount: number;
      name?: string;
      description?: string;
    }) {
      if (!expense.amount) throw new Error("Amount is required");
      if (expense.amount < 0) throw new Error("Invalid amount");

      const t: Transaction = {
        id: crypto.randomUUID(),
        type: TransactionType.expense,
        date: new Date(),
        ...expense,
      };

      this.repo.save(t);
    }
  }
}

export type TTransactionType =
  (typeof Core.TransactionType)[keyof typeof Core.TransactionType];

export type Transaction = {
  id?: string;
  name?: string;
  description?: string;
  date: Date;
  amount: number;
  type: TTransactionType;
};

interface ITransactionRepository {
  save(transaction: Transaction): Promise<boolean>;
}
