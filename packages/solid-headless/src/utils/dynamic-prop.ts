import {
  createEffect,
  createSignal,
  JSX,
  Signal,
} from 'solid-js';
import { OmitAndMerge } from './types';

export type ValidElements = keyof JSX.IntrinsicElements;
export type ValidComponent<P> = (props: P) => JSX.Element;
export type ValidConstructor =
  | ValidElements
  | ValidComponent<any>
  // eslint-disable-next-line @typescript-eslint/ban-types
  | (string & {});

export type DynamicProps<T extends ValidConstructor> =
  T extends ValidElements
    ? JSX.IntrinsicElements[T]
    :
  T extends ValidComponent<infer U>
    ? U
    : Record<string, unknown>;

type UnboxIntrinsicElements<T> =
  T extends JSX.HTMLAttributes<infer U>
    ? U
    : never;

type RefCallback<T> = (el: T) => void;
type RefField<T> = T | RefCallback<T>;

type UnboxComponentProp<U> =
  U extends { ref: infer X }
    ? X
    : never;

export type DynamicNode<T extends ValidConstructor> =
  T extends ValidElements
    ? UnboxIntrinsicElements<JSX.IntrinsicElements[T]>
    :
  T extends ValidComponent<infer U>
    ? UnboxComponentProp<U>
    : never;

export interface WithRef<T extends ValidConstructor> {
  ref?: RefField<DynamicNode<T>>;
}

export interface DynamicComponent<T extends ValidConstructor> {
  as?: T;
}

export interface DynamicComponentWithRef<T extends ValidConstructor> extends WithRef<T> {
  as?: T;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type HeadlessProps<T extends ValidConstructor, V = {}> =
  OmitAndMerge<V & DynamicComponent<T>, DynamicProps<T>>;

// eslint-disable-next-line @typescript-eslint/ban-types
export type HeadlessPropsWithRef<T extends ValidConstructor, V = {}> =
  OmitAndMerge<V & DynamicComponentWithRef<T>, DynamicProps<T>>;

function isRefFunction<U extends ValidConstructor>(
  callback?: RefField<DynamicNode<U>>,
): callback is RefCallback<DynamicNode<U>> {
  return typeof callback === 'function';
}

export function createForwardRef<U extends ValidConstructor>(
  props: WithRef<U>,
): Signal<DynamicNode<U> | undefined> {
  const [ref, setRef] = createSignal<DynamicNode<U>>();

  createEffect(() => {
    const current = ref();
    if (current && 'ref' in props && isRefFunction(props.ref)) {
      props.ref(current);
    }
  });

  return [ref, setRef];
}
