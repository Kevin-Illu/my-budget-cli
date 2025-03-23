import { BussinessEntities } from "@budgetTypes/entities";
import { Store } from "@budgetTypes/infraestructure";


class TransactionStore implements Store.AsyncStore<BussinessEntities.Expense> {
  store: Store.SyncStore<BussinessEntities.Expense>;

  constructor(store: Store.SyncStore<BussinessEntities.Expense>) {
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

  async add(t: BussinessEntities.Expense): Promise<boolean> {
    return this.asPromise(() => this.store.add(t)).catch(() => false);
  }

  update(newTData: BussinessEntities.Expense): Promise<boolean> {
    return this.asPromise(() =>
      this.store.update((i) => i.id === newTData.id, newTData),
    );
  }

  findById(id: string): Promise<BussinessEntities.Expense | undefined> {
    return this.asPromise(() => this.store.find((i) => i.id === id));
  }

  getAll(): Promise<BussinessEntities.Expense[]> {
    return this.asPromise(() => this.store.getAll());
  }

  countAll(): Promise<number> {
    return this.asPromise(() => this.store.size());
  }

  deleteById(id: string): Promise<boolean> {
    return this.asPromise(() => this.store.delete((i) => i.id === id));
  }
}

export default TransactionStore;
