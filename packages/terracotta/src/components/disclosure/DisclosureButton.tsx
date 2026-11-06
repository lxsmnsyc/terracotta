import type { JSX, ValidComponent } from '@solidjs/web';
import { createEffect, omit } from 'solid-js';
import type { DisclosureStateRenderProps } from '../../states/create-disclosure-state';
import { DisclosureStateChild, useDisclosureState } from '../../states/create-disclosure-state';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
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
import { useDisclosureContext } from './DisclosureContext';
import { DISCLOSURE_BUTTON_TAG } from './tags';

export type DisclosureButtonProps<T extends ValidComponent = 'button'> = HeadlessPropsWithRef<
  T,
  OmitAndMerge<DisclosureStateRenderProps, ButtonProps<T>>
>;

/**
 * The control that toggles a `Disclosure`. Carries `aria-expanded`, and `aria-
 * controls` while the panel is mounted.
 *
 * Renders a `<button>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/disclosure.md}
 */
export function DisclosureButton<T extends ValidComponent = 'button'>(
  props: DisclosureButtonProps<T>,
): JSX.Element {
  const context = useDisclosureContext('DisclosureButton');
  const state = useDisclosureState();

  const [internalRef, setInternalRef] = createForwardRef(props);

  const isDisabled = (): boolean | undefined => state.disabled() || props.disabled;

  createEffect(internalRef, (current) => {
    if (current instanceof HTMLElement) {
      return useEventListener(current, 'click', () => {
        if (!isDisabled()) {
          state.toggle();
        }
      });
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
      {...DISCLOSURE_BUTTON_TAG}
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
