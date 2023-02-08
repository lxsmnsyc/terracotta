import { JSX } from 'solid-js';
import { HeadlessSelectProperties } from './useHeadlessSelectProperties';
import { HeadlessSelectOptions } from './useHeadlessSelect';
import { HeadlessSelectMultipleControlledOptions, HeadlessSelectMultipleUncontrolledOptions } from './useHeadlessSelectMultiple';
import { HeadlessSelectSingleControlledOptions, HeadlessSelectSingleUncontrolledOptions } from './useHeadlessSelectSingle';
export type HeadlessSelectRootRenderProp<T> = ((properties: HeadlessSelectProperties<T>) => JSX.Element);
export interface HeadlessSelectRootChildren<T> {
    children?: JSX.Element | HeadlessSelectRootRenderProp<T>;
}
export type HeadlessSelectRootProps<T> = HeadlessSelectRootChildren<T> & HeadlessSelectOptions<T>;
export declare function HeadlessSelectRoot<T>(props: HeadlessSelectRootProps<T>): JSX.Element;
export declare function createHeadlessSelectRootMultipleControlledProps<T>(props: HeadlessSelectMultipleControlledOptions<T> & HeadlessSelectRootChildren<T>): HeadlessSelectRootChildren<T>;
export declare function createHeadlessSelectRootMultipleUncontrolledProps<T>(props: HeadlessSelectMultipleUncontrolledOptions<T> & HeadlessSelectRootChildren<T>): HeadlessSelectRootChildren<T>;
export declare function createHeadlessSelectRootSingleControlledProps<T>(props: HeadlessSelectSingleControlledOptions<T> & HeadlessSelectRootChildren<T>): HeadlessSelectRootChildren<T>;
export declare function createHeadlessSelectRootSingleUncontrolledProps<T>(props: HeadlessSelectSingleUncontrolledOptions<T> & HeadlessSelectRootChildren<T>): HeadlessSelectRootChildren<T>;
