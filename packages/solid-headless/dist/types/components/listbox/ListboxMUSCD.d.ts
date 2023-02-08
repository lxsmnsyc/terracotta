import { JSX } from 'solid-js';
import { HeadlessDisclosureControlledOptions } from '../../headless/disclosure';
import { HeadlessSelectMultipleUncontrolledOptions } from '../../headless/select';
import { HeadlessProps, ValidConstructor } from '../../utils/dynamic-prop';
import Fragment from '../../utils/Fragment';
import { ListboxBaseProps, ListboxMultipleBaseProps } from './types';
type ListboxMUSCDBaseProps<V> = ListboxBaseProps & ListboxMultipleBaseProps<V> & Omit<HeadlessSelectMultipleUncontrolledOptions<V>, 'onChange'> & Omit<HeadlessDisclosureControlledOptions, 'onChange'> & {
    children?: JSX.Element;
};
export type ListboxMUSCDProps<V, T extends ValidConstructor = typeof Fragment> = HeadlessProps<T, ListboxMUSCDBaseProps<V>>;
export declare function ListboxMUSCD<V, T extends ValidConstructor = typeof Fragment>(props: ListboxMUSCDProps<V, T>): JSX.Element;
export {};
