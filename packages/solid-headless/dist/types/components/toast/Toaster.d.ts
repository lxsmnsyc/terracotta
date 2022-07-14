import { JSX } from 'solid-js';
import { ValidConstructor, HeadlessProps } from '../../utils/dynamic-prop';
export declare type ToasterProps<T extends ValidConstructor = 'div'> = HeadlessProps<T>;
export declare function Toaster<T extends ValidConstructor = 'div'>(props: ToasterProps<T>): JSX.Element;
