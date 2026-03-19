import type { JSX, ValidComponent } from 'solid-js';
import { createComponent, createEffect, merge } from 'solid-js';
import { omitProps } from 'solid-use/props';
import type { DisclosureStateRenderProps } from '../../states/create-disclosure-state';
import {
  DisclosureStateChild,
  useDisclosureState,
} from '../../states/create-disclosure-state';
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

export type PopoverButtonProps<T extends ValidComponent = 'button'> =
  HeadlessPropsWithRef<
    T,
    OmitAndMerge<DisclosureStateRenderProps, ButtonProps<T>>
  >;

export function PopoverButton<T extends ValidComponent = 'button'>(
  props: PopoverButtonProps<T>,
): JSX.Element {
  const context = usePopoverContext('PopoverButton');
  const state = useDisclosureState();

  const [internalRef, setInternalRef] = createForwardRef(props);

  const isDisabled = (): boolean | undefined =>
    state.disabled() || props.disabled;

  createEffect(internalRef, current => {
    if (current instanceof HTMLElement) {
      context.anchor = current;
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
      );
    }
    return undefined;
  });

  return createComponent(
    Button,
    merge(
      POPOVER_BUTTON_TAG,
      {
        id: context.buttonID,
        ref: setInternalRef,
        get 'aria-controls'() {
          return state.isOpen() && context.panelID;
        },
      },
      createDisabledState(isDisabled),
      createARIADisabledState(isDisabled),
      createExpandedState(() => state.isOpen()),
      createARIAExpandedState(() => state.isOpen()),
      omitProps(props, ['children', 'ref']),
      {
        get children() {
          return createComponent(DisclosureStateChild, {
            get children() {
              return props.children;
            },
          });
        },
      },
    ) as ButtonProps<T>,
  );
}
