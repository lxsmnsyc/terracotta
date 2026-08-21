import type { JSX } from 'solid-js';
import { createComponent, createEffect, mergeProps } from 'solid-js';
import { omitProps } from 'solid-use/props';
import type { DisclosureStateRenderProps } from '../../states/create-disclosure-state';
import { DisclosureStateChild, useDisclosureState } from '../../states/create-disclosure-state';
import createDynamic from '../../utils/create-dynamic';
import type {
  DynamicProps,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import { createDisabledState, createExpandedState } from '../../utils/state-props';
import useEventListener from '../../utils/use-event-listener';
import { useAlertDialogContext } from './AlertDialogContext';
import { ALERT_DIALOG_OVERLAY_TAG } from './tags';

export type AlertDialogOverlayProps<T extends ValidConstructor = 'div'> = HeadlessPropsWithRef<
  T,
  DisclosureStateRenderProps
>;

/**
 * The backdrop behind an `AlertDialog`. Clicking it closes the dialog, so give
 * it a size — it has no styles of its own and renders 0x0 without them.
 *
 * A full-screen overlay is positioned, so it paints above an unpositioned
 * sibling: give `AlertDialogPanel` a `position` or a `z-index` of its own, or
 * the overlay covers it and swallows the clicks meant for it.
 *
 * Renders a `<div>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/alert-dialog.md}
 */
export function AlertDialogOverlay<T extends ValidConstructor = 'div'>(
  props: AlertDialogOverlayProps<T>,
): JSX.Element {
  useAlertDialogContext('AlertDialogOverlay');
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
    () => props.as ?? ('div' as T),
    mergeProps(
      omitProps(props, ['as', 'children', 'ref']),
      ALERT_DIALOG_OVERLAY_TAG,
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
