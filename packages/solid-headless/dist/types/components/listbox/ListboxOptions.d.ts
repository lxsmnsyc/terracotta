import { JSX } from 'solid-js';
import { HeadlessSelectChildProps } from '../../headless/select';
import { HeadlessPropsWithRef, ValidConstructor } from '../../utils/dynamic-prop';
export type ListboxOptionsProps<V, T extends ValidConstructor = 'ul'> = HeadlessPropsWithRef<T, HeadlessSelectChildProps<V>>;
export declare function ListboxOptions<V, T extends ValidConstructor = 'ul'>(props: ListboxOptionsProps<V, T>): JSX.Element;
