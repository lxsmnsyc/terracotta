import { JSX } from 'solid-js';
import { ValidConstructor } from '../../utils/dynamic-prop';
import { AlertDialogControlledProps } from './AlertDialogControlled';
import { AlertDialogUncontrolledProps } from './AlertDialogUncontrolled';
export declare type AlertDialogProps<T extends ValidConstructor = 'div'> = AlertDialogControlledProps<T> | AlertDialogUncontrolledProps<T>;
export declare function AlertDialog<T extends ValidConstructor = 'div'>(props: AlertDialogProps<T>): JSX.Element;
