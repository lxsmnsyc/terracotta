import type { JSX } from 'solid-js';
import {
  createEffect,
  createComponent,
  mergeProps,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use/props';
import type {
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  createForwardRef,
} from '../../utils/dynamic-prop';
import {
  createARIADisabledState,
  createARIAExpandedState,
  createDisabledState,
  createExpandedState,
} from '../../utils/state-props';
import type { OmitAndMerge } from '../../utils/types';
import type { ButtonProps } from '../button';
import {
  Button,
} from '../button';
import {
  usePopoverContext,
} from './PopoverContext';
import { POPOVER_BUTTON_TAG } from './tags';
import type { DisclosureStateRenderProps } from '../../states/create-disclosure-state';
import {
  DisclosureStateChild,
  useDisclosureState,
} from '../../states/create-disclosure-state';
import useEventListener from '../../utils/use-event-listener';

export type PopoverButtonProps<T extends ValidConstructor = 'button'> =
  HeadlessPropsWithRef<T, OmitAndMerge<DisclosureStateRenderProps, ButtonProps<T>>>;

export function PopoverButton<T extends ValidConstructor = 'button'>(
  props: PopoverButtonProps<T>,
): JSX.Element {
  const context = usePopoverContext('PopoverButton');
  const state = useDisclosureState();

  const [internalRef, setInternalRef] = createForwardRef(props);

  const isDisabled = (): boolean | undefined => state.disabled() || props.disabled;

  createEffect(() => {
    const current = internalRef();
    if (current instanceof HTMLElement) {
      context.anchor = current;
      useEventListener(current, 'click', () => {
        if (!isDisabled()) {
          state.toggle();
        }
      });
      useEventListener(current, 'mouseenter', () => {
        context.hovering = true;
      });
      useEventListener(current, 'mouseleave', () => {
        context.hovering = false;
      });
    }
  });

  return createComponent(Button, mergeProps(
    omitProps(props, [
      'children',
      'ref',
    ]),
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
    {
      get children() {
        return createComponent(DisclosureStateChild, {
          get children() {
            return props.children;
          },
        });
      },
    },
  ) as ButtonProps<T>);
}
