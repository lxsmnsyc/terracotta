import { JSX } from 'solid-js';
import { SelectBaseProps } from './types';
import { HeadlessSelectSingleControlledOptions, HeadlessSelectRootChildren } from '../../headless/select';
import { HeadlessPropsWithRef, ValidConstructor } from '../../utils/dynamic-prop';
declare type SelectSingleControlledBaseProps<V> = SelectBaseProps & HeadlessSelectSingleControlledOptions<V> & HeadlessSelectRootChildren<V>;
export declare type SelectSingleControlledProps<V, T extends ValidConstructor = 'ul'> = HeadlessPropsWithRef<T, SelectSingleControlledBaseProps<V>>;
export declare function SelectSingleControlled<V, T extends ValidConstructor = 'ul'>(props: SelectSingleControlledProps<V, T>): JSX.Element;
export {};
