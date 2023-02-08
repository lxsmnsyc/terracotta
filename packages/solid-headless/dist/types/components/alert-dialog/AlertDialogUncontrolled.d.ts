import { JSX } from 'solid-js';
import { HeadlessDisclosureUncontrolledOptions } from '../../headless/disclosure';
import { HeadlessProps, ValidConstructor } from '../../utils/dynamic-prop';
import { AlertDialogBaseProps } from './types';
export type AlertDialogUncontrolledBaseProps = AlertDialogBaseProps & HeadlessDisclosureUncontrolledOptions;
export type AlertDialogUncontrolledProps<T extends ValidConstructor = 'div'> = HeadlessProps<T, AlertDialogUncontrolledBaseProps>;
export declare function AlertDialogUncontrolled<T extends ValidConstructor = 'div'>(props: AlertDialogUncontrolledProps<T>): JSX.Element;
