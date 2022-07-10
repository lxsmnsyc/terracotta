import {
  JSX,
} from 'solid-js';
import {
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  DialogControlled,
  DialogControlledProps,
} from './DialogControlled';
import {
  DialogUncontrolled,
  DialogUncontrolledProps,
} from './DialogUncontrolled';

export type DialogProps<T extends ValidConstructor = 'div'> =
  | DialogControlledProps<T>
  | DialogUncontrolledProps<T>;

function isDialogUncontrolled<T extends ValidConstructor = 'div'>(
  props: DialogProps<T>,
): props is DialogUncontrolledProps<T> {
  return 'defaultOpen' in props;
}

export function Dialog<T extends ValidConstructor = 'div'>(
  props: DialogProps<T>,
): JSX.Element {
  if (isDialogUncontrolled(props)) {
    return <DialogUncontrolled {...props} />;
  }
  return <DialogControlled {...props} />;
}
