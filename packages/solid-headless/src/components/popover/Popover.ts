import {
  createComponent,
  JSX,
} from 'solid-js';
import {
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  PopoverControlled,
  PopoverControlledProps,
} from './PopoverControlled';
import {
  PopoverUncontrolled,
  PopoverUncontrolledProps,
} from './PopoverUncontrolled';

export type PopoverProps<T extends ValidConstructor = 'div'> =
  | PopoverControlledProps<T>
  | PopoverUncontrolledProps<T>;

function isPopoverUncontrolled<T extends ValidConstructor = 'div'>(
  props: PopoverProps<T>,
): props is PopoverUncontrolledProps<T> {
  return 'defaultOpen' in props;
}

export function Popover<T extends ValidConstructor = 'div'>(
  props: PopoverProps<T>,
): JSX.Element {
  if (isPopoverUncontrolled(props)) {
    return createComponent(PopoverUncontrolled, props);
  }
  return createComponent(PopoverControlled, props);
}
