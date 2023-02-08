import { JSX } from 'solid-js';
import { HeadlessDisclosureUncontrolledOptions } from '../../headless/disclosure';
import { HeadlessSelectSingleUncontrolledOptions } from '../../headless/select';
import { HeadlessProps, ValidConstructor } from '../../utils/dynamic-prop';
import Fragment from '../../utils/Fragment';
import { ListboxBaseProps, ListboxSingleBaseProps } from './types';
type ListboxSUSUDBaseProps<V> = ListboxBaseProps & ListboxSingleBaseProps<V> & Omit<HeadlessSelectSingleUncontrolledOptions<V>, 'onChange'> & Omit<HeadlessDisclosureUncontrolledOptions, 'onChange'> & {
    children?: JSX.Element;
};
export type ListboxSUSUDProps<V, T extends ValidConstructor = typeof Fragment> = HeadlessProps<T, ListboxSUSUDBaseProps<V>>;
export declare function ListboxSUSUD<V, T extends ValidConstructor = typeof Fragment>(props: ListboxSUSUDProps<V, T>): JSX.Element;
export {};
