import {
  createComponent,
  JSX,
} from 'solid-js';
import {
  ValidConstructor,
} from '../../utils/dynamic-prop';
import Fragment from '../../utils/Fragment';
import {
  ListboxMCSCD,
  ListboxMCSCDProps,
} from './ListboxMCSCD';
import {
  ListboxMCSUD,
  ListboxMCSUDProps,
} from './ListboxMCSUD';
import {
  ListboxMUSCD,
  ListboxMUSCDProps,
} from './ListboxMUSCD';
import {
  ListboxMUSUD,
  ListboxMUSUDProps,
} from './ListboxMUSUD';
import {
  ListboxSCSCD,
  ListboxSCSCDProps,
} from './ListboxSCSCD';
import {
  ListboxSCSUD,
  ListboxSCSUDProps,
} from './ListboxSCSUD';
import {
  ListboxSUSCD,
  ListboxSUSCDProps,
} from './ListboxSUSCD';
import {
  ListboxSUSUD,
  ListboxSUSUDProps,
} from './ListboxSUSUD';

export type ListboxMultipleProps<V, T extends ValidConstructor = typeof Fragment> =
  | ListboxMCSCDProps<V, T>
  | ListboxMCSUDProps<V, T>
  | ListboxMUSCDProps<V, T>
  | ListboxMUSUDProps<V, T>;

export type ListboxSingleProps<V, T extends ValidConstructor = typeof Fragment> =
  | ListboxSCSCDProps<V, T>
  | ListboxSCSUDProps<V, T>
  | ListboxSUSCDProps<V, T>
  | ListboxSUSUDProps<V, T>;

type ListboxSelectUncontrolledProps<V, T extends ValidConstructor = typeof Fragment> =
  | ListboxMUSCDProps<V, T>
  | ListboxMUSUDProps<V, T>
  | ListboxSUSCDProps<V, T>
  | ListboxSUSUDProps<V, T>;

type ListboxDisclosureUncontrolledProps<V, T extends ValidConstructor = typeof Fragment> =
  | ListboxMCSUDProps<V, T>
  | ListboxMUSUDProps<V, T>
  | ListboxSCSUDProps<V, T>
  | ListboxSUSUDProps<V, T>;

export type ListboxProps<V, T extends ValidConstructor = typeof Fragment> =
  | ListboxMultipleProps<V, T>
  | ListboxSingleProps<V, T>;

function isListboxMultiple<V, T extends ValidConstructor = typeof Fragment>(
  props: ListboxProps<V, T>,
): props is ListboxMultipleProps<V, T> {
  return 'multiple' in props && props.multiple;
}

function isListboxSelectUncontrolled<V, T extends ValidConstructor = typeof Fragment>(
  props: ListboxProps<V, T>,
): props is ListboxSelectUncontrolledProps<V, T> {
  return 'defaultValue' in props;
}

function isListboxDisclosureUncontrolled<V, T extends ValidConstructor = typeof Fragment>(
  props: ListboxProps<V, T>,
): props is ListboxDisclosureUncontrolledProps<V, T> {
  return 'defaultOpen' in props;
}

export function Listbox<V, T extends ValidConstructor = typeof Fragment>(
  props: ListboxProps<V, T>,
): JSX.Element {
  if (isListboxMultiple(props)) {
    if (isListboxSelectUncontrolled(props)) {
      if (isListboxDisclosureUncontrolled(props)) {
        return createComponent(ListboxMUSUD, props);
      }
      return createComponent(ListboxMUSCD, props);
    }
    if (isListboxDisclosureUncontrolled(props)) {
      return createComponent(ListboxMCSUD, props);
    }
    return createComponent(ListboxMCSCD, props);
  }
  if (isListboxSelectUncontrolled(props)) {
    if (isListboxDisclosureUncontrolled(props)) {
      return createComponent(ListboxSUSUD, props);
    }
    return createComponent(ListboxSUSCD, props);
  }
  if (isListboxDisclosureUncontrolled(props)) {
    return createComponent(ListboxSCSUD, props);
  }
  return createComponent(ListboxSCSCD, props);
}
