import { JSX } from 'solid-js';
import { ValidConstructor, HeadlessProps } from '../../utils/dynamic-prop';
export declare type AlertProps<T extends ValidConstructor = 'div'> = HeadlessProps<T>;
export declare function Alert<T extends ValidConstructor = 'div'>(props: AlertProps<T>): JSX.Element;
