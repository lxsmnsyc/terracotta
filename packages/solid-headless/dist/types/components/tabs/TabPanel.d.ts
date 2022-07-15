import { JSX } from 'solid-js';
import { HeadlessSelectOptionProps } from '../../headless/select';
import { ValidConstructor, HeadlessProps } from '../../utils/dynamic-prop';
interface TabPanelBaseProps<V> extends Exclude<HeadlessSelectOptionProps<V>, 'disabled'> {
    unmount?: boolean;
}
export declare type TabPanelProps<V, T extends ValidConstructor = 'div'> = HeadlessProps<T, TabPanelBaseProps<V>>;
export declare function TabPanel<V, T extends ValidConstructor = 'div'>(props: TabPanelProps<V, T>): JSX.Element;
export {};
