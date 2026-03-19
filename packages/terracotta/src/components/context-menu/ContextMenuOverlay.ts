import { createDynamic } from '@solidjs/web';
import type { ComponentProps, JSX, ValidComponent } from 'solid-js';
import { createComponent, createEffect, merge } from 'solid-js';
import { omitProps } from 'solid-use/props';
import type { DisclosureStateRenderProps } from '../../states/create-disclosure-state';
import {
  DisclosureStateChild,
  useDisclosureState,
} from '../../states/create-disclosure-state';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import {
  createDisabledState,
  createExpandedState,
} from '../../utils/state-props';
import useEventListener from '../../utils/use-event-listener';
import { useContextMenuContext } from './ContextMenuContext';
import { CONTEXT_MENU_OVERLAY_TAG } from './tags';

export type ContextMenuOverlayProps<T extends ValidComponent = 'div'> =
  HeadlessPropsWithRef<T, DisclosureStateRenderProps>;

export function ContextMenuOverlay<T extends ValidComponent = 'div'>(
  props: ContextMenuOverlayProps<T>,
): JSX.Element {
  useContextMenuContext('ContextMenuOverlay');
  const state = useDisclosureState();

  const [internalRef, setInternalRef] = createForwardRef(props);

  createEffect(internalRef, current => {
    if (current instanceof HTMLElement) {
      return useEventListener(current, 'click', () => {
        state.close();
      });
    }
    return undefined;
  });

  return createDynamic(
    () => props.as || ('div' as T),
    merge(
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
      omitProps(props, ['as', 'children', 'ref']),
    ) as ComponentProps<T>,
  );
}
