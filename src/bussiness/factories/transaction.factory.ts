import { BussinessEntities } from "@budgetTypes/entities";
import { UserTransaction } from "../../types/bussiness";


class TransactionFactory {
  constructor(private uuidGenerator: () => string) { }

  private validateTransaction(t: UserTransaction): string[] {
    const errors: string[] = [];

    if (t.amount <= 0) {
      errors.push("The amount must be greater than 0.");
    }

    if (!t.category || t.category.trim().length === 0) {
      errors.push("Category cannot be empty.");
    }

    if (typeof t.amount !== "number" || isNaN(t.amount)) {
      errors.push("Amount must be a valid number.");
    }

    return errors;
  }

  // TODO: verify if throwing an error is an aceptable solution D;
  create(t: UserTransaction): BussinessEntities.Expense {
    const errors = this.validateTransaction(t);

    if (errors.length > 0) {
      throw new Error(errors.join("\n"));
    }

    return {
      id: this.uuidGenerator(),
      amount: t.amount,
      category: t.category,
      date: new Date(),
      pay_each: t.pay_each,
    };
  }
}

export default TransactionFactory;
