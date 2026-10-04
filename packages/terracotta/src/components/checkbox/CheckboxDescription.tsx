import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { omit } from 'solid-js';
import type { CheckStateRenderProps } from '../../states/create-check-state';
import { CheckStateChild, useCheckState } from '../../states/create-check-state';
import type { HeadlessProps } from '../../utils/dynamic-prop';
import { createCheckedState, createDisabledState } from '../../utils/state-props';
import { useCheckboxContext } from './CheckboxContext';
import { CHECKBOX_DESCRIPTION } from './tags';

export type CheckboxDescriptionProps<T extends ValidComponent = 'p'> = HeadlessProps<
  T,
  CheckStateRenderProps
>;

/**
 * The accessible description of a `Checkbox`, wired up through `aria-
 * describedby`.
 *
 * Renders a `<p>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/checkbox.md}
 */
export function CheckboxDescription<T extends ValidComponent = 'p'>(
  props: CheckboxDescriptionProps<T>,
): JSX.Element {
  const context = useCheckboxContext('CheckboxDescription');
  const state = useCheckState();
  const rest = omit(props, 'as', 'children');
  const disabledState = createDisabledState(() => state.disabled());
  const checkedState = createCheckedState(() => state.checked());
  const Root = dynamic(() => props.as || 'p');
  return (
    <Root
      {...rest}
      {...CHECKBOX_DESCRIPTION}
      id={context.descriptionID}
      {...disabledState}
      {...checkedState}
    >
      <CheckStateChild>{props.children}</CheckStateChild>
    </Root>
  );
}
