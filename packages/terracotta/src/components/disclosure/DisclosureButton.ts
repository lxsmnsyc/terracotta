import {
  createEffect,
  onCleanup,
  JSX,
  mergeProps,
} from 'solid-js';
import {
  createComponent,
} from 'solid-js/web';
import {
  omitProps,
} from 'solid-use/props';
import {
  createForwardRef,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  createARIAExpandedState,
  createDisabledState,
  createExpandedState,
} from '../../utils/state-props';
import { OmitAndMerge } from '../../utils/types';
import {
  ButtonProps,
  Button,
} from '../button';
import {
  useDisclosureContext,
} from './DisclosureContext';
import { DISCLOSURE_BUTTON_TAG } from './tags';
import {
  DisclosureStateChild,
  DisclosureStateRenderProps,
  useDisclosureState,
} from '../../states/create-disclosure-state';

export type DisclosureButtonProps<T extends ValidConstructor = 'button'> =
  HeadlessPropsWithRef<T, OmitAndMerge<DisclosureStateRenderProps, ButtonProps<T>>>;

export function DisclosureButton<T extends ValidConstructor = 'button'>(
  props: DisclosureButtonProps<T>,
): JSX.Element {
  const context = useDisclosureContext('DisclosureButton');
  const state = useDisclosureState();

  const [internalRef, setInternalRef] = createForwardRef(props);

  createEffect(() => {
    const ref = internalRef();

    if (ref instanceof HTMLElement) {
      const toggle = () => {
        if (!(state.disabled() || props.disabled)) {
          state.toggle();
        }
      };

      ref.addEventListener('click', toggle);

      onCleanup(() => {
        ref.removeEventListener('click', toggle);
      });
    }
  });

  return createComponent(Button, mergeProps(
    omitProps(props, [
      'children',
      'ref',
    ]),
    DISCLOSURE_BUTTON_TAG,
    {
      id: context.buttonID,
      ref: setInternalRef,
      get 'aria-controls'() {
        return state.isOpen() && context.panelID;
      },
    },
    createDisabledState(() => state.disabled() || props.disabled),
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
