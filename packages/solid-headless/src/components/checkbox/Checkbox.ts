import {
  createComponent,
  JSX,
} from 'solid-js';
import {
  ValidConstructor,
} from '../../utils/dynamic-prop';
import Fragment from '../../utils/Fragment';
import {
  CheckboxControlled,
  CheckboxControlledProps,
} from './CheckboxControlled';
import {
  CheckboxUncontrolled,
  CheckboxUncontrolledProps,
} from './CheckboxUncontrolled';

export type CheckboxProps<T extends ValidConstructor = typeof Fragment> =
  | CheckboxControlledProps<T>
  | CheckboxUncontrolledProps<T>;

function isCheckboxUncontrolled<T extends ValidConstructor = typeof Fragment>(
  props: CheckboxProps<T>,
): props is CheckboxUncontrolledProps<T> {
  return 'defaultChecked' in props;
}

export function Checkbox<T extends ValidConstructor = typeof Fragment>(
  props: CheckboxProps<T>,
): JSX.Element {
  if (isCheckboxUncontrolled(props)) {
    return createComponent(CheckboxUncontrolled, props);
  }
  return createComponent(CheckboxControlled, props);
}
