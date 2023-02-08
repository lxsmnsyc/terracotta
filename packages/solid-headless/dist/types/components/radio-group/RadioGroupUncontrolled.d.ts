import { JSX } from 'solid-js';
import { HeadlessSelectRootChildren, HeadlessSelectSingleUncontrolledOptions } from '../../headless/select';
import { HeadlessPropsWithRef, ValidConstructor } from '../../utils/dynamic-prop';
export type RadioGroupUncontrolledProps<V, T extends ValidConstructor = 'div'> = HeadlessPropsWithRef<T, HeadlessSelectSingleUncontrolledOptions<V> & HeadlessSelectRootChildren<V>>;
export declare function RadioGroupUncontrolled<V, T extends ValidConstructor = 'div'>(props: RadioGroupUncontrolledProps<V, T>): JSX.Element;
