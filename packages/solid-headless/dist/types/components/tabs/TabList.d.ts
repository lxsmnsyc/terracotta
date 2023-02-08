import { JSX } from 'solid-js';
import { HeadlessSelectChildProps } from '../../headless/select';
import { HeadlessPropsWithRef, ValidConstructor } from '../../utils/dynamic-prop';
export type TabListProps<V, T extends ValidConstructor = 'div'> = HeadlessPropsWithRef<T, HeadlessSelectChildProps<V>>;
export declare function TabList<V, T extends ValidConstructor = 'div'>(props: TabListProps<V, T>): JSX.Element;
