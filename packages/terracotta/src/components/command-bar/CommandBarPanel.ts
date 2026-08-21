import type { ComponentProps, JSX, ValidComponent } from '@solidjs/web';
import { createComponent, createEffect, merge, omit } from 'solid-js';
import type { DisclosureStateRenderProps } from '../../states/create-disclosure-state';
import { DisclosureStateChild, useDisclosureState } from '../../states/create-disclosure-state';
import { createDependencyList } from '../../utils/create-dependency-list';
import createDynamic from '../../utils/create-dynamic';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import { focusFirst, lockFocus } from '../../utils/focus-navigation';
import getFocusableElements from '../../utils/focus-query';
import { createDisabledState, createExpandedState } from '../../utils/state-props';
import useEventListener from '../../utils/use-event-listener';
import { waitForTransition } from '../../utils/wait-for-transition';
import { useCommandBarContext } from './CommandBarContext';
import { COMMAND_BAR_PANEL_TAG } from './tags';

export type CommandBarPanelProps<T extends ValidComponent = 'div'> = HeadlessPropsWithRef<
  T,
  DisclosureStateRenderProps
>;

/**
 * The content of a `CommandBar`. Traps `Tab` while open and restores focus on
 * close.
 *
 * Renders a `<div>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/command-bar.md}
 */
export function CommandBarPanel<T extends ValidComponent = 'div'>(
  props: CommandBarPanelProps<T>,
): JSX.Element {
  const context = useCommandBarContext('CommandBarPanel');
  const state = useDisclosureState();

  const [internalRef, setInternalRef] = createForwardRef(props);

  createEffect(
    createDependencyList(() => [internalRef(), state.isOpen()] as const),
    ([current, isOpen]) => {
      if (current instanceof HTMLElement) {
        if (isOpen) {
          waitForTransition(current).then(() => {
            focusFirst(getFocusableElements(current), false);
          });

          return useEventListener(current, 'keydown', (e) => {
            if (!props.disabled) {
              switch (e.key) {
                case 'Tab': {
                  e.preventDefault();
                  lockFocus(current, e.shiftKey, false);
                  break;
                }
                case 'Escape': {
                  state.close();
                  break;
                }
                default:
                  break;
              }
            }
          });
        }
      }
      return undefined;
    },
  );

  return createDynamic(
    () => props.as || ('div' as T),
    merge(
      COMMAND_BAR_PANEL_TAG,
      {
        id: context.panelID,
        ref: setInternalRef,
        get children() {
          return createComponent(DisclosureStateChild, {
            get children() {
              return props.children;
            },
          });
        },
      },
      createDisabledState(() => state.disabled()),
      createExpandedState(() => state.isOpen()),
      omit(props, 'as', 'children', 'ref'),
    ) as ComponentProps<T>,
  );
}
