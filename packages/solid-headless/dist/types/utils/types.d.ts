export interface Ref<T> {
    value: T;
}
export type OmitAndMerge<A, B> = A & Omit<B, keyof A>;
