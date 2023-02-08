import { JSX } from 'solid-js';
import { SelectBaseProps } from './types';
import { HeadlessSelectSingleUncontrolledOptions, HeadlessSelectRootChildren } from '../../headless/select';
import { HeadlessPropsWithRef, ValidConstructor } from '../../utils/dynamic-prop';
type SelectSingleUncontrolledBaseProps<V> = SelectBaseProps & HeadlessSelectSingleUncontrolledOptions<V> & HeadlessSelectRootChildren<V>;
export type SelectSingleUncontrolledProps<V, T extends ValidConstructor = 'ul'> = HeadlessPropsWithRef<T, SelectSingleUncontrolledBaseProps<V>>;
export declare function SelectSingleUncontrolled<V, T extends ValidConstructor = 'ul'>(props: SelectSingleUncontrolledProps<V, T>): JSX.Element;
export {};
