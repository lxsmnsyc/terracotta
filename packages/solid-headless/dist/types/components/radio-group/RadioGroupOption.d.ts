import { JSX } from 'solid-js';
import { HeadlessSelectOptionProps } from '../../headless/select';
import { HeadlessPropsWithRef, ValidConstructor } from '../../utils/dynamic-prop';
export declare type RadioGroupOptionProps<V, T extends ValidConstructor = 'div'> = HeadlessPropsWithRef<T, HeadlessSelectOptionProps<V>>;
export declare function RadioGroupOption<V, T extends ValidConstructor = 'div'>(props: RadioGroupOptionProps<V, T>): JSX.Element;
