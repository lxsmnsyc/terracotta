import {
  createComponent,
  JSX,
} from 'solid-js';
import {
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  TabGroupControlled,
  TabGroupControlledProps,
} from './TabGroupControlled';
import {
  TabGroupUncontrolled,
  TabGroupUncontrolledProps,
} from './TabGroupUncontrolled';

export type TabGroupProps<V, T extends ValidConstructor = 'div'> =
  | TabGroupControlledProps<V, T>
  | TabGroupUncontrolledProps<V, T>;

function isTabGroupUncontrolled<V, T extends ValidConstructor = 'div'>(
  props: TabGroupProps<V, T>,
): props is TabGroupUncontrolledProps<V, T> {
  return 'defaultValue' in props;
}

export function TabGroup<V, T extends ValidConstructor = 'div'>(
  props: TabGroupProps<V, T>,
): JSX.Element {
  if (isTabGroupUncontrolled(props)) {
    return createComponent(TabGroupUncontrolled, props);
  }
  return createComponent(TabGroupControlled, props);
}
