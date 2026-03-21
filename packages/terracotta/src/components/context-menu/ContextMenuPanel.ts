import { createDynamic } from '@solidjs/web';
import type { ComponentProps, JSX, ValidComponent } from 'solid-js';
import { createComponent, createEffect, merge, omit } from 'solid-js';
import type { DisclosureStateRenderProps } from '../../states/create-disclosure-state';
import {
  DisclosureStateChild,
  useDisclosureState,
} from '../../states/create-disclosure-state';
import { createDependencyList } from '../../utils/create-dependency-list';
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
import { useContextMenuContext } from './ContextMenuContext';
import { CONTEXT_MENU_PANEL_TAG } from './tags';

export type ContextMenuPanelBaseProps = Prettify<
  DisclosureStateRenderProps & UnmountableProps
>;

export type ContextMenuPanelProps<T extends ValidComponent = 'div'> =
  HeadlessPropsWithRef<T, ContextMenuPanelBaseProps>;

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
          waitForTransition(current).then(() => {
            focusFirst(getFocusableElements(current), false);
          });

          return mergeFunc(
            useEventListener(current, 'keydown', e => {
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
            }),
            useEventListener(document, 'click', e => {
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

  return createUnmountable(
    props,
    () => state.isOpen(),
    () =>
      createDynamic(
        () => props.as || ('div' as T),
        merge(
          CONTEXT_MENU_PANEL_TAG,
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
