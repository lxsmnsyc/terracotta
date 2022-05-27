import { JSX } from 'solid-js/jsx-runtime';
import { DynamicProps, ValidConstructor } from '../utils/dynamic-prop';
export declare type AlertProps<T extends ValidConstructor = 'div'> = {
    as?: T;
} & Omit<DynamicProps<T>, 'as'>;
export declare function Alert<T extends ValidConstructor = 'div'>(props: AlertProps<T>): JSX.Element;
