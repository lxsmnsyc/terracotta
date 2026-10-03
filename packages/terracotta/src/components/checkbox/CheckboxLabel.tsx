import { Dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { omit } from 'solid-js';
import type { CheckStateRenderProps } from '../../states/create-check-state';
import { CheckStateChild, useCheckState } from '../../states/create-check-state';
import type { HeadlessProps } from '../../utils/dynamic-prop';
import { createCheckedState, createDisabledState } from '../../utils/state-props';
import { useCheckboxContext } from './CheckboxContext';
import { CHECKBOX_LABEL } from './tags';

export type CheckboxLabelProps<T extends ValidComponent = 'label'> = HeadlessProps<
  T,
  CheckStateRenderProps
>;

/**
 * The accessible name of a `Checkbox`, wired up through `aria-labelledby`.
 *
 * Renders a `<label>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/checkbox.md}
 */
export function CheckboxLabel<T extends ValidComponent = 'label'>(
  props: CheckboxLabelProps<T>,
): JSX.Element {
  const context = useCheckboxContext('CheckboxLabel');
  const state = useCheckState();
  const rest = omit(props, 'as', 'children');
  const disabledState = createDisabledState(() => state.disabled());
  const checkedState = createCheckedState(() => state.checked());
  return (
    <Dynamic
      component={props.as || 'label'}
      {...rest}
      {...CHECKBOX_LABEL}
      id={context.labelID}
      for={context.indicatorID}
      {...disabledState}
      {...checkedState}
    >
      <CheckStateChild>{props.children}</CheckStateChild>
    </Dynamic>
  );
}
