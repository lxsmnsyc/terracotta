import { createDynamic } from '@solidjs/web';
import type { ComponentProps, JSX, ValidComponent } from 'solid-js';
import { createComponent, createEffect, merge, omit } from 'solid-js';
import type { DisclosureStateRenderProps } from '../../states/create-disclosure-state';
import {
  DisclosureStateChild,
  useDisclosureState,
} from '../../states/create-disclosure-state';
import { createDependencyList } from '../../utils/create-dependency-list';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import { focusFirst, lockFocus } from '../../utils/focus-navigation';
import getFocusableElements from '../../utils/focus-query';
import {
  createDisabledState,
  createExpandedState,
} from '../../utils/state-props';
import useEventListener from '../../utils/use-event-listener';
import { waitForTransition } from '../../utils/wait-for-transition';
import { useDialogContext } from './DialogContext';
import { DIALOG_PANEL_TAG } from './tags';

export type DialogPanelProps<T extends ValidComponent = 'div'> =
  HeadlessPropsWithRef<T, DisclosureStateRenderProps>;

export function DialogPanel<T extends ValidComponent = 'div'>(
  props: DialogPanelProps<T>,
): JSX.Element {
  const context = useDialogContext('DialogPanel');
  const state = useDisclosureState();

  const [internalRef, setInternalRef] = createForwardRef(props);

  createEffect(
    createDependencyList(() => [internalRef(), state.isOpen()] as const),
    ([current, isOpen]) => {
      if (current instanceof HTMLElement && isOpen) {
        waitForTransition(current).then(() => {
          focusFirst(getFocusableElements(current), false);
        });
        return useEventListener(current, 'keydown', e => {
          if (!props.disabled) {
            switch (e.key) {
              case 'Tab': {
                e.preventDefault();
                lockFocus(current, e.shiftKey, false);
                break;
              }
              case 'Escape': {
                state.close();
                break;
              }
              default:
                break;
            }
          }
        });
      }
      return undefined;
    },
  );

  return createDynamic(
    () => props.as || ('div' as T),
    merge(
      DIALOG_PANEL_TAG,
      {
        id: context.panelID,
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
