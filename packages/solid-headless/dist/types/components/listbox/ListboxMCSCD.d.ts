import { JSX } from 'solid-js';
import { HeadlessDisclosureControlledOptions } from '../../headless/disclosure';
import { HeadlessSelectMultipleControlledOptions } from '../../headless/select';
import { HeadlessProps, ValidConstructor } from '../../utils/dynamic-prop';
import Fragment from '../../utils/Fragment';
import { ListboxBaseProps, ListboxMultipleBaseProps } from './types';
type ListboxMCSCDBaseProps<V> = ListboxBaseProps & ListboxMultipleBaseProps<V> & Omit<HeadlessSelectMultipleControlledOptions<V>, 'onChange'> & Omit<HeadlessDisclosureControlledOptions, 'onChange'> & {
    children?: JSX.Element;
};
export type ListboxMCSCDProps<V, T extends ValidConstructor = typeof Fragment> = HeadlessProps<T, ListboxMCSCDBaseProps<V>>;
export declare function ListboxMCSCD<V, T extends ValidConstructor = typeof Fragment>(props: ListboxMCSCDProps<V, T>): JSX.Element;
export {};
