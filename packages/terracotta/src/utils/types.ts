export interface Ref<T> {
  value: T;
}

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type OmitAndMerge<A, B> = A & Omit<B, keyof A>;
