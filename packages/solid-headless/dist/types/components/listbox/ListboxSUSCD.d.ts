import { JSX } from 'solid-js';
import { HeadlessDisclosureControlledOptions } from '../../headless/disclosure';
import { HeadlessSelectSingleUncontrolledOptions } from '../../headless/select';
import { HeadlessProps, ValidConstructor } from '../../utils/dynamic-prop';
import Fragment from '../../utils/Fragment';
import { ListboxBaseProps, ListboxSingleBaseProps } from './types';
type ListboxSUSCDBaseProps<V> = ListboxBaseProps & ListboxSingleBaseProps<V> & Omit<HeadlessSelectSingleUncontrolledOptions<V>, 'onChange'> & Omit<HeadlessDisclosureControlledOptions, 'onChange'> & {
    children?: JSX.Element;
};
export type ListboxSUSCDProps<V, T extends ValidConstructor = typeof Fragment> = HeadlessProps<T, ListboxSUSCDBaseProps<V>>;
export declare function ListboxSUSCD<V, T extends ValidConstructor = typeof Fragment>(props: ListboxSUSCDProps<V, T>): JSX.Element;
export {};
