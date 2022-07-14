import { JSX } from 'solid-js';
import { OmitAndMerge } from './types';
export declare type ValidElements = keyof JSX.IntrinsicElements;
export declare type ValidComponent<P> = (props: P) => JSX.Element;
export declare type ValidConstructor = ValidElements | ValidComponent<any> | (string & {});
export declare type DynamicProps<T extends ValidConstructor> = T extends ValidElements ? JSX.IntrinsicElements[T] : T extends ValidComponent<infer U> ? U : Record<string, unknown>;
declare type UnboxIntrinsicElements<T> = T extends JSX.HTMLAttributes<infer U> ? U : never;
declare type RefCallback<T> = (el: T) => void;
declare type RefField<T> = T | RefCallback<T>;
declare type UnboxComponentProp<U> = U extends {
    ref: infer X;
} ? X : never;
export declare type DynamicNode<T extends ValidConstructor> = T extends ValidElements ? UnboxIntrinsicElements<JSX.IntrinsicElements[T]> : T extends ValidComponent<infer U> ? UnboxComponentProp<U> : never;
export interface WithRef<T extends ValidConstructor> {
    ref?: RefField<DynamicNode<T>>;
}
export interface DynamicComponent<T extends ValidConstructor> {
    as?: T;
}
export interface DynamicComponentWithRef<T extends ValidConstructor> extends WithRef<T> {
    as?: T;
}
export declare type HeadlessProps<T extends ValidConstructor, V = {}> = OmitAndMerge<V & DynamicComponent<T>, DynamicProps<T>>;
export declare type HeadlessPropsWithRef<T extends ValidConstructor, V = {}> = OmitAndMerge<V & DynamicComponentWithRef<T>, DynamicProps<T>>;
export declare function createRef<U extends ValidConstructor>(props: WithRef<U>, callback: RefCallback<DynamicNode<U>>): RefCallback<DynamicNode<U>>;
export {};
