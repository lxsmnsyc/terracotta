import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { omit } from 'solid-js';
import type { SelectOptionStateRenderProps } from '../../states/create-select-option-state';
import {
  SelectOptionStateChild,
  useSelectOptionState,
} from '../../states/create-select-option-state';
import { Unmountable, type UnmountableProps } from '../../utils/unmountable';
import type { HeadlessProps } from '../../utils/dynamic-prop';
import {
  createActiveState,
  createDisabledState,
  createExpandedState,
  createSelectedState,
} from '../../utils/state-props';
import type { Prettify } from '../../utils/types';
import { useAccordionItemContext } from './AccordionItemContext';
import { ACCORDION_PANEL_TAG } from './tags';

export type AccordionPanelBaseProps = Prettify<SelectOptionStateRenderProps & UnmountableProps>;

export type AccordionPanelProps<T extends ValidComponent = 'div'> = HeadlessProps<
  T,
  AccordionPanelBaseProps
>;

/**
 * The content revealed when its `AccordionItem` is expanded. Unmounts while
 * collapsed unless `unmount={false}` is set.
 *
 * Renders a `<div>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/accordion.md}
 */
export function AccordionPanel<T extends ValidComponent = 'div'>(
  props: AccordionPanelProps<T>,
): JSX.Element {
  const context = useAccordionItemContext('AccordionPanel');
  const state = useSelectOptionState();

  // `unmount={false}` keeps the panel in the DOM. Otherwise it is only there
  // while expanded.
  context.registerPanel(() => props.unmount === false || state.isSelected());

  const rest = omit(props, 'as', 'children', 'unmount');
  const disabledState = createDisabledState(() => state.disabled());
  const selectedState = createSelectedState(() => state.isSelected());
  const expandedState = createExpandedState(() => state.isSelected());
  const activeState = createActiveState(() => state.isActive());
  const Root = dynamic(() => props.as || 'div');
  return (
    <Unmountable unmount={props.unmount} when={state.isSelected()}>
      <Root
        role="region"
        {...rest}
        {...ACCORDION_PANEL_TAG}
        id={context.panelID}
        aria-labelledby={context.buttonID}
        {...disabledState}
        {...selectedState}
        {...expandedState}
        {...activeState}
      >
        <SelectOptionStateChild>{props.children}</SelectOptionStateChild>
      </Root>
    </Unmountable>
  );
}
