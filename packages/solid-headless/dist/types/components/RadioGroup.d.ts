import { JSX } from 'solid-js';
import { HeadlessSelectOptionProps, HeadlessSelectRootProps } from '../headless/Select';
import { DynamicProps, ValidConstructor, WithRef } from '../utils/dynamic-prop';
export declare type RadioGroupProps<V, T extends ValidConstructor = 'div'> = {
    as?: T;
} & Omit<HeadlessSelectRootProps<V>, 'multiple' | 'toggleable' | 'CONTROLLED'> & WithRef<T> & Omit<DynamicProps<T>, keyof HeadlessSelectRootProps<V>>;
export declare function RadioGroup<V, T extends ValidConstructor = 'div'>(props: RadioGroupProps<V, T>): JSX.Element;
export declare type RadioGroupOptionProps<V, T extends ValidConstructor = 'div'> = {
    as?: T;
} & Omit<HeadlessSelectOptionProps<V>, 'multiple'> & WithRef<T> & Omit<DynamicProps<T>, keyof HeadlessSelectOptionProps<V>>;
export declare function RadioGroupOption<V, T extends ValidConstructor = 'div'>(props: RadioGroupOptionProps<V, T>): JSX.Element;
export declare type RadioGroupLabelProps<T extends ValidConstructor = 'label'> = {
    as?: T;
} & Omit<DynamicProps<T>, 'as'>;
export declare function RadioGroupLabel<T extends ValidConstructor = 'label'>(props: RadioGroupLabelProps<T>): JSX.Element;
export declare type RadioGroupDescriptionProps<T extends ValidConstructor = 'div'> = {
    as?: T;
} & Omit<DynamicProps<T>, 'as'>;
export declare function RadioGroupDescription<T extends ValidConstructor = 'div'>(props: RadioGroupDescriptionProps<T>): JSX.Element;
