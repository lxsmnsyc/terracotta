import { JSX } from 'solid-js';
import { OmitAndMerge } from './types';

export type ValidElements = keyof JSX.IntrinsicElements;
export type ValidComponent<P> = (props: P) => JSX.Element;
export type ValidConstructor = ValidElements | ValidComponent<any>;

export type DynamicProps<T extends ValidConstructor> =
  T extends ValidElements
    ? JSX.IntrinsicElements[T]
    :
  T extends ValidComponent<infer U>
    ? U
    : never;

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

export type WithDynamic<T extends ValidConstructor, V> =
  OmitAndMerge<V & DynamicComponent<T>, DynamicProps<T>>;

export type WithDynamicRef<T extends ValidConstructor, V> =
  OmitAndMerge<V & DynamicComponentWithRef<T>, DynamicProps<T>>;

function isRefFunction<U extends ValidConstructor>(
  callback?: RefField<DynamicNode<U>>,
): callback is RefCallback<DynamicNode<U>> {
  return typeof callback === 'function';
}

export function createRef<U extends ValidConstructor>(
  props: WithRef<U>,
  callback: RefCallback<DynamicNode<U>>,
): RefCallback<DynamicNode<U>> {
  return (e) => {
    if ('ref' in props && isRefFunction(props.ref)) {
      props.ref(e);
    }
    callback(e);
  };
}
