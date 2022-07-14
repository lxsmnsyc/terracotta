import { JSX } from 'solid-js';
import { HeadlessSelectRootChildren, HeadlessSelectSingleControlledOptions } from '../../headless/select';
import { HeadlessPropsWithRef, ValidConstructor } from '../../utils/dynamic-prop';
export declare type RadioGroupControlledProps<V, T extends ValidConstructor = 'div'> = HeadlessPropsWithRef<T, HeadlessSelectSingleControlledOptions<V> & HeadlessSelectRootChildren<V>>;
export declare function RadioGroupControlled<V, T extends ValidConstructor = 'div'>(props: RadioGroupControlledProps<V, T>): JSX.Element;
