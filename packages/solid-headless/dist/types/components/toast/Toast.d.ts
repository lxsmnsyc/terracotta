import { JSX } from 'solid-js';
import { HeadlessProps, ValidConstructor } from '../../utils/dynamic-prop';
export type ToastProps<T extends ValidConstructor = 'div'> = HeadlessProps<T>;
export declare function Toast<T extends ValidConstructor = 'div'>(props: ToastProps<T>): JSX.Element;
