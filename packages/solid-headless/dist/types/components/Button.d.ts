import { JSX } from 'solid-js/jsx-runtime';
import { DynamicProps, ValidConstructor, WithRef } from '../utils/dynamic-prop';
export declare type ButtonProps<T extends ValidConstructor = 'button'> = {
    as?: T;
    disabled?: boolean;
} & WithRef<T> & Omit<DynamicProps<T>, 'as' | 'disabled' | 'ref'>;
export declare function Button<T extends ValidConstructor = 'button'>(props: ButtonProps<T>): JSX.Element;
