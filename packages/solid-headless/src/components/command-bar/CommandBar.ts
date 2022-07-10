import {
  createComponent,
  JSX,
} from 'solid-js';
import {
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  CommandBarControlled,
  CommandBarControlledProps,
} from './CommandBarControlled';
import {
  CommandBarUncontrolled,
  CommandBarUncontrolledProps,
} from './CommandBarUncontrolled';

export type CommandBarProps<T extends ValidConstructor = 'div'> =
  | CommandBarControlledProps<T>
  | CommandBarUncontrolledProps<T>;

function isCommandBarUncontrolled<T extends ValidConstructor = 'div'>(
  props: CommandBarProps<T>,
): props is CommandBarUncontrolledProps<T> {
  return 'defaultOpen' in props;
}

export function CommandBar<T extends ValidConstructor = 'div'>(
  props: CommandBarProps<T>,
): JSX.Element {
  if (isCommandBarUncontrolled(props)) {
    return createComponent(CommandBarUncontrolled, props);
  }
  return createComponent(CommandBarControlled, props);
}
