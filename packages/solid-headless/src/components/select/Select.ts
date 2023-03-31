import {
  createComponent,
  createMemo,
  JSX,
} from 'solid-js';
import {
  ValidConstructor,
} from '../../utils/dynamic-prop';
import { MultipleSelect, MultipleSelectProps } from './MultipleSelect';
import { SingleSelect, SingleSelectProps } from './SingleSelect';

export type SelectProps<V, T extends ValidConstructor = 'ul'> =
  | SingleSelectProps<V, T>
  | MultipleSelectProps<V, T>;

function isSelectMultiple<V, T extends ValidConstructor = 'ul'>(
  props: SelectProps<V, T>,
): props is MultipleSelectProps<V, T> {
  return 'multiple' in props && props.multiple;
}

export function Select<V, T extends ValidConstructor = 'ul'>(
  props: SelectProps<V, T>,
): JSX.Element {
  return createMemo(() => {
    if (isSelectMultiple(props)) {
      return createComponent(MultipleSelect, props);
    }
    return createComponent(SingleSelect, props);
  }) as unknown as JSX.Element;
}
