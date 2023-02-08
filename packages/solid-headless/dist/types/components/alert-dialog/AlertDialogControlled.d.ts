import { JSX } from 'solid-js';
import { HeadlessDisclosureControlledOptions } from '../../headless/disclosure';
import { ValidConstructor, HeadlessProps } from '../../utils/dynamic-prop';
import { AlertDialogBaseProps } from './types';
export type AlertDialogControlledBaseProps = AlertDialogBaseProps & HeadlessDisclosureControlledOptions;
export type AlertDialogControlledProps<T extends ValidConstructor = 'div'> = HeadlessProps<T, AlertDialogControlledBaseProps>;
export declare function AlertDialogControlled<T extends ValidConstructor = 'div'>(props: AlertDialogControlledProps<T>): JSX.Element;
