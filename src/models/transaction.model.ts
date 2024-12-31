abstract class Transaction {
  constructor(private store: any) {}

  create(ut: UserTransaction): TransactionEntity {
    // generate the id, maybe can get from the storage, refactor this when the linked list are implemented
    const id = this.store.getLastValue().index + 1;
    return {
      id,
      amount: ut.amount,
      category: ut.category,
      date: new Date(),
    };
  }

  save(tr: TransactionEntity): boolean {
    const [results, err] = this.store.save(tr);

    // log the transaction in an especific logger and store also in the database or file

    return !err;
  }

  delete(tr: TransactionEntity): boolean {
    const [results, err] = this.store.remove(tr.id);

    // log the transaction in an especific logger and store also in the database or file

    return !err;
  }

  edit(tr: TransactionEntity): boolean {
    const [results, err] = this.store.update(tr.id);

    // log the transaction in an especific logger and store also in the database or file

    return !err;
  }
}

export default Transaction;
