import { JSX } from 'solid-js';
import { SelectBaseProps } from './types';
import { HeadlessSelectMultipleUncontrolledOptions, HeadlessSelectRootChildren } from '../../headless/select';
import { HeadlessPropsWithRef, ValidConstructor } from '../../utils/dynamic-prop';
declare type SelectMultipleUncontrolledBaseProps<V> = SelectBaseProps & HeadlessSelectMultipleUncontrolledOptions<V> & HeadlessSelectRootChildren<V>;
export declare type SelectMultipleUncontrolledProps<V, T extends ValidConstructor = 'ul'> = HeadlessPropsWithRef<T, SelectMultipleUncontrolledBaseProps<V>>;
export declare function SelectMultipleUncontrolled<V, T extends ValidConstructor = 'ul'>(props: SelectMultipleUncontrolledProps<V, T>): JSX.Element;
export {};
