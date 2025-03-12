// Source Like
interface Store<T> {
  add(item: T): boolean;
  getAll(): T[];
  delete(compare: (item: T) => boolean): boolean;
  deleteAt(index: number): T | undefined;
  find(compare: (item: T) => boolean): T | undefined;
  update(compare: (item: T) => boolean, newValue: T): boolean;
  size(): number;
}

interface StoreAdapter<T> {
  add(t: TransactionEntity): Promise<boolean>;
  getAll(): Promise<TransactionEntity[]>;
  findById(id: string): Promise<TransactionEntity | undefined>;
  update(t: TransactionEntity): Promise<boolean>;
  size(): Promise<number>;
  deleteById(id: string): Promise<boolean>;
}

// Core like
interface TransactionEntity {
  id: string;
  amount: number;
  category: string;
  date: Date;
}

interface UserTransaction extends Omit<TransactionEntity, "id" | "date"> {}
