import type { JSX } from 'solid-js';
import {
  createEffect,
  onCleanup,
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
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      context.anchor = ref;

      const toggle = (): void => {
        if (!isDisabled()) {
          state.toggle();
        }
      };

      ref.addEventListener('click', toggle);

      onCleanup(() => {
        ref.removeEventListener('click', toggle);
      });

      const onMouseEnter = (): void => {
        context.hovering = true;
      };
      const onMouseLeave = (): void => {
        context.hovering = false;
      };

      ref.addEventListener('mouseenter', onMouseEnter);
      ref.addEventListener('mouseleave', onMouseLeave);
      onCleanup(() => {
        ref.removeEventListener('mouseenter', onMouseEnter);
        ref.removeEventListener('mouseleave', onMouseLeave);
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
