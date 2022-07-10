import {
  createComponent,
  JSX,
} from 'solid-js';
import {
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  AlertDialogControlled,
  AlertDialogControlledProps,
} from './AlertDialogControlled';
import {
  AlertDialogUncontrolled,
  AlertDialogUncontrolledProps,
} from './AlertDialogUncontrolled';

export type AlertDialogProps<T extends ValidConstructor = 'div'> =
  | AlertDialogControlledProps<T>
  | AlertDialogUncontrolledProps<T>;

function isAlertDialogUncontrolled<T extends ValidConstructor = 'div'>(
  props: AlertDialogProps<T>,
): props is AlertDialogUncontrolledProps<T> {
  return 'defaultOpen' in props;
}

export function AlertDialog<T extends ValidConstructor = 'div'>(
  props: AlertDialogProps<T>,
): JSX.Element {
  if (isAlertDialogUncontrolled(props)) {
    return createComponent(AlertDialogUncontrolled, props);
  }
  return createComponent(AlertDialogControlled, props);
}
