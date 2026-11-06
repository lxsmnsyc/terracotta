import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { createEffect, omit } from 'solid-js';
import type { DisclosureStateRenderProps } from '../../states/create-disclosure-state';
import { DisclosureStateChild, useDisclosureState } from '../../states/create-disclosure-state';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import { mergeFunc } from '../../utils/merge-func';
import { createExpandedState } from '../../utils/state-props';
import useEventListener from '../../utils/use-event-listener';
import { useTooltipContext } from './TooltipContext';
import { TOOLTIP_TRIGGER_TAG } from './tags';

export type TooltipTriggerProps<T extends ValidComponent = 'button'> = HeadlessPropsWithRef<
  T,
  DisclosureStateRenderProps
>;

/**
 * The control the tooltip describes. Hovering it opens the tooltip after the
 * open delay, and focusing it opens the tooltip at once. While the tooltip is
 * open, the trigger points `aria-describedby` at it.
 *
 * Renders a `<button>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/tooltip.md}
 */
export function TooltipTrigger<T extends ValidComponent = 'button'>(
  props: TooltipTriggerProps<T>,
): JSX.Element {
  const context = useTooltipContext('TooltipTrigger');
  const state = useDisclosureState();

  const [internalRef, setInternalRef] = createForwardRef(props);

  createEffect(internalRef, (current) => {
    if (current instanceof HTMLElement) {
      return mergeFunc(
        useEventListener(current, 'pointerenter', () => {
          if (!state.disabled()) {
            context.scheduleOpen();
          }
        }),
        useEventListener(current, 'pointerleave', () => {
          context.scheduleClose();
        }),
        useEventListener(current, 'focus', () => {
          if (!state.disabled()) {
            context.openNow();
          }
        }),
        useEventListener(current, 'blur', () => {
          context.closeNow();
        }),
      );
    }
    return undefined;
  });

  const expandedState = createExpandedState(() => state.isOpen());
  const rest = omit(props, 'as', 'children', 'ref');
  const Root = dynamic(() => props.as || 'button');
  return (
    <Root
      {...TOOLTIP_TRIGGER_TAG}
      id={context.triggerID}
      aria-describedby={state.isOpen() ? context.panelID : undefined}
      ref={setInternalRef}
      {...expandedState}
      {...rest}
    >
      <DisclosureStateChild>{props.children}</DisclosureStateChild>
    </Root>
  );
}
