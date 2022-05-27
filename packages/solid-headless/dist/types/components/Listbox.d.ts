import { JSX } from 'solid-js';
import { HeadlessSelectChildProps, HeadlessSelectOptionProps, HeadlessSelectRootProps } from '../headless/Select';
import { DynamicProps, ValidConstructor, WithRef } from '../utils/dynamic-prop';
import Fragment from '../utils/Fragment';
import { HeadlessDisclosureChildProps, HeadlessDisclosureRootProps } from '../headless/Disclosure';
import { ButtonProps } from './Button';
interface ListboxMultipleProps<V> {
    multiple: true;
    onSelectChange?: (value: V[]) => void;
}
interface ListboxSingleProps<V> {
    multiple?: false;
    onSelectChange?: (value?: V) => void;
}
declare type ListboxBaseProps<V> = ListboxMultipleProps<V> | ListboxSingleProps<V>;
export declare type ListboxProps<V, T extends ValidConstructor = typeof Fragment> = {
    as?: T;
    horizontal?: boolean;
    onDisclosureChange?: (value: boolean) => void;
} & ListboxBaseProps<V> & Omit<HeadlessSelectRootProps<V>, 'multiple' | 'children' | 'onChange' | 'CONTROLLED'> & Omit<HeadlessDisclosureRootProps, 'onChange' | 'CONTROLLED'> & Omit<DynamicProps<T>, keyof HeadlessDisclosureRootProps | keyof HeadlessSelectRootProps<V>>;
export declare function Listbox<V, T extends ValidConstructor = typeof Fragment>(props: ListboxProps<V, T>): JSX.Element;
export declare type ListboxLabelProps<T extends ValidConstructor = 'label'> = {
    as?: T;
} & HeadlessDisclosureChildProps & Omit<DynamicProps<T>, keyof HeadlessDisclosureChildProps>;
export declare function ListboxLabel<T extends ValidConstructor = 'label'>(props: ListboxLabelProps<T>): JSX.Element;
export declare type ListboxButtonProps<T extends ValidConstructor = 'button'> = {
    as?: T;
} & HeadlessDisclosureChildProps & WithRef<T> & Omit<DynamicProps<T>, keyof HeadlessDisclosureChildProps>;
export declare function ListboxButton<T extends ValidConstructor = 'button'>(props: ListboxButtonProps<T>): JSX.Element;
export declare type ListboxOptionsProps<V, T extends ValidConstructor = 'ul'> = {
    as?: T;
} & HeadlessSelectChildProps<V> & WithRef<T> & Omit<DynamicProps<T>, keyof HeadlessSelectChildProps<V>>;
export declare function ListboxOptions<V, T extends ValidConstructor = 'ul'>(props: ListboxOptionsProps<V, T>): JSX.Element;
export declare type ListboxOptionProps<V, T extends ValidConstructor = 'li'> = {
    as?: T;
} & HeadlessSelectOptionProps<V> & WithRef<T> & Omit<ButtonProps<T>, keyof HeadlessSelectOptionProps<V>>;
export declare function ListboxOption<V, T extends ValidConstructor = 'li'>(props: ListboxOptionProps<V, T>): JSX.Element;
export {};
