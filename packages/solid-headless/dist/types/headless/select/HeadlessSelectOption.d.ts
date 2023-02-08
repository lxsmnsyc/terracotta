import { JSX } from 'solid-js';
import { HeadlessSelectOptionProperties } from './useHeadlessSelectOption';
export type HeadlessSelectOptionRenderProp = ((properties: HeadlessSelectOptionProperties) => JSX.Element);
export interface HeadlessSelectOptionProps<T> {
    value: T;
    disabled?: boolean;
    children?: JSX.Element | HeadlessSelectOptionRenderProp;
}
export declare function HeadlessSelectOption<T>(props: HeadlessSelectOptionProps<T>): JSX.Element;
export declare function createHeadlessSelectOptionProps<T>(props: HeadlessSelectOptionProps<T>): {
    children?: JSX.Element | HeadlessSelectOptionRenderProp;
};
export interface HeadlessSelectOptionChildProps {
    children?: JSX.Element | HeadlessSelectOptionRenderProp;
}
export declare function HeadlessSelectOptionChild(props: HeadlessSelectOptionChildProps): JSX.Element;
export declare function createHeadlessSelectOptionChildProps(props: HeadlessSelectOptionChildProps): HeadlessSelectOptionChildProps;
