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
  createDisabledState,
  createExpandedState,
} from '../../utils/state-props';
import useEventListener from '../../utils/use-event-listener';
import { useDialogContext } from './DialogContext';
import { DIALOG_OVERLAY_TAG } from './tags';

export type DialogOverlayProps<T extends ValidComponent = 'div'> =
  HeadlessPropsWithRef<T, DisclosureStateRenderProps>;

export function DialogOverlay<T extends ValidComponent = 'div'>(
  props: DialogOverlayProps<T>,
): JSX.Element {
  useDialogContext('DialogOverlay');
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
