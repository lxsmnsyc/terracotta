import { JSX } from 'solid-js';
import { HeadlessDisclosureChildProps } from '../../headless/disclosure';
import { ValidConstructor, HeadlessProps } from '../../utils/dynamic-prop';
export declare type AlertDialogDescriptionProps<T extends ValidConstructor = 'p'> = HeadlessProps<T, HeadlessDisclosureChildProps>;
export declare function AlertDialogDescription<T extends ValidConstructor = 'p'>(props: AlertDialogDescriptionProps<T>): JSX.Element;
