import { JSX } from 'solid-js';
import { SelectBaseProps } from './types';
import { HeadlessSelectMultipleControlledOptions, HeadlessSelectRootChildren } from '../../headless/select';
import { HeadlessPropsWithRef, ValidConstructor } from '../../utils/dynamic-prop';
declare type SelectMultipleControlledBaseProps<V> = SelectBaseProps & HeadlessSelectMultipleControlledOptions<V> & HeadlessSelectRootChildren<V>;
export declare type SelectMultipleControlledProps<V, T extends ValidConstructor = 'ul'> = HeadlessPropsWithRef<T, SelectMultipleControlledBaseProps<V>>;
export declare function SelectMultipleControlled<V, T extends ValidConstructor = 'ul'>(props: SelectMultipleControlledProps<V, T>): JSX.Element;
export {};
