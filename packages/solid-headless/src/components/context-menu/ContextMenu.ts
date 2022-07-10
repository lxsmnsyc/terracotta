import {
  createComponent,
  JSX,
} from 'solid-js';
import {
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  ContextMenuControlled,
  ContextMenuControlledProps,
} from './ContextMenuControlled';
import {
  ContextMenuUncontrolled,
  ContextMenuUncontrolledProps,
} from './ContextMenuUncontrolled';

export type ContextMenuProps<T extends ValidConstructor = 'div'> =
  | ContextMenuControlledProps<T>
  | ContextMenuUncontrolledProps<T>;

function isContextMenuUncontrolled<T extends ValidConstructor = 'div'>(
  props: ContextMenuProps<T>,
): props is ContextMenuUncontrolledProps<T> {
  return 'defaultOpen' in props;
}

export function ContextMenu<T extends ValidConstructor = 'div'>(
  props: ContextMenuProps<T>,
): JSX.Element {
  if (isContextMenuUncontrolled(props)) {
    return createComponent(ContextMenuUncontrolled, props);
  }
  return createComponent(ContextMenuControlled, props);
}
