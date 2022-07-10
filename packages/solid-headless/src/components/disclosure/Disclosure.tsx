import {
  JSX,
} from 'solid-js';
import {
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  DisclosureControlled,
  DisclosureControlledProps,
} from './DisclosureControlled';
import {
  DisclosureUncontrolled,
  DisclosureUncontrolledProps,
} from './DisclosureUncontrolled';

export type DisclosureProps<T extends ValidConstructor = 'div'> =
  | DisclosureControlledProps<T>
  | DisclosureUncontrolledProps<T>;

function isDisclosureUncontrolled<T extends ValidConstructor = 'div'>(
  props: DisclosureProps<T>,
): props is DisclosureUncontrolledProps<T> {
  return 'defaultOpen' in props;
}

export function Disclosure<T extends ValidConstructor = 'div'>(
  props: DisclosureProps<T>,
): JSX.Element {
  if (isDisclosureUncontrolled(props)) {
    return <DisclosureUncontrolled {...props} />;
  }
  return <DisclosureControlled {...props} />;
}
