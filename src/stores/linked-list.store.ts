class TNode<T> {
  data: T;
  next: TNode<T> | null;

  constructor(data: T) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList<T> implements Store<T> {
  head: TNode<T> | null;
  count: number = 0;

  constructor() {
    this.head = null;
  }

  add(data: T): boolean {
    const newNode = new TNode(data);

    if (this.head === null) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next !== null) {
        current = current.next;
      }
      current.next = newNode;
    }

    this.count++;
    return true;
  }

  getAll(): T[] {
    const items: T[] = [];
    let current = this.head;

    while (current) {
      items.push(current.data);
      current = current.next;
    }

    return items;
  }

  delete(compare: (i: T) => boolean): boolean {
    if (!this.head) return false;

    if (compare(this.head.data)) {
      this.head = this.head.next;
      this.count--;
      return true;
    }

    let current = this.head;
    let prev: TNode<T> | null = null;

    while (current && !compare(current.data)) {
      prev = current;
      current = current.next;
    }

    if (current) {
      if (prev) {
        prev.next = current.next;
      }

      this.count--;
      return true;
    }

    return false;
  }

  deleteAt(index: number): T | undefined {
    if (index < 0 || index >= this.count || !this.head) return undefined;

    if (index === 0) {
      const removedData = this.head.data;
      this.head = this.head.next;
      this.count--;
      return removedData;
    }

    let current = this.head;
    let prev: TNode<T> | null = null;
    let currentIndex = 0;

    while (current && currentIndex !== index) {
      prev = current;
      current = current.next;
      currentIndex++;
    }

    if (current && prev) {
      const removedData = current.data;
      prev.next = current.next;
      this.count--;
      return removedData;
    }

    return undefined;
  }

  update(compare: (i: T) => boolean, newValue: T): boolean {
    if (!this.head) return false;

    let current = this.head;
    while (current) {
      if (compare(current.data)) {
        current.data = newValue;
        return true;
      }
      current = current.next;
    }

    return false;
  }

  find(compare: (i: T) => boolean): T | undefined {
    let current = this.head;
    while (current) {
      if (compare(current.data)) {
        return current.data;
      }
      current = current.next;
    }
    return undefined;
  }

  size(): number {
    return this.count;
  }
}

export default LinkedList;
