import type { ComponentProps, JSX, ValidComponent } from '@solidjs/web';
import { merge, omit } from 'solid-js';
import { useAutocompleteState } from '../../states/create-autocomplete-state';
import { useDisclosureState } from '../../states/create-disclosure-state';
import createDynamic from '../../utils/create-dynamic';
import type { HeadlessProps } from '../../utils/dynamic-prop';
import {
  createDisabledState,
  createExpandedState,
  createHasActiveState,
  createHasQueryState,
  createHasSelectedState,
} from '../../utils/state-props';
import { useComboboxContext } from './ComboboxContext';
import { COMBOBOX_LABEL_TAG } from './tags';

export type ComboboxLabelProps<T extends ValidComponent = 'label'> = HeadlessProps<T>;

/**
 * The accessible name of a `Combobox`, wired up through `aria-labelledby`.
 *
 * Renders a `<label>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/combobox.md}
 */
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
      omit(props, 'as'),
    ) as ComponentProps<T>,
  );
}
