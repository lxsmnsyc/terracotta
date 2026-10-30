import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { createEffect, omit } from 'solid-js';
import type { DisclosureStateRenderProps } from '../../states/create-disclosure-state';
import { DisclosureStateChild, useDisclosureState } from '../../states/create-disclosure-state';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import { createDisabledState, createExpandedState } from '../../utils/state-props';
import useEventListener from '../../utils/use-event-listener';
import { useContextMenuContext } from './ContextMenuContext';
import { CONTEXT_MENU_OVERLAY_TAG } from './tags';

export type ContextMenuOverlayProps<T extends ValidComponent = 'div'> = HeadlessPropsWithRef<
  T,
  DisclosureStateRenderProps
>;

/**
 * The backdrop behind a `ContextMenu`. Clicking it closes the menu, so give it
 * a size — it has no styles of its own. It is never unmounted, unlike the
 * panel, so hide it with CSS or a `<Show>` while closed, or it will swallow
 * clicks on the page.
 *
 * Renders a `<div>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/context-menu.md}
 */
export function ContextMenuOverlay<T extends ValidComponent = 'div'>(
  props: ContextMenuOverlayProps<T>,
): JSX.Element {
  useContextMenuContext('ContextMenuOverlay');
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
  const Root = dynamic(() => props.as || 'div');
  return (
    <Root
      {...CONTEXT_MENU_OVERLAY_TAG}
      ref={setInternalRef}
      {...disabledState}
      {...expandedState}
      {...rest}
    >
      <DisclosureStateChild>{props.children}</DisclosureStateChild>
    </Root>
  );
}
