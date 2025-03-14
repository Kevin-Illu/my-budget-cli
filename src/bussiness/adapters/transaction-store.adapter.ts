import { StoreAdapter } from "../../types/bussiness";
import { Expense } from "../../types/entities";
import { Store } from "../../types/infraestructure";


class TransactionStore implements StoreAdapter<Expense> {
  store: Store<Expense>;

  constructor(store: Store<Expense>) {
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

  add(t: Expense): Promise<boolean> {
    return this.asPromise(() => this.store.add(t)).catch(() => false);
  }

  update(newTData: Expense): Promise<boolean> {
    return this.asPromise(() =>
      this.store.update((i) => i.id === newTData.id, newTData),
    );
  }

  findById(id: string): Promise<Expense | undefined> {
    return this.asPromise(() => this.store.find((i) => i.id === id));
  }

  getAll(): Promise<Expense[]> {
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
