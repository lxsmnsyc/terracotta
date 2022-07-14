import { JSX } from 'solid-js';
import { HeadlessDisclosureUncontrolledOptions } from '../../headless/disclosure';
import { HeadlessSelectMultipleControlledOptions } from '../../headless/select';
import { HeadlessProps, ValidConstructor } from '../../utils/dynamic-prop';
import Fragment from '../../utils/Fragment';
import { ListboxBaseProps, ListboxMultipleBaseProps } from './types';
declare type ListboxMCSUDBaseProps<V> = ListboxBaseProps & ListboxMultipleBaseProps<V> & Omit<HeadlessSelectMultipleControlledOptions<V>, 'onChange'> & Omit<HeadlessDisclosureUncontrolledOptions, 'onChange'> & {
    children?: JSX.Element;
};
export declare type ListboxMCSUDProps<V, T extends ValidConstructor = typeof Fragment> = HeadlessProps<T, ListboxMCSUDBaseProps<V>>;
export declare function ListboxMCSUD<V, T extends ValidConstructor = typeof Fragment>(props: ListboxMCSUDProps<V, T>): JSX.Element;
export {};
