import type { JSX, ValidComponent } from 'solid-js';
import { createComponent, createEffect, merge } from 'solid-js';
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
} from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import { focusFirst, lockFocus } from '../../utils/focus-navigation';
import getFocusableElements from '../../utils/focus-query';
import {
  createDisabledState,
  createExpandedState,
} from '../../utils/state-props';
import useEventListener from '../../utils/use-event-listener';
import { useAlertDialogContext } from './AlertDialogContext';
import { ALERT_DIALOG_PANEL_TAG } from './tags';

export type AlertDialogPanelProps<T extends ValidComponent = 'div'> =
  HeadlessPropsWithRef<T, DisclosureStateRenderProps>;

export function AlertDialogPanel<T extends ValidComponent = 'div'>(
  props: AlertDialogPanelProps<T>,
): JSX.Element {
  const context = useAlertDialogContext('AlertDialogPanel');
  const state = useDisclosureState();

  const [internalRef, setInternalRef] = createForwardRef(props);

  createEffect(
    () => [internalRef(), state.isOpen()] as const,
    ([current, isOpen]) => {
      if (current instanceof HTMLElement) {
        if (isOpen) {
          focusFirst(getFocusableElements(current), false);

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
      }
      return undefined;
    },
  );

  return createDynamic(
    () => props.as || ('div' as T),
    merge(
      omitProps(props, ['as', 'children', 'ref']),
      ALERT_DIALOG_PANEL_TAG,
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
    ) as DynamicProps<T>,
  );
}
