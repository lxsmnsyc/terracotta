import type { JSX } from 'solid-js';
import { createComponent, createUniqueId, mergeProps } from 'solid-js';
import { omitProps } from 'solid-use/props';
import type {
  SelectOptionStateOptions,
  SelectOptionStateRenderProps,
} from '../../states/create-select-option-state';
import {
  SelectOptionStateProvider,
  createSelectOptionState,
} from '../../states/create-select-option-state';
import createDynamic from '../../utils/create-dynamic';
import type {
  DynamicProps,
  HeadlessProps,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  createARIADisabledState,
  createActiveState,
  createDisabledState,
  createExpandedState,
  createSelectedState,
} from '../../utils/state-props';
import type { Prettify } from '../../utils/types';
import { useAccordionContext } from './AccordionContext';
import { AccordionItemContext } from './AccordionItemContext';
import { ACCORDION_ITEM_TAG } from './tags';

export type AccordionItemprops<V> = Prettify<
  SelectOptionStateOptions<V> & SelectOptionStateRenderProps
>;

export type AccordionItemProps<
  V,
  T extends ValidConstructor = 'div',
> = HeadlessProps<T, AccordionItemprops<V>>;

export function AccordionItem<V, T extends ValidConstructor = 'div'>(
  props: AccordionItemProps<V, T>,
): JSX.Element {
  useAccordionContext('AccordionItem');
  const buttonID = createUniqueId();
  const panelID = createUniqueId();
  const state = createSelectOptionState(props);

  return createComponent(AccordionItemContext.Provider, {
    value: { buttonID, panelID },
    get children() {
      return createDynamic(
        () => props.as || ('div' as T),
        mergeProps(
          omitProps(props, ['as', 'children', 'value', 'disabled']),
          ACCORDION_ITEM_TAG,
          createDisabledState(() => state.disabled()),
          createARIADisabledState(() => state.disabled()),
          createSelectedState(() => state.isSelected()),
          createExpandedState(() => state.isSelected()),
          createActiveState(() => state.isActive()),
          {
            get children() {
              return createComponent(SelectOptionStateProvider, {
                state,
                get children() {
                  return props.children;
                },
              });
            },
          },
        ) as DynamicProps<T>,
      );
    },
  });
}
