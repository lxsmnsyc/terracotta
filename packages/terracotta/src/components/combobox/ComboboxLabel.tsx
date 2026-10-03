import { Dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { omit } from 'solid-js';
import { useAutocompleteState } from '../../states/create-autocomplete-state';
import { useDisclosureState } from '../../states/create-disclosure-state';
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

  const disabledState = createDisabledState(() => autocompleteState.disabled());
  const expandedState = createExpandedState(() => disclosureState.isOpen());
  const hasSelectedState = createHasSelectedState(() => autocompleteState.hasSelected());
  const hasActiveState = createHasActiveState(() => autocompleteState.hasActive());
  const hasQueryState = createHasQueryState(() => autocompleteState.hasQuery());
  const rest = omit(props, 'as');
  return (
    <Dynamic
      component={props.as || 'label'}
      {...COMBOBOX_LABEL_TAG}
      id={context.labelID}
      {...disabledState}
      {...expandedState}
      {...hasSelectedState}
      {...hasActiveState}
      {...hasQueryState}
      {...rest}
    />
  );
}
