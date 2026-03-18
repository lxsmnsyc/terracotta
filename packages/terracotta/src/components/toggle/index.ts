import type { JSX, ValidComponent } from 'solid-js';
import { createComponent, createEffect, merge } from 'solid-js';
import { omitProps } from 'solid-use/props';
import type {
  ToggleStateControlledOptions,
  ToggleStateRenderProps,
  ToggleStateUncontrolledOptions,
} from '../../states/create-toggle-state';
import {
  createToggleState,
  ToggleStateProvider,
} from '../../states/create-toggle-state';
import type {
  DynamicProps,
  HeadlessPropsWithRef,
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

export type ToggleControlledProps<T extends ValidComponent = 'button'> =
  HeadlessPropsWithRef<
    T,
    OmitAndMerge<ToggleControlledBaseProps, ButtonProps<T>>
  >;

export type ToggleUncontrolledBaseProps = Prettify<
  ToggleStateUncontrolledOptions & ToggleStateRenderProps
>;

export type ToggleUncontrolledProps<T extends ValidComponent = 'button'> =
  HeadlessPropsWithRef<
    T,
    OmitAndMerge<ToggleUncontrolledBaseProps, ButtonProps<T>>
  >;

export type ToggleProps<T extends ValidComponent = 'button'> =
  | ToggleControlledProps<T>
  | ToggleUncontrolledProps<T>;

function isToggleUncontrolled<T extends ValidComponent = 'button'>(
  props: ToggleProps<T>,
): props is ToggleUncontrolledProps<T> {
  return 'defaultPressed' in props;
}

export function Toggle<T extends ValidComponent = 'button'>(
  props: ToggleProps<T>,
): JSX.Element {
  const [ref, setRef] = createForwardRef(props);
  const state = createToggleState(props);

  createEffect(ref, current => {
    if (current instanceof HTMLElement) {
      return useEventListener(current, 'click', () => {
        state.toggle();
      });
    }
    return undefined;
  });

  return createComponent(
    Button,
    merge(
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
    ) as DynamicProps<T>,
  );
}
