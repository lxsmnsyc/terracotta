import { Dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { createContext, createSignal, createUniqueId, omit, onSettled, useContext } from 'solid-js';
import assert from '../../utils/assert';
import type { HeadlessProps } from '../../utils/dynamic-prop';
import { createTag } from '../../utils/namespace';

const TOAST_TAG = createTag('toast');
const TOASTER_TAG = createTag('toaster');

interface ToastContextData {
  ownerID: string;
}

const ToastContext = createContext<ToastContextData | null>(null);

function useToastContext(componentName: string): ToastContextData {
  const context = useContext(ToastContext);
  assert(context, new Error(`<${componentName}> must be used inside a <Toaster>`));
  return context;
}

export type ToastProps<T extends ValidComponent = 'div'> = HeadlessProps<T>;

/**
 * One notification inside a {@link Toaster}. Carries `role="status"`, so it is
 * announced without stealing focus.
 *
 * Renders a `<div>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/toast.md}
 */
export function Toast<T extends ValidComponent = 'div'>(props: ToastProps<T>): JSX.Element {
  useToastContext('Toast');

  const rest = omit(props, 'as');
  return (
    <Dynamic
      component={props.as || 'div'}
      {...TOAST_TAG}
      role="status"
      aria-live="polite"
      {...rest}
    />
  );
}

export type ToasterProps<T extends ValidComponent = 'div'> = HeadlessProps<T>;

/**
 * The region that holds the toasts. It does not read the queue for you:
 * subscribe with {@link useToaster} and map over the result yourself.
 *
 * Renders a `<div>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/toast.md}
 */
export function Toaster<T extends ValidComponent = 'div'>(props: ToasterProps<T>): JSX.Element {
  const ownerID = createUniqueId();

  const rest2 = omit(props, 'as');
  return (
    <ToastContext
      value={{
        ownerID,
      }}
    >
      <Dynamic component={props.as || 'div'} {...TOASTER_TAG} {...rest2} />
    </ToastContext>
  );
}
export interface ToastData<T> {
  id: string;
  data: T;
}

export type ToasterListener<T> = (queue: ToastData<T>[]) => void;

/**
 * The queue behind a {@link Toaster}. Create one at module scope and share it,
 * so any code can push a toast with `create`, drop one with `remove`, or empty
 * the queue with `clear`.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/toast.md}
 */
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
    const id = `toast-${this.id}-${this.toastID}`;
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

/**
 * Subscribes to a {@link ToasterStore} and returns its queue as a signal. The
 * store is passed in rather than read from context, so the same queue can be
 * reached from anywhere in the app, including outside the component tree.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/toast.md}
 */
export function useToaster<T>(toaster: ToasterStore<T>): () => ToastData<T>[] {
  const [signal, setSignal] = createSignal(toaster.getQueue());

  onSettled(() => toaster.subscribe(setSignal));

  return signal;
}
