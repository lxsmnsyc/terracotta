import type { ComponentProps, JSX, ValidComponent } from '@solidjs/web';
import { createComponent, createEffect, merge, omit } from 'solid-js';
import type { DisclosureStateRenderProps } from '../../states/create-disclosure-state';
import { DisclosureStateChild, useDisclosureState } from '../../states/create-disclosure-state';
import { createDependencyList } from '../../utils/create-dependency-list';
import createDynamic from '../../utils/create-dynamic';
import type { UnmountableProps } from '../../utils/create-unmountable';
import { createUnmountable } from '../../utils/create-unmountable';
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

  return createUnmountable(
    props,
    () => state.isOpen(),
    () =>
      createDynamic(
        () => props.as || ('div' as T),
        merge(
          POPOVER_PANEL_TAG,
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
          omit(props, 'as', 'unmount', 'children', 'ref'),
        ) as ComponentProps<T>,
      ),
  );
}
