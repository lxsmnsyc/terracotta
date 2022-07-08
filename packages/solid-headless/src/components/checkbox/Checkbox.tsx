import {
  JSX,
} from 'solid-js';
import {
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  CheckboxControlled,
  CheckboxControlledProps,
} from './CheckboxControlled';
import {
  CheckboxUncontrolled,
  CheckboxUncontrolledProps,
} from './CheckboxUncontrolled';

export type CheckboxProps<T extends ValidConstructor = 'div'> =
  | CheckboxControlledProps<T>
  | CheckboxUncontrolledProps<T>;

function isCheckboxUncontrolled<T extends ValidConstructor = 'div'>(
  props: CheckboxProps<T>,
): props is CheckboxUncontrolledProps<T> {
  return 'defaultChecked' in props;
}

export function Checkbox<T extends ValidConstructor = 'div'>(
  props: CheckboxProps<T>,
): JSX.Element {
  if (isCheckboxUncontrolled(props)) {
    return <CheckboxUncontrolled {...props} />;
  }
  return <CheckboxControlled {...props} />;
}
