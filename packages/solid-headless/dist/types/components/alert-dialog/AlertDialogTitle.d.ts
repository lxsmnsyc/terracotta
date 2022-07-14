import { JSX } from 'solid-js';
import { HeadlessDisclosureChildProps } from '../../headless/disclosure';
import { ValidConstructor, HeadlessProps } from '../../utils/dynamic-prop';
export declare type AlertDialogTitleProps<T extends ValidConstructor = 'h2'> = HeadlessProps<T, HeadlessDisclosureChildProps>;
export declare function AlertDialogTitle<T extends ValidConstructor = 'h2'>(props: AlertDialogTitleProps<T>): JSX.Element;
