import type { ComponentProps, JSX, ValidComponent } from '@solidjs/web';
import { createComponent, merge, omit } from 'solid-js';
import type { DisclosureStateRenderProps } from '../../states/create-disclosure-state';
import {
  DisclosureStateChild,
  useDisclosureState,
} from '../../states/create-disclosure-state';
import { useSelectState } from '../../states/create-select-state';
import createDynamic from '../../utils/create-dynamic';
import type { HeadlessProps } from '../../utils/dynamic-prop';
import {
  createDisabledState,
  createExpandedState,
  createHasActiveState,
  createHasSelectedState,
} from '../../utils/state-props';
import { useListboxContext } from './ListboxContext';
import { LISTBOX_LABEL_TAG } from './tags';

export type ListboxLabelProps<T extends ValidComponent = 'label'> =
  HeadlessProps<T, DisclosureStateRenderProps>;

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

  return createDynamic(
    () => props.as || ('label' as T),
    merge(
      LISTBOX_LABEL_TAG,
      {
        id: context.labelID,
        get children() {
          return createComponent(DisclosureStateChild, {
            get children() {
              return props.children;
            },
          });
        },
      },
      createDisabledState(() => disclosureState.disabled()),
      createExpandedState(() => disclosureState.isOpen()),
      createHasSelectedState(() => selectState.hasSelected()),
      createHasActiveState(() => selectState.hasActive()),
      omit(props, 'as', 'children'),
    ) as ComponentProps<T>,
  );
}
