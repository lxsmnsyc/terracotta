import type { JSX } from 'solid-js';
import { createComponent, createEffect, mergeProps } from 'solid-js';
import { omitProps } from 'solid-use/props';
import type { DisclosureStateRenderProps } from '../../states/create-disclosure-state';
import {
  DisclosureStateChild,
  useDisclosureState,
} from '../../states/create-disclosure-state';
import createDynamic from '../../utils/create-dynamic';
import type {
  DynamicProps,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
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

export type ContextMenuBoundaryProps<T extends ValidConstructor = 'div'> =
  HeadlessPropsWithRef<T, DisclosureStateRenderProps>;

export function ContextMenuBoundary<T extends ValidConstructor = 'div'>(
  props: ContextMenuBoundaryProps<T>,
): JSX.Element {
  const context = useContextMenuContext('ContextMenuBoundary');
  const state = useDisclosureState();

  const [internalRef, setInternalRef] = createForwardRef(props);

  createEffect(() => {
    const current = internalRef();
    if (current instanceof HTMLElement) {
      context.anchor = current;
      useEventListener(current, 'contextmenu', e => {
        if (!state.disabled()) {
          e.preventDefault();
          state.open();
        }
      });
    }
  });

  return createDynamic(
    () => props.as || ('div' as T),
    mergeProps(
      omitProps(props, ['as', 'children', 'ref']),
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
      {
        get children() {
          return createComponent(DisclosureStateChild, {
            get children() {
              return props.children;
            },
          });
        },
      },
    ) as DynamicProps<T>,
  );
}
