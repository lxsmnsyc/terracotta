import { JSX } from 'solid-js';
import { SelectBaseProps } from './types';
import { HeadlessSelectSingleControlledOptions, HeadlessSelectRootChildren } from '../../headless/select';
import { HeadlessPropsWithRef, ValidConstructor } from '../../utils/dynamic-prop';
type SelectSingleControlledBaseProps<V> = SelectBaseProps & HeadlessSelectSingleControlledOptions<V> & HeadlessSelectRootChildren<V>;
export type SelectSingleControlledProps<V, T extends ValidConstructor = 'ul'> = HeadlessPropsWithRef<T, SelectSingleControlledBaseProps<V>>;
export declare function SelectSingleControlled<V, T extends ValidConstructor = 'ul'>(props: SelectSingleControlledProps<V, T>): JSX.Element;
export {};
