import { Dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { createEffect, omit } from 'solid-js';
import type { DisclosureStateRenderProps } from '../../states/create-disclosure-state';
import { DisclosureStateChild, useDisclosureState } from '../../states/create-disclosure-state';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import { createDisabledState, createExpandedState } from '../../utils/state-props';
import useEventListener from '../../utils/use-event-listener';
import { usePopoverContext } from './PopoverContext';
import { POPOVER_OVERLAY_TAG } from './tags';

export type PopoverOverlayProps<T extends ValidComponent = 'div'> = HeadlessPropsWithRef<
  T,
  DisclosureStateRenderProps
>;

/**
 * The backdrop behind a `Popover`. Clicking it closes the popover, so give it
 * a size — it has no styles of its own. It is never unmounted, unlike the
 * panel, so hide it with CSS or a `<Show>` while closed, or it will swallow
 * clicks on the page.
 *
 * Renders a `<div>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/popover.md}
 */
export function PopoverOverlay<T extends ValidComponent = 'div'>(
  props: PopoverOverlayProps<T>,
): JSX.Element {
  usePopoverContext('PopoverOverlay');
  const state = useDisclosureState();

  const [internalRef, setInternalRef] = createForwardRef(props);

  createEffect(internalRef, (current) => {
    if (current instanceof HTMLElement) {
      return useEventListener(current, 'click', () => {
        state.close();
      });
    }
    return undefined;
  });

  const disabledState = createDisabledState(() => state.disabled());
  const expandedState = createExpandedState(() => state.isOpen());
  const rest = omit(props, 'as', 'children', 'ref');
  return (
    <Dynamic
      component={props.as || 'div'}
      {...POPOVER_OVERLAY_TAG}
      ref={setInternalRef}
      {...disabledState}
      {...expandedState}
      {...rest}
    >
      <DisclosureStateChild>{props.children}</DisclosureStateChild>
    </Dynamic>
  );
}
