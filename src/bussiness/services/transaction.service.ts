import TransactionStore from "../bussiness/adapters/transaction-store.adapter";
import TransactionFactory from "../bussiness/factories/transaction.factory";

export class TransactionService {
  constructor(
    private transactionStore: TransactionStore,
    private transactionFactory: TransactionFactory,
  ) {}

  createTransaction(t: UserTransaction): void {
    // TODO: refactor this code, must be a priority.
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

  editCategory(editedTransaction: TransactionEntity): void {
    this.transactionStore
      .update(editedTransaction)
      .then(console.log)
      .catch(console.log);
  }

  editAmount(editedTransaction: TransactionEntity): void {
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

  getAllTransactions(): Promise<TransactionEntity[]> {
    return this.transactionStore.getAll();
  }

  countTransactions(): Promise<number> {
    return this.transactionStore.size();
  }
}
