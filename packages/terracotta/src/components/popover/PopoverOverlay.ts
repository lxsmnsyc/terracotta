import type { ComponentProps, JSX, ValidComponent } from '@solidjs/web';
import { createComponent, createEffect, merge, omit } from 'solid-js';
import type { DisclosureStateRenderProps } from '../../states/create-disclosure-state';
import {
  DisclosureStateChild,
  useDisclosureState,
} from '../../states/create-disclosure-state';
import createDynamic from '../../utils/create-dynamic';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import {
  createDisabledState,
  createExpandedState,
} from '../../utils/state-props';
import useEventListener from '../../utils/use-event-listener';
import { usePopoverContext } from './PopoverContext';
import { POPOVER_OVERLAY_TAG } from './tags';

export type PopoverOverlayProps<T extends ValidComponent = 'div'> =
  HeadlessPropsWithRef<T, DisclosureStateRenderProps>;

/**
 * The backdrop behind a `Popover`. Clicking it closes the popover, so give it
 * a size — it has no styles of its own. It is never unmounted, unlike the
 * panel, so hide it with CSS or a `<Show>` while closed, or it will swallow
 * clicks on the page.
 *
 * Renders a `<div>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/popover.md}
 */
export function PopoverOverlay<T extends ValidComponent = 'div'>(
  props: PopoverOverlayProps<T>,
): JSX.Element {
  usePopoverContext('PopoverOverlay');
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
      POPOVER_OVERLAY_TAG,
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
      omit(props, 'as', 'children', 'ref'),
    ) as ComponentProps<T>,
  );
}
