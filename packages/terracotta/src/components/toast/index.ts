import { createDynamic } from '@solidjs/web';
import type { ComponentProps, JSX, ValidComponent } from 'solid-js';
import {
  createComponent,
  createContext,
  createSignal,
  createUniqueId,
  merge,
  omit,
  onSettled,
  useContext,
} from 'solid-js';
import assert from '../../utils/assert';
import type { HeadlessProps } from '../../utils/dynamic-prop';
import { createTag } from '../../utils/namespace';

const TOAST_TAG = createTag('toast');
const TOASTER_TAG = createTag('toaster');

interface ToastContextData {
  ownerID: string;
}

const ToastContext = createContext<ToastContextData>();

function useToastContext(componentName: string): ToastContextData {
  const context = useContext(ToastContext);
  assert(
    context,
    new Error(`<${componentName}> must be used inside a <Toaster>`),
  );
  return context;
}

export type ToastProps<T extends ValidComponent = 'div'> = HeadlessProps<T>;

export function Toast<T extends ValidComponent = 'div'>(
  props: ToastProps<T>,
): JSX.Element {
  useToastContext('Toast');

  return createDynamic(
    () => props.as || ('div' as T),
    merge(
      TOAST_TAG,
      {
        role: 'status',
        'aria-live': 'polite',
      },
      omit(props, 'as'),
    ) as ComponentProps<T>,
  );
}

export type ToasterProps<T extends ValidComponent = 'div'> = HeadlessProps<T>;

export function Toaster<T extends ValidComponent = 'div'>(
  props: ToasterProps<T>,
): JSX.Element {
  const ownerID = createUniqueId();

  return createComponent(ToastContext, {
    value: {
      ownerID,
    },
    get children() {
      return createDynamic(
        () => props.as || ('div' as T),
        merge(TOASTER_TAG, omit(props, 'as')) as ComponentProps<T>,
      );
    },
  });
}
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
    this.queue = this.queue.filter(item => item.id !== id);
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

export function useToaster<T>(toaster: ToasterStore<T>): () => ToastData<T>[] {
  const [signal, setSignal] = createSignal(toaster.getQueue());

  onSettled(() => toaster.subscribe(setSignal));

  return signal;
}
