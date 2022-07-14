import { JSX } from 'solid-js';
import { HeadlessDisclosureUncontrolledOptions } from '../../headless/disclosure';
import { HeadlessProps, ValidConstructor } from '../../utils/dynamic-prop';
import { AlertDialogBaseProps } from './types';
export declare type AlertDialogUncontrolledBaseProps = AlertDialogBaseProps & HeadlessDisclosureUncontrolledOptions;
export declare type AlertDialogUncontrolledProps<T extends ValidConstructor = 'div'> = HeadlessProps<T, AlertDialogUncontrolledBaseProps>;
export declare function AlertDialogUncontrolled<T extends ValidConstructor = 'div'>(props: AlertDialogUncontrolledProps<T>): JSX.Element;
