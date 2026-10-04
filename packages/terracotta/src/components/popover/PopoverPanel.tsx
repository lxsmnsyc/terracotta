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
import { createDisabledState, createExpandedState } from '../../utils/state-props';
import type { Prettify } from '../../utils/types';
import useEventListener from '../../utils/use-event-listener';
import { afterTransition } from '../../utils/wait-for-transition';
import { usePopoverContext } from './PopoverContext';
import { POPOVER_PANEL_TAG } from './tags';

export type PopoverPanelBaseProps = Prettify<DisclosureStateRenderProps & UnmountableProps>;

export type PopoverPanelProps<T extends ValidComponent = 'div'> = HeadlessPropsWithRef<
  T,
  PopoverPanelBaseProps
>;

/**
 * The floating panel of a `Popover`. Position it yourself — the library sets
 * no coordinates.
 *
 * Renders a `<div>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/popover.md}
 */
export function PopoverPanel<T extends ValidComponent = 'div'>(
  props: PopoverPanelProps<T>,
): JSX.Element {
  const context = usePopoverContext('PopoverPanel');
  const state = useDisclosureState();

  const [internalRef, setInternalRef] = createForwardRef(props);

  createEffect(
    createDependencyList(() => [internalRef(), state.isOpen()] as const),
    ([current, isOpen]) => {
      if (current instanceof HTMLElement && isOpen) {
        afterTransition(current, () => {
          focusFirst(getFocusableElements(current), false);
        });

        return mergeFunc(
          useEventListener(current, 'keydown', (e) => {
            if (!state.disabled()) {
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
              }
            }
          }),
          useEventListener(current, 'focusout', (e) => {
            if (context.hovering) {
              return;
            }
            if (
              (e.relatedTarget && !current.contains(e.relatedTarget as Node)) ||
              (e.target && !current.contains(e.target as Node))
            ) {
              state.close();
            }
          }),
        );
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
        {...POPOVER_PANEL_TAG}
        id={context.panelID}
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
