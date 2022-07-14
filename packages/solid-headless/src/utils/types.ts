import { JSX } from 'solid-js';

export interface Ref<T> {
  value: T;
}

export type OmitAndMerge<A, B> = A & Omit<B, keyof A>;

export type NonLazyElement = Exclude<JSX.Element, JSX.FunctionElement>;
