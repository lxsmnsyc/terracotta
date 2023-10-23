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
import { RADIO_GROUP_DESCRIPTION_TAG } from './tags';
import {
  createActiveState,
  createCheckedState,
} from '../../utils/state-props';
import { useSelectOptionState } from '../../states/create-select-option-state';

export type RadioGroupDescriptionProps<T extends ValidConstructor = 'div'> =
  HeadlessProps<T>;

export function RadioGroupDescription<T extends ValidConstructor = 'div'>(
  props: RadioGroupDescriptionProps<T>,
): JSX.Element {
  const context = useRadioGroupContext('RadioGroupDescription');
  const state = useSelectOptionState();

  return createDynamic(
    () => props.as || ('div' as T),
    mergeProps(
      omitProps(props, ['as']),
      RADIO_GROUP_DESCRIPTION_TAG,
      {
        id: context.descriptionID,
      },
      createCheckedState(() => state.isSelected()),
      createActiveState(() => state.isActive()),
    ) as DynamicProps<T>,
  );
}
