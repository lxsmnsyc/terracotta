import { JSX } from 'solid-js';
import { HeadlessSelectRootChildren, HeadlessSelectSingleControlledOptions } from '../../headless/select';
import { HeadlessPropsWithRef, ValidConstructor } from '../../utils/dynamic-prop';
interface TabGroupControlledBaseProps<V> extends HeadlessSelectSingleControlledOptions<V>, HeadlessSelectRootChildren<V> {
    horizontal: boolean;
}
export declare type TabGroupControlledProps<V, T extends ValidConstructor = 'div'> = HeadlessPropsWithRef<T, TabGroupControlledBaseProps<V>>;
export declare function TabGroupControlled<V, T extends ValidConstructor = 'div'>(props: TabGroupControlledProps<V, T>): JSX.Element;
export {};
