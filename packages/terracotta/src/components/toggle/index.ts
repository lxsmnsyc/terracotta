import type { JSX } from 'solid-js';
import { createComponent, createEffect, mergeProps } from 'solid-js';
import { omitProps } from 'solid-use/props';
import type {
  ToggleStateControlledOptions,
  ToggleStateRenderProps,
  ToggleStateUncontrolledOptions,
} from '../../states/create-toggle-state';
import {
  ToggleStateProvider,
  createToggleState,
} from '../../states/create-toggle-state';
import type {
  DynamicProps,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import { createTag } from '../../utils/namespace';
import {
  createARIADisabledState,
  createARIAPressedState,
  createDisabledState,
  createPressedState,
} from '../../utils/state-props';
import type { OmitAndMerge, Prettify } from '../../utils/types';
import useEventListener from '../../utils/use-event-listener';
import type { ButtonProps } from '../button';
import { Button } from '../button';

const TOGGLE_TAG = createTag('toggle');

export type ToggleControlledBaseProps = Prettify<
  ToggleStateControlledOptions & ToggleStateRenderProps
>;

export type ToggleControlledProps<T extends ValidConstructor = 'button'> =
  HeadlessPropsWithRef<
    T,
    OmitAndMerge<ToggleControlledBaseProps, ButtonProps<T>>
  >;

export type ToggleUncontrolledBaseProps = Prettify<
  ToggleStateUncontrolledOptions & ToggleStateRenderProps
>;

export type ToggleUncontrolledProps<T extends ValidConstructor = 'button'> =
  HeadlessPropsWithRef<
    T,
    OmitAndMerge<ToggleUncontrolledBaseProps, ButtonProps<T>>
  >;

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
  const [ref, setRef] = createForwardRef(props);
  const state = createToggleState(props);

  createEffect(() => {
    const current = ref();
    if (current instanceof HTMLElement) {
      useEventListener(current, 'click', () => {
        state.toggle();
      });
    }
  });

  return createComponent(
    Button,
    mergeProps(
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
        get children() {
          return createComponent(ToggleStateProvider, {
            state,
            get children() {
              return props.children;
            },
          });
        },
      },
      createPressedState(() => state.pressed()),
      createARIAPressedState(() => state.pressed()),
      createDisabledState(() => state.disabled()),
      createARIADisabledState(() => state.disabled()),
    ) as DynamicProps<T>,
  );
}
