import { JSX } from 'solid-js';
import { HeadlessDisclosureUncontrolledOptions } from '../../headless/disclosure';
import { HeadlessSelectSingleControlledOptions } from '../../headless/select';
import { HeadlessProps, ValidConstructor } from '../../utils/dynamic-prop';
import Fragment from '../../utils/Fragment';
import { ListboxBaseProps, ListboxSingleBaseProps } from './types';
declare type ListboxSCSUDBaseProps<V> = ListboxBaseProps & ListboxSingleBaseProps<V> & Omit<HeadlessSelectSingleControlledOptions<V>, 'onChange'> & Omit<HeadlessDisclosureUncontrolledOptions, 'onChange'> & {
    children?: JSX.Element;
};
export declare type ListboxSCSUDProps<V, T extends ValidConstructor = typeof Fragment> = HeadlessProps<T, ListboxSCSUDBaseProps<V>>;
export declare function ListboxSCSUD<V, T extends ValidConstructor = typeof Fragment>(props: ListboxSCSUDProps<V, T>): JSX.Element;
export {};
