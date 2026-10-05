import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { createEffect, omit } from 'solid-js';
import type { DisclosureStateRenderProps } from '../../states/create-disclosure-state';
import { DisclosureStateChild, useDisclosureState } from '../../states/create-disclosure-state';
import { createDependencyList } from '../../utils/create-dependency-list';
import { Unmountable, type UnmountableProps } from '../../utils/unmountable';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import { focusFirst, lockFocus } from '../../utils/focus-navigation';
import getFocusableElements from '../../utils/focus-query';
import { mergeFunc } from '../../utils/merge-func';
import { focusMenuItem, hasMenu, isMenuItemActivation } from '../../utils/menu-popup';
import { createDisabledState, createExpandedState } from '../../utils/state-props';
import type { Prettify } from '../../utils/types';
import useEventListener from '../../utils/use-event-listener';
import { afterTransition } from '../../utils/wait-for-transition';
import { useContextMenuContext } from './ContextMenuContext';
import { CONTEXT_MENU_PANEL_TAG } from './tags';

export type ContextMenuPanelBaseProps = Prettify<DisclosureStateRenderProps & UnmountableProps>;

export type ContextMenuPanelProps<T extends ValidComponent = 'div'> = HeadlessPropsWithRef<
  T,
  ContextMenuPanelBaseProps
>;

/**
 * The floating panel of a `ContextMenu`. Closes on <kbd>Escape</kbd>. When it
 * holds a `Menu`, <kbd>Tab</kbd> and activating an item also close it.
 * Otherwise it keeps <kbd>Tab</kbd> inside. Position it yourself. The library
 * sets no coordinates.
 *
 * Renders a `<div>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/context-menu.md}
 */
export function ContextMenuPanel<T extends ValidComponent = 'div'>(
  props: ContextMenuPanelProps<T>,
): JSX.Element {
  const context = useContextMenuContext('ContextMenuPanel');
  const state = useDisclosureState();

  const [internalRef, setInternalRef] = createForwardRef(props);

  createEffect(
    createDependencyList(() => [internalRef(), state.isOpen()] as const),
    ([current, isOpen]) => {
      if (current instanceof HTMLElement) {
        if (isOpen) {
          afterTransition(current, () => {
            if (!focusMenuItem(current) && !focusFirst(getFocusableElements(current), false)) {
              current.focus();
            }
          });

          return mergeFunc(
            useEventListener(current, 'keydown', (e) => {
              if (!props.disabled) {
                // Keys this panel acts on are not passed on: a `Dialog` or another panel
                // around this one traps `Tab` and closes on `Escape` too, and would
                // otherwise move focus a second time or close both layers at once.
                switch (e.key) {
                  case 'Tab': {
                    e.preventDefault();
                    e.stopPropagation();
                    // In a menu, Tab closes the menu. Focus then returns to where
                    // it was before the menu opened. Other panels keep Tab inside.
                    if (hasMenu(current)) {
                      state.close();
                    } else {
                      lockFocus(current, e.shiftKey, false);
                    }
                    break;
                  }
                  case 'Escape': {
                    e.stopPropagation();
                    state.close();
                    break;
                  }
                  default:
                    break;
                }
              }
            }),
            // Activating a menu item closes the menu. A disabled item never gets
            // here, since `Button` stops the click.
            useEventListener(current, 'click', (e) => {
              if (isMenuItemActivation(current, e.target)) {
                state.close();
              }
            }),
            useEventListener(document, 'click', (e) => {
              if (!current.contains(e.target as Node)) {
                state.close();
              }
            }),
          );
        }
      }
      return undefined;
    },
  );

  const disabledState = createDisabledState(() => state.disabled());
  const expandedState = createExpandedState(() => state.isOpen());
  const rest = omit(props, 'as', 'unmount', 'children', 'ref');
  const Root = dynamic(() => props.as || 'div');
  return (
    <Unmountable unmount={props.unmount} when={state.isOpen()}>
      <Root
        {...CONTEXT_MENU_PANEL_TAG}
        id={context.panelID}
        tabindex={-1}
        ref={setInternalRef}
        {...disabledState}
        {...expandedState}
        {...rest}
      >
        <DisclosureStateChild>{props.children}</DisclosureStateChild>
      </Root>
    </Unmountable>
  );
}
