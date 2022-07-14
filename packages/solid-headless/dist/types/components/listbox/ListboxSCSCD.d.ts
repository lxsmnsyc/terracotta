import { JSX } from 'solid-js';
import { HeadlessDisclosureControlledOptions } from '../../headless/disclosure';
import { HeadlessSelectSingleControlledOptions } from '../../headless/select';
import { HeadlessProps, ValidConstructor } from '../../utils/dynamic-prop';
import Fragment from '../../utils/Fragment';
import { ListboxBaseProps, ListboxSingleBaseProps } from './types';
declare type ListboxSCSCDBaseProps<V> = ListboxBaseProps & ListboxSingleBaseProps<V> & Omit<HeadlessSelectSingleControlledOptions<V>, 'onChange'> & Omit<HeadlessDisclosureControlledOptions, 'onChange'> & {
    children?: JSX.Element;
};
export declare type ListboxSCSCDProps<V, T extends ValidConstructor = typeof Fragment> = HeadlessProps<T, ListboxSCSCDBaseProps<V>>;
export declare function ListboxSCSCD<V, T extends ValidConstructor = typeof Fragment>(props: ListboxSCSCDProps<V, T>): JSX.Element;
export {};
