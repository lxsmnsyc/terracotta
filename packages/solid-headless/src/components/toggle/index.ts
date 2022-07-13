import {
  createComponent,
  JSX,
} from 'solid-js';
import {
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  ToggleControlled,
  ToggleControlledProps,
} from './ToggleControlled';
import {
  ToggleUncontrolled,
  ToggleUncontrolledProps,
} from './ToggleUncontrolled';

export type ToggleProps<T extends ValidConstructor = 'button'> =
  | ToggleControlledProps<T>
  | ToggleUncontrolledProps<T>;

function isToggleUncontrolled<T extends ValidConstructor = 'button'>(
  props: ToggleProps<T>,
): props is ToggleUncontrolledProps<T> {
  return 'defaultPressed' in props;
}

export function Toggle<T extends ValidConstructor = 'button'>(
  props: ToggleProps<T>,
): JSX.Element {
  if (isToggleUncontrolled(props)) {
    return createComponent(ToggleUncontrolled, props);
  }
  return createComponent(ToggleControlled, props);
}
