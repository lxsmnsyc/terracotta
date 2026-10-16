import type { JSX, ValidComponent } from '@solidjs/web';
import { createEffect, omit } from 'solid-js';
import type { CheckStateRenderProps } from '../../states/create-check-state';
import { CheckStateProvider, createCheckState } from '../../states/create-check-state';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import { createTag } from '../../utils/namespace';
import {
  createARIADisabledState,
  createCheckedState,
  createDisabledState,
} from '../../utils/state-props';
import type { OmitAndMerge, Prettify } from '../../utils/types';
import useEventListener from '../../utils/use-event-listener';
import type { ButtonProps } from '../button';
import { Button } from '../button';

const SWITCH_TAG = createTag('switch');

interface SwitchBaseOptions {
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}

export interface SwitchControlledOptions extends SwitchBaseOptions {
  checked: boolean;
}

export interface SwitchUncontrolledOptions extends SwitchBaseOptions {
  defaultChecked: boolean;
}

export type SwitchControlledProps<T extends ValidComponent = 'button'> = HeadlessPropsWithRef<
  T,
  OmitAndMerge<Prettify<SwitchControlledOptions & CheckStateRenderProps>, ButtonProps<T>>
>;

export type SwitchUncontrolledProps<T extends ValidComponent = 'button'> = HeadlessPropsWithRef<
  T,
  OmitAndMerge<Prettify<SwitchUncontrolledOptions & CheckStateRenderProps>, ButtonProps<T>>
>;

export type SwitchProps<T extends ValidComponent = 'button'> =
  | SwitchControlledProps<T>
  | SwitchUncontrolledProps<T>;

function isSwitchUncontrolled<T extends ValidComponent = 'button'>(
  props: SwitchProps<T>,
): props is SwitchUncontrolledProps<T> {
  return 'defaultChecked' in props;
}

/**
 * An on/off control, following the ARIA switch pattern. It carries
 * `role="switch"` and `aria-checked`, which is always `"true"` or `"false"`.
 * <kbd>Space</kbd> and <kbd>Enter</kbd> flip it.
 *
 * Use it for a setting that takes effect at once, such as aeroplane mode. Its
 * content is its label, or name it with `aria-labelledby`.
 *
 * Renders a `<button>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/switch.md}
 */
export function Switch<T extends ValidComponent = 'button'>(props: SwitchProps<T>): JSX.Element {
  const [ref, setRef] = createForwardRef(props);
  const state = createCheckState({
    get checked() {
      return isSwitchUncontrolled(props) ? undefined : props.checked;
    },
    get disabled() {
      return props.disabled;
    },
    onChange(value) {
      props.onChange?.(!!value);
    },
    ...(isSwitchUncontrolled(props) ? { defaultChecked: props.defaultChecked } : {}),
  });

  createEffect(ref, (current) => {
    if (current instanceof HTMLElement) {
      return useEventListener(current, 'click', () => {
        state.toggle();
      });
    }
    return undefined;
  });

  // A switch has no mixed state, so an unset value reads as off.
  const isChecked = (): boolean => !!state.checked();
  const checkedState = createCheckedState(isChecked);
  const disabledState = createDisabledState(() => state.disabled());
  const ariaDisabledState = createARIADisabledState(() => state.disabled());
  const rest = (isSwitchUncontrolled(props)
    ? omit(props, 'onChange', 'defaultChecked', 'ref', 'disabled', 'children')
    : omit(
        props,
        'onChange',
        'checked',
        'ref',
        'disabled',
        'children',
      )) as unknown as ButtonProps<T>;
  return (
    <Button
      {...SWITCH_TAG}
      ref={setRef}
      role="switch"
      aria-checked={isChecked() ? 'true' : 'false'}
      {...checkedState}
      {...disabledState}
      {...ariaDisabledState}
      {...rest}
    >
      <CheckStateProvider state={state}>{props.children}</CheckStateProvider>
    </Button>
  );
}
