import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { createEffect, omit } from 'solid-js';
import type { DisclosureStateRenderProps } from '../../states/create-disclosure-state';
import { DisclosureStateChild, useDisclosureState } from '../../states/create-disclosure-state';
import { createDependencyList } from '../../utils/create-dependency-list';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import { lockFocus } from '../../utils/focus-navigation';
import { mergeFunc } from '../../utils/merge-func';
import { createDisabledState, createExpandedState } from '../../utils/state-props';
import useEventListener from '../../utils/use-event-listener';
import { focusPanelAfterTransition } from '../../utils/modal';
import { useDialogContext } from './DialogContext';
import { DIALOG_PANEL_TAG } from './tags';

export type DialogPanelProps<T extends ValidComponent = 'div'> = HeadlessPropsWithRef<
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
        return mergeFunc(
          focusPanelAfterTransition(current),
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
          }),
        );
      }
      return undefined;
    },
  );

  const disabledState = createDisabledState(() => state.disabled());
  const expandedState = createExpandedState(() => state.isOpen());
  const rest = omit(props, 'as', 'children', 'ref');
  const Root = dynamic(() => props.as || 'div');
  return (
    <Root
      {...DIALOG_PANEL_TAG}
      id={context.panelID}
      ref={setInternalRef}
      {...disabledState}
      {...expandedState}
      {...rest}
    >
      <DisclosureStateChild>{props.children}</DisclosureStateChild>
    </Root>
  );
}
