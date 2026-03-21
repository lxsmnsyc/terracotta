import { createDynamic } from '@solidjs/web';
import type { ComponentProps, JSX, ValidComponent } from 'solid-js';
import { createComponent, createEffect, merge, omit } from 'solid-js';
import type { DisclosureStateRenderProps } from '../../states/create-disclosure-state';
import {
  DisclosureStateChild,
  useDisclosureState,
} from '../../states/create-disclosure-state';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import {
  createARIADisabledState,
  createARIAExpandedState,
  createDisabledState,
  createExpandedState,
} from '../../utils/state-props';
import useEventListener from '../../utils/use-event-listener';
import { useContextMenuContext } from './ContextMenuContext';
import { CONTEXT_MENU_BOUNDARY_TAG } from './tags';

export type ContextMenuBoundaryProps<T extends ValidComponent = 'div'> =
  HeadlessPropsWithRef<T, DisclosureStateRenderProps>;

export function ContextMenuBoundary<T extends ValidComponent = 'div'>(
  props: ContextMenuBoundaryProps<T>,
): JSX.Element {
  const context = useContextMenuContext('ContextMenuBoundary');
  const state = useDisclosureState();

  const [internalRef, setInternalRef] = createForwardRef(props);

  createEffect(internalRef, current => {
    if (current instanceof HTMLElement) {
      context.anchor = current;
      return useEventListener(current, 'contextmenu', e => {
        if (!state.disabled()) {
          e.preventDefault();
          state.open();
        }
      });
    }
    return undefined;
  });

  return createDynamic(
    () => props.as || ('div' as T),
    merge(
      CONTEXT_MENU_BOUNDARY_TAG,
      {
        id: context.boundaryID,
        ref: setInternalRef,
        get 'aria-controls'() {
          return state.isOpen() && context.panelID;
        },
      },
      createDisabledState(() => state.disabled()),
      createARIADisabledState(() => state.disabled()),
      createExpandedState(() => state.isOpen()),
      createARIAExpandedState(() => state.isOpen()),
      omit(props, 'as', 'children', 'ref'),
      {
        get children() {
          return createComponent(DisclosureStateChild, {
            get children() {
              return props.children;
            },
          });
        },
      },
    ) as ComponentProps<T>,
  );
}
