import type { ComponentProps, JSX, ValidComponent } from '@solidjs/web';
import { createComponent, merge, omit } from 'solid-js';
import type { DisclosureStateRenderProps } from '../../states/create-disclosure-state';
import { DisclosureStateChild, useDisclosureState } from '../../states/create-disclosure-state';
import createDynamic from '../../utils/create-dynamic';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createDisabledState, createExpandedState } from '../../utils/state-props';
import { useAlertDialogContext } from './AlertDialogContext';
import { ALERT_DIALOG_TITLE_TAG } from './tags';

export type AlertDialogTitleProps<T extends ValidComponent = 'h2'> = HeadlessPropsWithRef<
  T,
  DisclosureStateRenderProps
>;

/**
 * The accessible name of an `AlertDialog`, wired up through `aria-labelledby`.
 *
 * Renders an `<h2>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/alert-dialog.md}
 */
export function AlertDialogTitle<T extends ValidComponent = 'h2'>(
  props: AlertDialogTitleProps<T>,
): JSX.Element {
  const context = useAlertDialogContext('AlertDialogTitle');
  const state = useDisclosureState();

  return createDynamic(
    () => props.as || ('h2' as T),
    merge(
      omit(props, 'as', 'children'),
      ALERT_DIALOG_TITLE_TAG,
      {
        id: context.titleID,
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
    ) as ComponentProps<T>,
  );
}
