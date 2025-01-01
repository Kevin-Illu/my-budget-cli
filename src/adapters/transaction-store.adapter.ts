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
        console.error("TransactionStore Error:", error);
        reject(error);
      }
    });
  }

  add(t: TransactionEntity): Promise<boolean> {
    return this.asPromise(() => this.store.add(t)).catch(() => false);
  }

  update(newTData: TransactionEntity): Promise<boolean> {
    return this.asPromise(() =>
      this.store.update((i) => i.id === newTData.id, newTData),
    );
  }

  findById(id: string): Promise<TransactionEntity | undefined> {
    return this.asPromise(() => this.store.find((i) => i.id === id));
  }

  getAll(): Promise<TransactionEntity[]> {
    return this.asPromise(() => this.store.getAll());
  }

  size(): Promise<number> {
    return this.asPromise(() => this.store.size());
  }

  deleteById(id: string): Promise<boolean> {
    return this.asPromise(() => this.store.delete((i) => i.id === id));
  }
}

export default TransactionStore;
