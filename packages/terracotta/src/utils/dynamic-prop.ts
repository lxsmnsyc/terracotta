import type { ComponentProps, JSX, ValidComponent } from '@solidjs/web';
import type { Component, Signal } from 'solid-js';
import { createEffect, createSignal } from 'solid-js';
import type { OmitAndMerge } from './types';

export type ValidElements = keyof JSX.IntrinsicElements;

type UnboxIntrinsicElements<T> = T extends JSX.HTMLAttributes<infer U> ? U : never;

type RefCallback<T> = (el: T) => void;
type RefField<T> = T | RefCallback<T>;

type UnboxComponentProp<U> = U extends { ref: infer X } ? X : never;

export type DynamicNode<T extends ValidComponent> = T extends ValidElements
  ? UnboxIntrinsicElements<JSX.IntrinsicElements[T]>
  : T extends Component<infer U>
    ? UnboxComponentProp<U>
    : never;

// Just a dynamic way to make a `ref` property
// based on the constructor
export interface WithRef<T extends ValidComponent> {
  ref?: RefField<DynamicNode<T>>;
}

export interface DynamicComponent<T extends ValidComponent> {
  as?: T;
}

export interface DynamicComponentWithRef<T extends ValidComponent> extends WithRef<T> {
  as?: T;
}

export type HeadlessProps<T extends ValidComponent, V = {}> = OmitAndMerge<
  V & DynamicComponent<T>,
  ComponentProps<T>
>;

export type HeadlessPropsWithRef<T extends ValidComponent, V = {}> = OmitAndMerge<
  V & DynamicComponentWithRef<T>,
  ComponentProps<T>
>;

function isRefFunction<U extends ValidComponent>(
  callback?: RefField<DynamicNode<U>>,
): callback is RefCallback<DynamicNode<U>> {
  return typeof callback === 'function';
}

// `props.ref` could have been used however it doesn't enforce
// proper timing. We want to make sure that `ref` is called in
// a way that it behaves the same way as if it were called
// natively on an element (which runs in the same scope as the component)
// This is useful if the ref function itself has ownership-based calls
// like createEffect
export function createForwardRef<U extends ValidComponent>(
  props: WithRef<U>,
): Signal<DynamicNode<U> | undefined> {
  const [ref, setRef] = createSignal<DynamicNode<U>>();

  createEffect(ref, (current) => {
    // Technically Solid compiles refs on components into
    // a function, despite the fact that its type definition
    // says that it is either a function or the ref type
    if (current && 'ref' in props && isRefFunction(props.ref)) {
      props.ref(current);
    }
  });

  return [ref, setRef];
}
