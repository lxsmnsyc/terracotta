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
import { focusFirst, lockFocus } from '../../utils/focus-navigation';
import getFocusableElements from '../../utils/focus-query';
import { createDisabledState, createExpandedState } from '../../utils/state-props';
import useEventListener from '../../utils/use-event-listener';
import { afterTransition } from '../../utils/wait-for-transition';
import { useDialogContext } from './DialogContext';
import { DIALOG_PANEL_TAG } from './tags';

export type DialogPanelProps<T extends ValidConstructor = 'div'> = HeadlessPropsWithRef<
  T,
  DisclosureStateRenderProps
>;

/**
 * The content of a `Dialog`, and the element that traps focus.
 *
 * Renders a `<div>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/dialog.md}
 */
export function DialogPanel<T extends ValidConstructor = 'div'>(
  props: DialogPanelProps<T>,
): JSX.Element {
  const context = useDialogContext('DialogPanel');
  const state = useDisclosureState();

  const [internalRef, setInternalRef] = createForwardRef(props);

  createEffect(() => {
    const current = internalRef();
    if (current instanceof HTMLElement && state.isOpen()) {
      afterTransition(current, () => {
        focusFirst(getFocusableElements(current), false);
      });
      useEventListener(current, 'keydown', (e) => {
        if (!props.disabled) {
          // Keys this panel acts on are not passed on: a `Dialog` or another panel
          // around this one traps `Tab` and closes on `Escape` too, and would
          // otherwise move focus a second time or close both layers at once.
          switch (e.key) {
            case 'Tab': {
              e.preventDefault();
              e.stopPropagation();
              lockFocus(current, e.shiftKey, false);
              break;
            }
            case 'Escape': {
              e.stopPropagation();
              state.close();
              break;
            }
            default:
              break;
          }
        }
      });
    }
  });

  return createDynamic(
    () => props.as ?? ('div' as T),
    mergeProps(
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
      omitProps(props, ['as', 'children', 'ref']),
    ) as DynamicProps<T>,
  );
}
