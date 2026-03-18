import type { JSX, ValidComponent } from 'solid-js';
import { merge } from 'solid-js';
import { omitProps } from 'solid-use/props';
import { useAutocompleteState } from '../../states/create-autocomplete-state';
import { useDisclosureState } from '../../states/create-disclosure-state';
import createDynamic from '../../utils/create-dynamic';
import type { DynamicProps, HeadlessProps } from '../../utils/dynamic-prop';
import {
  createDisabledState,
  createExpandedState,
  createHasActiveState,
  createHasQueryState,
  createHasSelectedState,
} from '../../utils/state-props';
import { useComboboxContext } from './ComboboxContext';
import { COMBOBOX_LABEL_TAG } from './tags';

export type ComboboxLabelProps<T extends ValidComponent = 'label'> =
  HeadlessProps<T>;

export function ComboboxLabel<T extends ValidComponent = 'label'>(
  props: ComboboxLabelProps<T>,
): JSX.Element {
  const context = useComboboxContext('ComboboxLabel');
  const autocompleteState = useAutocompleteState();
  const disclosureState = useDisclosureState();

  return createDynamic(
    () => props.as || ('label' as T),
    merge(
      COMBOBOX_LABEL_TAG,
      {
        id: context.labelID,
      },
      createDisabledState(() => autocompleteState.disabled()),
      createExpandedState(() => disclosureState.isOpen()),
      createHasSelectedState(() => autocompleteState.hasSelected()),
      createHasActiveState(() => autocompleteState.hasActive()),
      createHasQueryState(() => autocompleteState.hasQuery()),
      omitProps(props, ['as']),
    ) as DynamicProps<T>,
  );
}
