import type { ComponentProps, JSX, ValidComponent } from '@solidjs/web';
import { createComponent, createUniqueId, merge, omit } from 'solid-js';
import type {
  SelectOptionStateOptions,
  SelectOptionStateRenderProps,
} from '../../states/create-select-option-state';
import {
  createSelectOptionState,
  SelectOptionStateProvider,
} from '../../states/create-select-option-state';
import createDynamic from '../../utils/create-dynamic';
import type { HeadlessProps } from '../../utils/dynamic-prop';
import {
  createActiveState,
  createARIADisabledState,
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

export type AccordionItemProps<V, T extends ValidComponent = 'div'> = HeadlessProps<
  T,
  AccordionItemprops<V>
>;

/**
 * One section of an `Accordion`. The required `value` prop is the id this
 * section is selected by.
 *
 * Renders a `<div>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/accordion.md}
 */
export function AccordionItem<V, T extends ValidComponent = 'div'>(
  props: AccordionItemProps<V, T>,
): JSX.Element {
  useAccordionContext('AccordionItem');
  const buttonID = createUniqueId();
  const panelID = createUniqueId();
  const state = createSelectOptionState(props);

  return createComponent(AccordionItemContext, {
    value: { buttonID, panelID },
    get children() {
      return createDynamic(
        () => props.as || ('div' as T),
        merge(
          omit(props, 'as', 'children', 'value', 'disabled'),
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
        ) as ComponentProps<T>,
      );
    },
  });
}
