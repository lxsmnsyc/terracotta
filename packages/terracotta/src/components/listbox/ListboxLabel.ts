import { createDynamic } from '@solidjs/web';
import type { ComponentProps, JSX, ValidComponent } from 'solid-js';
import { createComponent, merge } from 'solid-js';
import { omitProps } from 'solid-use/props';
import type { DisclosureStateRenderProps } from '../../states/create-disclosure-state';
import {
  DisclosureStateChild,
  useDisclosureState,
} from '../../states/create-disclosure-state';
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

export type ListboxLabelProps<T extends ValidComponent = 'label'> =
  HeadlessProps<T, DisclosureStateRenderProps>;

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
      omitProps(props, ['as', 'children']),
    ) as ComponentProps<T>,
  );
}
