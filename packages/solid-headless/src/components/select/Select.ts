import {
  createComponent,
  JSX,
} from 'solid-js';
import {
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  SelectMultipleControlled,
  SelectMultipleControlledProps,
} from './SelectMultipleControlled';
import {
  SelectMultipleUncontrolled,
  SelectMultipleUncontrolledProps,
} from './SelectMultipleUncontrolled';
import {
  SelectSingleControlled,
  SelectSingleControlledProps,
} from './SelectSingleControlled';
import {
  SelectSingleUncontrolled,
  SelectSingleUncontrolledProps,
} from './SelectSingleUncontrolled';

export type SelectProps<V, T extends ValidConstructor = 'ul'> =
  | SelectSingleControlledProps<V, T>
  | SelectSingleUncontrolledProps<V, T>
  | SelectMultipleControlledProps<V, T>
  | SelectMultipleUncontrolledProps<V, T>;

function isSelectUncontrolled<V, T extends ValidConstructor = 'ul'>(
  props: SelectProps<V, T>,
): props is SelectSingleUncontrolledProps<V, T> | SelectMultipleUncontrolledProps<V, T> {
  return 'defaultValue' in props;
}

function isSelectMultiple<V, T extends ValidConstructor = 'ul'>(
  props: SelectProps<V, T>,
): props is SelectMultipleUncontrolledProps<V, T> | SelectMultipleControlledProps<V, T> {
  return 'multiple' in props && props.multiple;
}

export function Select<V, T extends ValidConstructor = 'ul'>(
  props: SelectProps<V, T>,
): JSX.Element {
  if (isSelectUncontrolled(props)) {
    if (isSelectMultiple(props)) {
      return createComponent(SelectMultipleUncontrolled, props);
    }
    return createComponent(SelectSingleUncontrolled, props);
  }
  if (isSelectMultiple(props)) {
    return createComponent(SelectMultipleControlled, props);
  }
  return createComponent(SelectSingleControlled, props);
}
