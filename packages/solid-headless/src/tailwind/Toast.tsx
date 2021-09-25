import {
  createEffect,
  createSignal,
  createUniqueId,
  onCleanup,
} from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';
import { Dynamic } from 'solid-js/web';
import { DynamicProps, ValidConstructor } from '../utils/dynamic-prop';
import { excludeProps } from '../utils/exclude-props';

export type TailwindToastProps<T extends ValidConstructor = 'div'> = {
  as?: T,
  disabled?: boolean;
} & Omit<DynamicProps<T>, 'as'>

export function TailwindToast<T extends ValidConstructor = 'div'>(
  props: TailwindToastProps<T>,
): JSX.Element {
  const toastID = createUniqueId();

  return (
    <Dynamic
      component={props.as ?? 'div'}
      id={toastID}
      {...excludeProps(props, [
        'as',
      ])}
      role="status"
      aria-live="polite"
      data-sh-toast={toastID}
    />
  );
}

export type TailwindToasterProps<T extends ValidConstructor = 'div'> = {
  as?: T,
  disabled?: boolean;
} & Omit<DynamicProps<T>, 'as'>

export function TailwindToaster<T extends ValidConstructor = 'div'>(
  props: TailwindToasterProps<T>,
): JSX.Element {
  const toasterID = createUniqueId();

  return (
    <Dynamic
      component={props.as ?? 'div'}
      id={toasterID}
      {...excludeProps(props, [
        'as',
      ])}
      data-sh-toast={toasterID}
    />
  );
}

export interface ToastData<T> {
  id: string;
  data: T;
}

export type ToasterListener<T> = (queue: ToastData<T>[]) => void;

export class Toaster<T> {
  private static toasterID = 0;

  private id: number;

  private queue: ToastData<T>[] = [];

  private listeners = new Set<ToasterListener<T>>();

  private toastID = 0;

  constructor() {
    this.id = Toaster.toasterID;
    Toaster.toasterID += 1;
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

export function useToaster<T>(toaster: Toaster<T>): () => ToastData<T>[] {
  const [signal, setSignal] = createSignal(toaster.getQueue());

  createEffect(() => {
    onCleanup(toaster.subscribe(setSignal));
  });

  return signal;
}
