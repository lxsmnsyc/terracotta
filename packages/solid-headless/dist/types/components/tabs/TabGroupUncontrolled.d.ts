import { JSX } from 'solid-js';
import { HeadlessSelectRootChildren, HeadlessSelectSingleUncontrolledOptions } from '../../headless/select';
import { HeadlessPropsWithRef, ValidConstructor } from '../../utils/dynamic-prop';
interface TabGroupUncontrolledBaseProps<V> extends HeadlessSelectSingleUncontrolledOptions<V>, HeadlessSelectRootChildren<V> {
    horizontal: boolean;
}
export declare type TabGroupUncontrolledProps<V, T extends ValidConstructor = 'div'> = HeadlessPropsWithRef<T, TabGroupUncontrolledBaseProps<V>>;
export declare function TabGroupUncontrolled<V, T extends ValidConstructor = 'div'>(props: TabGroupUncontrolledProps<V, T>): JSX.Element;
export {};
