import { JSX } from 'solid-js';
import { HeadlessSelectOptionProps } from '../../headless/select';
import { HeadlessPropsWithRef, ValidConstructor } from '../../utils/dynamic-prop';
export type TabProps<V, T extends ValidConstructor = 'div'> = HeadlessPropsWithRef<T, HeadlessSelectOptionProps<V>>;
export declare function Tab<V, T extends ValidConstructor = 'div'>(props: TabProps<V, T>): JSX.Element;
