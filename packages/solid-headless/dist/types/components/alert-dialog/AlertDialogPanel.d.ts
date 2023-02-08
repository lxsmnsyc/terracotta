import { JSX } from 'solid-js';
import { HeadlessDisclosureChildProps } from '../../headless/disclosure';
import { ValidConstructor, HeadlessPropsWithRef } from '../../utils/dynamic-prop';
export type AlertDialogPanelProps<T extends ValidConstructor = 'div'> = HeadlessPropsWithRef<T, HeadlessDisclosureChildProps>;
export declare function AlertDialogPanel<T extends ValidConstructor = 'div'>(props: AlertDialogPanelProps<T>): JSX.Element;
