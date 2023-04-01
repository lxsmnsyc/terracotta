import {
  createEffect,
  onCleanup,
  JSX,
  createComponent,
  mergeProps,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use/props';
import {
  createForwardRef,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  createDisabled,
  createExpanded,
} from '../../utils/state-props';
import { OmitAndMerge } from '../../utils/types';
import {
  Button,
  ButtonProps,
} from '../button';
import {
  usePopoverContext,
} from './PopoverContext';
import { POPOVER_BUTTON_TAG } from './tags';
import { DisclosureStateProvider, DisclosureStateRenderProps, useDisclosureState } from '../../states/create-disclosure-state';

export type PopoverButtonProps<T extends ValidConstructor = 'button'> =
  HeadlessPropsWithRef<T, OmitAndMerge<DisclosureStateRenderProps, ButtonProps<T>>>;

export function PopoverButton<T extends ValidConstructor = 'button'>(
  props: PopoverButtonProps<T>,
): JSX.Element {
  const context = usePopoverContext('PopoverButton');
  const state = useDisclosureState();

  const [internalRef, setInternalRef] = createForwardRef(props);

  createEffect(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      context.anchor = ref;

      const toggle = () => {
        if (!(state.disabled() || props.disabled)) {
          state.setState(!state.isOpen());
        }
      };

      ref.addEventListener('click', toggle);

      onCleanup(() => {
        ref.removeEventListener('click', toggle);
      });

      const onMouseEnter = () => {
        context.hovering = true;
      };
      const onMouseLeave = () => {
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
    createDisabled(() => {
      const internalDisabled = state.disabled();
      const granularDisabled = props.disabled;
      return internalDisabled || granularDisabled;
    }),
    createExpanded(() => state.isOpen()),
    {
      get children() {
        return createComponent(DisclosureStateProvider, {
          state,
          get children() {
            return props.children;
          },
        });
      },
    },
  ) as ButtonProps<T>);
}
