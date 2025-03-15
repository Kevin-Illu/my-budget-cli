
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
 * 
 * @example
 * const store = new Store<number>();
 * store.add(1);
 * store.add(2);
 * store.add(3);
 * store.getAll(); // [1, 2, 3]
 * store.delete((item) => item === 2); // true
 * store.getAll(); // [1, 3]
 * store.deleteAt(0); // 1
 * store.getAll(); // [3]
 * store.find((item) => item === 3); // 3
 * store.update((item) => item === 3, 4); // true
 * store.getAll(); // [4]
 * store.size(); // 1
 */
export interface Store<T> {
    add(item: T): boolean;
    getAll(): T[];
    delete(compare: (item: T) => boolean): boolean;
    deleteAt(index: number): T | undefined;
    find(compare: (item: T) => boolean): T | undefined;
    update(compare: (item: T) => boolean, newValue: T): boolean;
    size(): number;
}