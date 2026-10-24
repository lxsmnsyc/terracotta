import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { omit } from 'solid-js';
import type { SelectOptionStateRenderProps } from '../../states/create-select-option-state';
import {
  SelectOptionStateChild,
  useSelectOptionState,
} from '../../states/create-select-option-state';
import type { HeadlessProps } from '../../utils/dynamic-prop';
import {
  createActiveState,
  createDisabledState,
  createExpandedState,
  createSelectedState,
} from '../../utils/state-props';
import { useAccordionItemContext } from './AccordionItemContext';
import { ACCORDION_HEADER_TAG } from './tags';

export type AccordionHeaderProps<T extends ValidComponent = 'h3'> = HeadlessProps<
  T,
  SelectOptionStateRenderProps
>;

/**
 * The heading that wraps an `AccordionButton`. Needed so screen readers can
 * list the sections by their headings.
 *
 * Renders an `<h3>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/accordion.md}
 */
export function AccordionHeader<T extends ValidComponent = 'h3'>(
  props: AccordionHeaderProps<T>,
): JSX.Element {
  useAccordionItemContext('AccordionHeader');
  const state = useSelectOptionState();
  const rest = omit(props, 'as', 'children');
  const disabledState = createDisabledState(() => state.disabled());
  const selectedState = createSelectedState(() => state.isSelected());
  const expandedState = createExpandedState(() => state.isSelected());
  const activeState = createActiveState(() => state.isActive());
  const Root = dynamic(() => props.as || 'h3');
  return (
    <Root
      {...rest}
      {...ACCORDION_HEADER_TAG}
      {...disabledState}
      {...selectedState}
      {...expandedState}
      {...activeState}
    >
      <SelectOptionStateChild>{props.children}</SelectOptionStateChild>
    </Root>
  );
}
