import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { createEffect, omit } from 'solid-js';
import type { DisclosureStateRenderProps } from '../../states/create-disclosure-state';
import { DisclosureStateChild, useDisclosureState } from '../../states/create-disclosure-state';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import { mergeFunc } from '../../utils/merge-func';
import { createExpandedState } from '../../utils/state-props';
import type { Prettify } from '../../utils/types';
import { Unmountable, type UnmountableProps } from '../../utils/unmountable';
import useEventListener from '../../utils/use-event-listener';
import { useTooltipContext } from './TooltipContext';
import { TOOLTIP_PANEL_TAG } from './tags';

export type TooltipPanelBaseProps = Prettify<DisclosureStateRenderProps & UnmountableProps>;

export type TooltipPanelProps<T extends ValidComponent = 'div'> = HeadlessPropsWithRef<
  T,
  TooltipPanelBaseProps
>;

/**
 * The tooltip itself, with `role="tooltip"`. It never takes focus. The pointer
 * can move onto it without closing it, so its text can be read at any zoom.
 * Position it yourself. The library sets no coordinates.
 *
 * Renders a `<div>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/tooltip.md}
 */
export function TooltipPanel<T extends ValidComponent = 'div'>(
  props: TooltipPanelProps<T>,
): JSX.Element {
  const context = useTooltipContext('TooltipPanel');
  const state = useDisclosureState();

  const [internalRef, setInternalRef] = createForwardRef(props);

  createEffect(internalRef, (current) => {
    if (current instanceof HTMLElement) {
      return mergeFunc(
        useEventListener(current, 'pointerenter', () => {
          context.cancel();
        }),
        useEventListener(current, 'pointerleave', () => {
          context.scheduleClose();
        }),
      );
    }
    return undefined;
  });

  const expandedState = createExpandedState(() => state.isOpen());
  const rest = omit(props, 'as', 'unmount', 'children', 'ref');
  const Root = dynamic(() => props.as || 'div');
  return (
    <Unmountable unmount={props.unmount} when={state.isOpen()}>
      <Root
        {...TOOLTIP_PANEL_TAG}
        id={context.panelID}
        role="tooltip"
        ref={setInternalRef}
        {...expandedState}
        {...rest}
      >
        <DisclosureStateChild>{props.children}</DisclosureStateChild>
      </Root>
    </Unmountable>
  );
}
