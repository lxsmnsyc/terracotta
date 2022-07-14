export interface Ref<T> {
    value: T;
}
export declare type OmitAndMerge<A, B> = A & Omit<B, keyof A>;
