import type { JSX, ValidComponent } from '@solidjs/web';
import { createEffect, omit } from 'solid-js';
import type { DisclosureStateRenderProps } from '../../states/create-disclosure-state';
import { DisclosureStateChild, useDisclosureState } from '../../states/create-disclosure-state';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import { mergeFunc } from '../../utils/merge-func';
import {
  createARIADisabledState,
  createARIAExpandedState,
  createDisabledState,
  createExpandedState,
} from '../../utils/state-props';
import type { OmitAndMerge } from '../../utils/types';
import useEventListener from '../../utils/use-event-listener';
import type { ButtonProps } from '../button';
import { Button } from '../button';
import { usePopoverContext } from './PopoverContext';
import { POPOVER_BUTTON_TAG } from './tags';

export type PopoverButtonProps<T extends ValidComponent = 'button'> = HeadlessPropsWithRef<
  T,
  OmitAndMerge<DisclosureStateRenderProps, ButtonProps<T>>
>;

/**
 * The trigger of a `Popover`. Carries `aria-expanded`, and `aria-controls`
 * while the panel is mounted.
 *
 * Renders a `<button>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/popover.md}
 */
export function PopoverButton<T extends ValidComponent = 'button'>(
  props: PopoverButtonProps<T>,
): JSX.Element {
  const context = usePopoverContext('PopoverButton');
  const state = useDisclosureState();

  const [internalRef, setInternalRef] = createForwardRef(props);

  const isDisabled = (): boolean | undefined => state.disabled() || props.disabled;

  createEffect(internalRef, (current) => {
    if (current instanceof HTMLElement) {
      context.anchor = current;
      context.hovering = false;
      return mergeFunc(
        useEventListener(current, 'click', () => {
          if (!isDisabled()) {
            state.toggle();
          }
        }),
        useEventListener(current, 'mouseenter', () => {
          context.hovering = true;
        }),
        useEventListener(current, 'mouseleave', () => {
          context.hovering = false;
        }),
        () => {
          context.hovering = false;
        },
      );
    }
    return undefined;
  });

  const disabledState = createDisabledState(isDisabled);
  const ariaDisabledState = createARIADisabledState(isDisabled);
  const expandedState = createExpandedState(() => state.isOpen());
  const ariaExpandedState = createARIAExpandedState(() => state.isOpen());
  const rest = omit(props, 'children', 'ref') as ButtonProps<T>;
  return (
    <Button
      {...POPOVER_BUTTON_TAG}
      id={context.buttonID}
      ref={setInternalRef}
      aria-controls={state.isOpen() ? context.panelID : undefined}
      {...disabledState}
      {...ariaDisabledState}
      {...expandedState}
      {...ariaExpandedState}
      {...rest}
    >
      <DisclosureStateChild>{props.children}</DisclosureStateChild>
    </Button>
  );
}
