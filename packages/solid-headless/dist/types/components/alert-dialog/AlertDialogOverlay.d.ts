import { JSX } from 'solid-js';
import { HeadlessDisclosureChildProps } from '../../headless/disclosure';
import { ValidConstructor, HeadlessPropsWithRef } from '../../utils/dynamic-prop';
export declare type AlertDialogOverlayProps<T extends ValidConstructor = 'div'> = HeadlessPropsWithRef<T, HeadlessDisclosureChildProps>;
export declare function AlertDialogOverlay<T extends ValidConstructor = 'div'>(props: AlertDialogOverlayProps<T>): JSX.Element;
