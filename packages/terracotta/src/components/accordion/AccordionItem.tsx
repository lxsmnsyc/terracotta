import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { createSignal, createUniqueId, omit, onSettled } from 'solid-js';
import type {
  SelectOptionStateOptions,
  SelectOptionStateRenderProps,
} from '../../states/create-select-option-state';
import {
  createSelectOptionState,
  SelectOptionStateProvider,
} from '../../states/create-select-option-state';
import type { HeadlessProps } from '../../utils/dynamic-prop';
import {
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
  const [panels, setPanels] = createSignal<(() => boolean)[]>([]);

  const rest = omit(props, 'as', 'children', 'value', 'disabled');
  const disabledState = createDisabledState(() => state.disabled());
  const selectedState = createSelectedState(() => state.isSelected());
  const expandedState = createExpandedState(() => state.isSelected());
  const activeState = createActiveState(() => state.isActive());
  const Root = dynamic(() => props.as || 'div');
  return (
    <AccordionItemContext
      value={{
        buttonID,
        panelID,
        hasPanel(): boolean {
          return panels().some((present) => present());
        },
        registerPanel(present): void {
          onSettled(() => {
            setPanels((list) => [...list, present]);
            return () => {
              setPanels((list) => list.filter((item) => item !== present));
            };
          });
        },
      }}
    >
      <Root
        {...rest}
        {...ACCORDION_ITEM_TAG}
        {...disabledState}
        {...selectedState}
        {...expandedState}
        {...activeState}
      >
        <SelectOptionStateProvider state={state}>{props.children}</SelectOptionStateProvider>
      </Root>
    </AccordionItemContext>
  );
}
