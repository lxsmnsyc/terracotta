import {
  createComponent,
  JSX,
} from 'solid-js';
import {
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  RadioGroupControlled,
  RadioGroupControlledProps,
} from './RadioGroupControlled';
import {
  RadioGroupUncontrolled,
  RadioGroupUncontrolledProps,
} from './RadioGroupUncontrolled';

export type RadioGroupProps<V, T extends ValidConstructor = 'div'> =
  | RadioGroupControlledProps<V, T>
  | RadioGroupUncontrolledProps<V, T>;

function isRadioGroupUncontrolled<V, T extends ValidConstructor = 'div'>(
  props: RadioGroupProps<V, T>,
): props is RadioGroupUncontrolledProps<V, T> {
  return 'defaultValue' in props;
}

export function RadioGroup<V, T extends ValidConstructor = 'div'>(
  props: RadioGroupProps<V, T>,
): JSX.Element {
  if (isRadioGroupUncontrolled(props)) {
    return createComponent(RadioGroupUncontrolled, props);
  }
  return createComponent(RadioGroupControlled, props);
}
