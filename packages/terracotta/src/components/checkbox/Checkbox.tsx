import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { createUniqueId, omit } from 'solid-js';
import type {
  CheckStateControlledOptions,
  CheckStateRenderProps,
  CheckStateUncontrolledOptions,
} from '../../states/create-check-state';
import { CheckStateProvider, createCheckState } from '../../states/create-check-state';
import type { HeadlessProps } from '../../utils/dynamic-prop';
import { createCheckedState, createDisabledState } from '../../utils/state-props';
import type { Prettify } from '../../utils/types';
import { CheckboxContext } from './CheckboxContext';
import { CHECKBOX_TAG } from './tags';
import { createPresence } from '../../utils/create-presence';

export type CheckboxControlledBaseProps = Prettify<
  CheckStateControlledOptions & CheckStateRenderProps
>;

export type CheckboxControlledProps<T extends ValidComponent = 'div'> = HeadlessProps<
  T,
  CheckboxControlledBaseProps
>;

export type CheckboxUncontrolledBaseProps = Prettify<
  CheckStateUncontrolledOptions & CheckStateRenderProps
>;

export type CheckboxUncontrolledProps<T extends ValidComponent = 'div'> = HeadlessProps<
  T,
  CheckboxUncontrolledBaseProps
>;

export type CheckboxProps<T extends ValidComponent = 'div'> =
  | CheckboxControlledProps<T>
  | CheckboxUncontrolledProps<T>;

function isCheckboxUncontrolled<T extends ValidComponent = 'div'>(
  props: CheckboxProps<T>,
): props is CheckboxUncontrolledProps<T> {
  return 'defaultChecked' in props;
}

/**
 * A checkbox that can be checked, unchecked, or indeterminate. It is a wrapper
 * only: the tickable control is `CheckboxIndicator`, and the state lives in
 * `defaultChecked`/`checked`, where `undefined` means indeterminate.
 *
 * Renders a `<div>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/checkbox.md}
 */
export function Checkbox<T extends ValidComponent = 'div'>(props: CheckboxProps<T>): JSX.Element {
  const ownerID = createUniqueId();
  const labelID = createUniqueId();
  const indicatorID = createUniqueId();
  const descriptionID = createUniqueId();
  const label = createPresence();
  const description = createPresence();

  const state = createCheckState(props);

  const disabledState = createDisabledState(() => state.disabled());
  const checkedState = createCheckedState(() => state.checked());
  const rest = isCheckboxUncontrolled(props)
    ? omit(props, 'as', 'children', 'defaultChecked', 'disabled', 'onChange')
    : omit(props, 'as', 'children', 'checked', 'disabled', 'onChange');
  const Root = dynamic(() => props.as || 'div');
  return (
    <CheckboxContext
      value={{
        ownerID,
        labelID,
        indicatorID,
        descriptionID,
        label,
        description,
      }}
    >
      <Root {...CHECKBOX_TAG} {...disabledState} {...checkedState} {...rest}>
        <CheckStateProvider state={state}>{props.children}</CheckStateProvider>
      </Root>
    </CheckboxContext>
  );
}
