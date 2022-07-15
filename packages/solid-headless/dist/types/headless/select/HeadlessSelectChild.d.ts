import { JSX } from 'solid-js';
import { HeadlessSelectProperties } from './useHeadlessSelectProperties';
export declare type HeadlessSelectChildRenderProp<T> = ((properties: HeadlessSelectProperties<T>) => JSX.Element);
export interface HeadlessSelectChildProps<T> {
    children?: JSX.Element | HeadlessSelectChildRenderProp<T>;
}
export declare function HeadlessSelectChild<T>(props: HeadlessSelectChildProps<T>): JSX.Element;
export declare function createHeadlessSelectChild<T>(props: HeadlessSelectChildProps<T>): {
    children: JSX.Element;
};
