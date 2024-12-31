class TransactionStore implements StoreAdapter<TransactionEntity> {
  store: Store<TransactionEntity>;

  constructor(store: Store<TransactionEntity>) {
    this.store = store;
  }

  private asPromise<T>(fn: () => T): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      try {
        const result = fn();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  add(t: TransactionEntity): Promise<boolean> {
    return this.asPromise(() => this.store.add(t));
  }

  update(t: TransactionEntity): Promise<boolean> {
    return this.asPromise(() => this.store.update((i) => i.id === t.id, t));
  }

  findById(id: number): Promise<TransactionEntity | undefined> {
    return this.asPromise(() => this.store.find((i) => i.id === id));
  }

  getAll(): Promise<TransactionEntity[]> {
    return this.asPromise(() => this.store.getAll());
  }

  size(): Promise<number> {
    return this.asPromise(() => this.store.size());
  }
}

export default TransactionStore;
