import { JSX } from 'solid-js';
import { HeadlessSelectOptionProps, HeadlessSelectRootProps } from '../headless/Select';
import { DynamicProps, ValidConstructor, WithRef } from '../utils/dynamic-prop';
import { ButtonProps } from './Button';
export declare type SelectProps<V, T extends ValidConstructor = 'ul'> = {
    as?: T;
    horizontal?: boolean;
} & Omit<HeadlessSelectRootProps<V>, 'CONTROLLED'> & WithRef<T> & Omit<DynamicProps<T>, keyof HeadlessSelectRootProps<V>>;
export declare function Select<V, T extends ValidConstructor = 'ul'>(props: SelectProps<V, T>): JSX.Element;
export declare type SelectOptionProps<V, T extends ValidConstructor = 'li'> = {
    as?: T;
} & HeadlessSelectOptionProps<V> & WithRef<T> & Omit<ButtonProps<T>, keyof HeadlessSelectOptionProps<V>>;
export declare function SelectOption<V, T extends ValidConstructor = 'li'>(props: SelectOptionProps<V, T>): JSX.Element;
