import type { JSX } from 'solid-js';
import { createComponent, createEffect, mergeProps } from 'solid-js';
import { omitProps } from 'solid-use/props';
import type { DisclosureStateRenderProps } from '../../states/create-disclosure-state';
import {
  DisclosureStateChild,
  useDisclosureState,
} from '../../states/create-disclosure-state';
import createDynamic from '../../utils/create-dynamic';
import type { UnmountableProps } from '../../utils/create-unmountable';
import { createUnmountable } from '../../utils/create-unmountable';
import type {
  DynamicProps,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import { focusFirst, lockFocus } from '../../utils/focus-navigation';
import getFocusableElements from '../../utils/focus-query';
import {
  createDisabledState,
  createExpandedState,
} from '../../utils/state-props';
import type { Prettify } from '../../utils/types';
import useEventListener from '../../utils/use-event-listener';
import { usePopoverContext } from './PopoverContext';
import { POPOVER_PANEL_TAG } from './tags';

export type PopoverPanelBaseProps = Prettify<
  DisclosureStateRenderProps & UnmountableProps
>;

export type PopoverPanelProps<T extends ValidConstructor = 'div'> =
  HeadlessPropsWithRef<T, PopoverPanelBaseProps>;

export function PopoverPanel<T extends ValidConstructor = 'div'>(
  props: PopoverPanelProps<T>,
): JSX.Element {
  const context = usePopoverContext('PopoverPanel');
  const state = useDisclosureState();

  const [internalRef, setInternalRef] = createForwardRef(props);

  createEffect(() => {
    const current = internalRef();
    if (current instanceof HTMLElement && state.isOpen()) {
      focusFirst(getFocusableElements(current), false);
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
      });
      useEventListener(current, 'focusout', e => {
        if (context.hovering) {
          return;
        }
        if (!(e.relatedTarget && current.contains(e.relatedTarget as Node))) {
          state.close();
        }
      });
    }
  });

  return createUnmountable(
    props,
    () => state.isOpen(),
    () =>
      createDynamic(
        () => props.as || ('div' as T),
        mergeProps(
          omitProps(props, ['as', 'unmount', 'children', 'ref']),
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
        ) as DynamicProps<T>,
      ),
  );
}
