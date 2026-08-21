import type { ComponentProps, JSX, ValidComponent } from '@solidjs/web';
import { createComponent, createEffect, merge, omit } from 'solid-js';
import type { DisclosureStateRenderProps } from '../../states/create-disclosure-state';
import { DisclosureStateChild, useDisclosureState } from '../../states/create-disclosure-state';
import createDynamic from '../../utils/create-dynamic';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import { createDisabledState, createExpandedState } from '../../utils/state-props';
import useEventListener from '../../utils/use-event-listener';
import { useDialogContext } from './DialogContext';
import { DIALOG_OVERLAY_TAG } from './tags';

export type DialogOverlayProps<T extends ValidComponent = 'div'> = HeadlessPropsWithRef<
  T,
  DisclosureStateRenderProps
>;

/**
 * The backdrop behind a `Dialog`. Clicking it closes the dialog, so give it a
 * size — it has no styles of its own and renders 0x0 without them. It needs no
 * `<Show>` guard: `Dialog` unmounts its whole subtree while closed.
 *
 * A full-screen overlay is positioned, so it paints above an unpositioned
 * sibling: give `DialogPanel` a `position` or a `z-index` of its own, or the
 * overlay covers it and swallows the clicks meant for it.
 *
 * Renders a `<div>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/dialog.md}
 */
export function DialogOverlay<T extends ValidComponent = 'div'>(
  props: DialogOverlayProps<T>,
): JSX.Element {
  useDialogContext('DialogOverlay');
  const state = useDisclosureState();

  const [internalRef, setInternalRef] = createForwardRef(props);

  createEffect(internalRef, (current) => {
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
      DIALOG_OVERLAY_TAG,
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
