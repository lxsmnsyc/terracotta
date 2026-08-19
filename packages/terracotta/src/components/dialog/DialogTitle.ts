import type { ComponentProps, JSX, ValidComponent } from '@solidjs/web';
import { createComponent, merge, omit } from 'solid-js';
import type { DisclosureStateRenderProps } from '../../states/create-disclosure-state';
import {
  DisclosureStateChild,
  useDisclosureState,
} from '../../states/create-disclosure-state';
import createDynamic from '../../utils/create-dynamic';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import {
  createDisabledState,
  createExpandedState,
} from '../../utils/state-props';
import { useDialogContext } from './DialogContext';
import { DIALOG_TITLE_TAG } from './tags';

export type DialogTitleProps<T extends ValidComponent = 'h2'> =
  HeadlessPropsWithRef<T, DisclosureStateRenderProps>;

/**
 * The accessible name of a `Dialog`, wired up through `aria-labelledby`.
 *
 * Renders an `<h2>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/dialog.md}
 */
export function DialogTitle<T extends ValidComponent = 'h2'>(
  props: DialogTitleProps<T>,
): JSX.Element {
  const context = useDialogContext('DialogTitle');
  const state = useDisclosureState();
  return createDynamic(
    () => props.as || ('h2' as T),
    merge(
      DIALOG_TITLE_TAG,
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
      omit(props, 'as', 'children'),
    ) as ComponentProps<T>,
  );
}
