import {
  createEffect,
  onCleanup,
  createComponent,
  mergeProps,
  JSX,
  createMemo,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use/props';
import {
  createToggleState,
  ToggleStateControlledOptions,
  ToggleStateProvider,
  ToggleStateProviderRenderProps,
  ToggleStateUncontrolledOptions,
} from '../../states/create-toggle-state';
import {
  createForwardRef,
  DynamicProps,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import { createDisabled } from '../../utils/state-props';
import { OmitAndMerge } from '../../utils/types';
import {
  Button,
  ButtonProps,
} from '../button';
import { createTag } from '../../utils/namespace';

const TOGGLE_TAG = createTag('toggle');

export type ToggleControlledBaseProps =
  ToggleStateControlledOptions
  & ToggleStateProviderRenderProps;

export type ToggleControlledProps<T extends ValidConstructor = 'button'> =
  HeadlessPropsWithRef<T, OmitAndMerge<ToggleControlledBaseProps, ButtonProps<T>>>;

export type ToggleUncontrolledBaseProps =
  ToggleStateUncontrolledOptions
  & ToggleStateProviderRenderProps;

export type ToggleUncontrolledProps<T extends ValidConstructor = 'button'> =
  HeadlessPropsWithRef<T, OmitAndMerge<ToggleUncontrolledBaseProps, ButtonProps<T>>>;

export type ToggleProps<T extends ValidConstructor = 'button'> =
  | ToggleControlledProps<T>
  | ToggleUncontrolledProps<T>;

function isToggleUncontrolled<T extends ValidConstructor = 'button'>(
  props: ToggleProps<T>,
): props is ToggleUncontrolledProps<T> {
  return 'defaultPressed' in props;
}

export function Toggle<T extends ValidConstructor = 'button'>(
  props: ToggleProps<T>,
): JSX.Element {
  // Needd to re-render if Toggle switches between controlled and uncontrolled states
  return createMemo(() => {
    const [ref, setRef] = createForwardRef(props);
    const state = createToggleState(props);

    createEffect(() => {
      const current = ref();
      if (current instanceof HTMLElement) {
        const onClick = () => {
          state.setState(!state.pressed);
        };

        current.addEventListener('click', onClick);
        onCleanup(() => {
          current.removeEventListener('click', onClick);
        });
      }
    });

    return createComponent(Button, mergeProps(
      isToggleUncontrolled(props)
        ? omitProps(props, [
          'onChange',
          'defaultPressed',
          'ref',
          'disabled',
          'children',
        ])
        : omitProps(props, [
          'onChange',
          'pressed',
          'ref',
          'disabled',
          'children',
        ]),
      TOGGLE_TAG,
      {
        ref: setRef,
        get 'aria-pressed'() {
          return props.pressed;
        },
        get 'data-sh-pressed'() {
          return props.pressed;
        },
        get children() {
          return createComponent(ToggleStateProvider, {
            state,
            get children() {
              return props.children;
            },
          });
        },
      },
      createDisabled(() => state.disabled()),
    ) as DynamicProps<T>);
  }) as unknown as JSX.Element;
}
