import TransactionStore from "../adapters/transaction-store.adapter";
import TransactionFactory from "../factories/transaction.factory";

export class TransactionService {
  constructor(
    private transactionStore: TransactionStore,
    private transactionFactory: TransactionFactory,
  ) {}

  createTransaction(t: UserTransaction): void {
    const transaction = this.transactionFactory.create(t);
    this.transactionStore
      .add(transaction)
      .then((s) => {
        console.log("the transaction was successfully saved");
        console.log(s);
      })
      .catch((e) => {
        console.error(e);
      });
  }

  editCategory(editedTransaction: TransactionEntity): void {
    this.transactionStore
      .update(editedTransaction)
      .then(console.log)
      .catch(console.log);
  }

  deleteTransaction(id: string): void {
    this.transactionStore.deleteById(id).then(console.log).catch(console.log);
  }
}
