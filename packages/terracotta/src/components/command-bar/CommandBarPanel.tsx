import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { createEffect, omit } from 'solid-js';
import type { DisclosureStateRenderProps } from '../../states/create-disclosure-state';
import { DisclosureStateChild, useDisclosureState } from '../../states/create-disclosure-state';
import { createDependencyList } from '../../utils/create-dependency-list';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import { focusFirst, lockFocus } from '../../utils/focus-navigation';
import getFocusableElements from '../../utils/focus-query';
import { createDisabledState, createExpandedState } from '../../utils/state-props';
import useEventListener from '../../utils/use-event-listener';
import { afterTransition } from '../../utils/wait-for-transition';
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
          afterTransition(current, () => {
            focusFirst(getFocusableElements(current), false);
          });

          return useEventListener(current, 'keydown', (e) => {
            if (!props.disabled) {
              // Keys this panel acts on are not passed on: a `Dialog` or another panel
              // around this one traps `Tab` and closes on `Escape` too, and would
              // otherwise move focus a second time or close both layers at once.
              switch (e.key) {
                case 'Tab': {
                  e.preventDefault();
                  e.stopPropagation();
                  lockFocus(current, e.shiftKey, false);
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
          });
        }
      }
      return undefined;
    },
  );

  const disabledState = createDisabledState(() => state.disabled());
  const expandedState = createExpandedState(() => state.isOpen());
  const rest = omit(props, 'as', 'children', 'ref');
  const Root = dynamic(() => props.as || 'div');
  return (
    <Root
      {...COMMAND_BAR_PANEL_TAG}
      id={context.panelID}
      ref={setInternalRef}
      {...disabledState}
      {...expandedState}
      {...rest}
    >
      <DisclosureStateChild>{props.children}</DisclosureStateChild>
    </Root>
  );
}
