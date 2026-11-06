import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { omit } from 'solid-js';
import type { DisclosureStateRenderProps } from '../../states/create-disclosure-state';
import { DisclosureStateChild, useDisclosureState } from '../../states/create-disclosure-state';
import { useSelectState } from '../../states/create-select-state';
import type { HeadlessProps } from '../../utils/dynamic-prop';
import {
  createDisabledState,
  createExpandedState,
  createHasActiveState,
  createHasSelectedState,
} from '../../utils/state-props';
import { useListboxContext } from './ListboxContext';
import { LISTBOX_LABEL_TAG } from './tags';

export type ListboxLabelProps<T extends ValidComponent = 'label'> = HeadlessProps<
  T,
  DisclosureStateRenderProps
>;

/**
 * The accessible name of a `Listbox`, wired up through `aria-labelledby`.
 *
 * Renders a `<label>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/listbox.md}
 */
export function ListboxLabel<T extends ValidComponent = 'label'>(
  props: ListboxLabelProps<T>,
): JSX.Element {
  const context = useListboxContext('ListboxLabel');
  const disclosureState = useDisclosureState();
  const selectState = useSelectState();

  // The button and the popup only point at the label while it is mounted.
  context.registerLabel();

  const disabledState = createDisabledState(() => disclosureState.disabled());
  const expandedState = createExpandedState(() => disclosureState.isOpen());
  const hasSelectedState = createHasSelectedState(() => selectState.hasSelected());
  const hasActiveState = createHasActiveState(() => selectState.hasActive());
  const rest = omit(props, 'as', 'children');
  const Root = dynamic(() => props.as || 'label');
  return (
    <Root
      {...LISTBOX_LABEL_TAG}
      id={context.labelID}
      {...disabledState}
      {...expandedState}
      {...hasSelectedState}
      {...hasActiveState}
      {...rest}
    >
      <DisclosureStateChild>{props.children}</DisclosureStateChild>
    </Root>
  );
}
