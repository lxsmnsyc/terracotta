import { createDynamic } from '@solidjs/web';
import type { ComponentProps, JSX, ValidComponent } from 'solid-js';
import { createComponent, createEffect, merge } from 'solid-js';
import { omitProps } from 'solid-use/props';
import type { DisclosureStateRenderProps } from '../../states/create-disclosure-state';
import {
  DisclosureStateChild,
  useDisclosureState,
} from '../../states/create-disclosure-state';
import type { UnmountableProps } from '../../utils/create-unmountable';
import { createUnmountable } from '../../utils/create-unmountable';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import { focusFirst, lockFocus } from '../../utils/focus-navigation';
import getFocusableElements from '../../utils/focus-query';
import { mergeFunc } from '../../utils/merge-func';
import {
  createDisabledState,
  createExpandedState,
} from '../../utils/state-props';
import type { Prettify } from '../../utils/types';
import useEventListener from '../../utils/use-event-listener';
import { waitForTransition } from '../../utils/wait-for-transition';
import { usePopoverContext } from './PopoverContext';
import { POPOVER_PANEL_TAG } from './tags';

export type PopoverPanelBaseProps = Prettify<
  DisclosureStateRenderProps & UnmountableProps
>;

export type PopoverPanelProps<T extends ValidComponent = 'div'> =
  HeadlessPropsWithRef<T, PopoverPanelBaseProps>;

export function PopoverPanel<T extends ValidComponent = 'div'>(
  props: PopoverPanelProps<T>,
): JSX.Element {
  const context = usePopoverContext('PopoverPanel');
  const state = useDisclosureState();

  const [internalRef, setInternalRef] = createForwardRef(props);

  createEffect(
    () => [internalRef(), state.isOpen()] as const,
    ([current, isOpen]) => {
      if (current instanceof HTMLElement && isOpen) {
        waitForTransition(current).then(() => {
          focusFirst(getFocusableElements(current), false);
        });

        return mergeFunc(
          useEventListener(current, 'keydown', e => {
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
          useEventListener(current, 'focusout', e => {
            if (context.hovering) {
              return;
            }
            if (
              !(e.relatedTarget && current.contains(e.relatedTarget as Node))
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
          omitProps(props, ['as', 'unmount', 'children', 'ref']),
        ) as ComponentProps<T>,
      ),
  );
}
