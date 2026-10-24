import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { createEffect, omit } from 'solid-js';
import type { DisclosureStateRenderProps } from '../../states/create-disclosure-state';
import { DisclosureStateChild, useDisclosureState } from '../../states/create-disclosure-state';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import { createDisabledState, createExpandedState } from '../../utils/state-props';
import useEventListener from '../../utils/use-event-listener';
import { useContextMenuContext } from './ContextMenuContext';
import { CONTEXT_MENU_BOUNDARY_TAG } from './tags';

export type ContextMenuBoundaryProps<T extends ValidComponent = 'div'> = HeadlessPropsWithRef<
  T,
  DisclosureStateRenderProps
>;

/**
 * The region that listens for right-clicks. Opening the menu suppresses the
 * browser's own context menu inside this element only.
 *
 * Renders a `<div>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/context-menu.md}
 */
export function ContextMenuBoundary<T extends ValidComponent = 'div'>(
  props: ContextMenuBoundaryProps<T>,
): JSX.Element {
  const context = useContextMenuContext('ContextMenuBoundary');
  const state = useDisclosureState();

  const [internalRef, setInternalRef] = createForwardRef(props);

  createEffect(internalRef, (current) => {
    if (current instanceof HTMLElement) {
      context.anchor = current;
      return useEventListener(current, 'contextmenu', (e) => {
        if (!state.disabled()) {
          e.preventDefault();
          state.open();
        }
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
      {...CONTEXT_MENU_BOUNDARY_TAG}
      id={context.boundaryID}
      ref={setInternalRef}
      aria-controls={state.isOpen() ? context.panelID : undefined}
      {...disabledState}
      {...expandedState}
      {...rest}
    >
      <DisclosureStateChild>{props.children}</DisclosureStateChild>
    </Root>
  );
}
