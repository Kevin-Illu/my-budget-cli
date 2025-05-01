import { UserTransaction } from "@budgetTypes/bussiness";
import TransactionStore from "../adapters/transaction-store.adapter";
import TransactionFactory from "../factories/transaction.factory";
import { BussinessEntities } from "@budgetTypes/entities";

export class TransactionService {
  constructor(
    private transactionStore: TransactionStore,
    private transactionFactory: TransactionFactory,
  ) { }

  createTransaction(t: UserTransaction): void {
    try {
      const transaction = this.transactionFactory.create(t);
      this.transactionStore
        .add(transaction)
        .then((s) => {
          console.log("the transaction was successfully saved");
          console.log(s);
        })
        .catch((e) => {
          console.log(e.message);
        });
    } catch (e) {
      console.log(e.message);
    }
  }

  editCategory(editedTransaction: BussinessEntities.Expense): void {
    this.transactionStore
      .update(editedTransaction)
      .then(console.log)
      .catch(console.log);
  }

  editAmount(editedTransaction: BussinessEntities.Expense): void {
    this.transactionStore
      .update(editedTransaction)
      .then((r) => {
        console.log("the transaction was updated successfully");
        console.log(r);
      })
      .catch((r) => {
        console.log("the updation has an error");
        console.log(r);
      });
  }

  deleteTransaction(id: string): void {
    this.transactionStore.deleteById(id).then(console.log).catch(console.log);
  }

  getAllTransactions(): Promise<BussinessEntities.Expense[]> {
    return this.transactionStore.getAll();
  }

  countTransactions(): Promise<number> {
    return this.transactionStore.countAll();
  }
}
