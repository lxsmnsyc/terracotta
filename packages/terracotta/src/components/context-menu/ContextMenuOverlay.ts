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
  createDisabledState,
  createExpandedState,
} from '../../utils/state-props';
import useEventListener from '../../utils/use-event-listener';
import { useContextMenuContext } from './ContextMenuContext';
import { CONTEXT_MENU_OVERLAY_TAG } from './tags';

export type ContextMenuOverlayProps<T extends ValidConstructor = 'div'> =
  HeadlessPropsWithRef<T, DisclosureStateRenderProps>;

export function ContextMenuOverlay<T extends ValidConstructor = 'div'>(
  props: ContextMenuOverlayProps<T>,
): JSX.Element {
  useContextMenuContext('ContextMenuOverlay');
  const state = useDisclosureState();

  const [internalRef, setInternalRef] = createForwardRef(props);

  createEffect(() => {
    const current = internalRef();
    if (current instanceof HTMLElement) {
      useEventListener(current, 'click', () => {
        state.close();
      });
    }
  });

  return createDynamic(
    () => props.as || ('div' as T),
    mergeProps(
      omitProps(props, ['as', 'children', 'ref']),
      CONTEXT_MENU_OVERLAY_TAG,
      {
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
  );
}
