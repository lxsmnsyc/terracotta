export interface ToastData<T> {
  id: string;
  data: T;
}

export type ToasterListener<T> = (queue: ToastData<T>[]) => void;

export class ToasterStore<T> {
  private static toasterID = 0;

  private id: number;

  private queue: ToastData<T>[] = [];

  private listeners = new Set<ToasterListener<T>>();

  private toastID = 0;

  constructor() {
    this.id = ToasterStore.toasterID;
    ToasterStore.toasterID += 1;
  }

  subscribe(callback: ToasterListener<T>): () => void {
    this.listeners.add(callback);
    return () => {
      this.listeners.delete(callback);
    };
  }

  private notify(): void {
    const clone = [...this.queue];
    for (const listener of this.listeners.keys()) {
      listener(clone);
    }
  }

  create(data: T): string {
    const id = `toast-${this.id}-[${this.toastID}`;
    this.toastID += 1;
    this.queue.push({
      id,
      data,
    });
    this.notify();
    return id;
  }

  remove(id: string): void {
    this.queue = this.queue.filter((item) => item.id !== id);
    this.notify();
  }

  clear(): void {
    this.queue = [];
    this.notify();
  }

  getQueue(): ToastData<T>[] {
    return this.queue;
  }
}
