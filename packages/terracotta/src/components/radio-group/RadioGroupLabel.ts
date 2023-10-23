import type { JSX } from 'solid-js';
import { mergeProps } from 'solid-js';
import {
  omitProps,
} from 'solid-use/props';
import createDynamic from '../../utils/create-dynamic';
import type {
  DynamicProps,
  HeadlessProps,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  useRadioGroupContext,
} from './RadioGroupContext';
import { RADIO_GROUP_LABEL_TAG } from './tags';
import { useSelectOptionState } from '../../states/create-select-option-state';
import { createActiveState, createCheckedState } from '../../utils/state-props';

export type RadioGroupLabelProps<T extends ValidConstructor = 'label'> =
  HeadlessProps<T>;

export function RadioGroupLabel<T extends ValidConstructor = 'label'>(
  props: RadioGroupLabelProps<T>,
): JSX.Element {
  const context = useRadioGroupContext('RadioGroupLabel');
  const state = useSelectOptionState();

  return createDynamic(
    () => props.as || ('label' as T),
    mergeProps(
      omitProps(props, ['as']),
      RADIO_GROUP_LABEL_TAG,
      {
        id: context.labelID,
      },
      createCheckedState(() => state.isSelected()),
      createActiveState(() => state.isActive()),
    ) as DynamicProps<T>,
  );
}
