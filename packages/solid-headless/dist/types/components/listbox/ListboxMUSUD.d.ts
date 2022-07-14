import { JSX } from 'solid-js';
import { HeadlessDisclosureUncontrolledOptions } from '../../headless/disclosure';
import { HeadlessSelectMultipleUncontrolledOptions } from '../../headless/select';
import { HeadlessProps, ValidConstructor } from '../../utils/dynamic-prop';
import Fragment from '../../utils/Fragment';
import { ListboxBaseProps, ListboxMultipleBaseProps } from './types';
declare type ListboxMUSUDBaseProps<V> = ListboxBaseProps & ListboxMultipleBaseProps<V> & Omit<HeadlessSelectMultipleUncontrolledOptions<V>, 'onChange'> & Omit<HeadlessDisclosureUncontrolledOptions, 'onChange'> & {
    children?: JSX.Element;
};
export declare type ListboxMUSUDProps<V, T extends ValidConstructor = typeof Fragment> = HeadlessProps<T, ListboxMUSUDBaseProps<V>>;
export declare function ListboxMUSUD<V, T extends ValidConstructor = typeof Fragment>(props: ListboxMUSUDProps<V, T>): JSX.Element;
export {};
