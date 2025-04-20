export default class HistoryManager<T> {
  private past: T[] = [];
  private future: T[] = [];
  private current: T | null = null;

  constructor(initialState: T) {
    this.current = initialState;
  }

  public visit(state: T): void {
    if (this.current !== null) {
      this.past.push(this.current);
    }
    this.current = state;
    this.future = []; // clear forward history
  }

  public back(): T | null {
    if (this.past.length === 0) return null;
    this.future.push(this.current as T);
    this.current = this.past.pop()!;
    return this.current;
  }

  public forward(): T | null {
    if (this.future.length === 0) return null;
    this.past.push(this.current as T);
    this.current = this.future.pop()!;
    return this.current;
  }

  public getCurrent(): T | null {
    return this.current;
  }

  public clear(): void {
    this.past = [];
    this.future = [];
    this.current = null;
  }

  public getHistory() {
    return {
      current: this.current,
      future: this.future,
      past: this.past,
    };
  }
}
