export namespace Store {
  /**
   * Interface for the Store class.
   *
   * The Store class is a generic class that stores items of a specific type.
   *
   * @param T - The type of the items to store
   * @method add - Add an item to the store
   * @method getAll - Get all the items in the store
   * @method delete - Delete an item from the store
   * @method deleteAt - Delete an item from the store at a specific index
   * @method find - Find an item in the store
   * @method update - Update an item in the store
   * @method size - Get the size of the store
   * @method bulk - Add multiple items to the store
   */
  export interface SyncStore<T> {
    add(item: T): boolean;

    getAll(): T[];

    delete(compare: (item: T) => boolean): boolean;

    deleteAt(index: number): T | undefined;

    find(compare: (item: T) => boolean): T | undefined;

    update(compare: (item: T) => boolean, newValue: T): boolean;

    size(): number;

    bulk(items: Omit<T, "id">[]): boolean[];
  }

  /**
   * This AsyncStore is used on top of the SyncStore to provide an async
   * functionality to the store.
   *
   * @param T - The type of the items to store
   * @method add - Add an item to the store
   * @method getAll - Get all the items in the store
   * @method findById - Find an item in the store by id
   * @method update - Update an item in the store
   * @method size - Get the size of the store
   * @method deleteById - Delete an
   * @method bullk - Add multiple items to the store
   */
  export interface AsyncStore<T> {
    add(t: T): Promise<boolean>;

    getAll(): Promise<T[]>;

    findById(id: string): Promise<T | undefined>;

    update(t: T): Promise<boolean>;

    countAll(): Promise<number>;

    deleteById(id: string): Promise<boolean>;

    bullk(items: T[]): Promise<boolean[]>;
  }
}

export namespace Infrastructure {

  export interface Command<ReturnType = void> {
    execute(payload?: any): Promise<ReturnType>;
  }

}
