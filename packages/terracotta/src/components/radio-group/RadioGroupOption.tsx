import type { JSX, ValidComponent } from '@solidjs/web';
import { createEffect, createUniqueId, omit } from 'solid-js';
import type {
  SelectOptionStateOptions,
  SelectOptionStateRenderProps,
} from '../../states/create-select-option-state';
import {
  createSelectOptionState,
  SelectOptionStateProvider,
} from '../../states/create-select-option-state';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import { createOwnerAttribute } from '../../utils/focus-navigator';
import { mergeFunc } from '../../utils/merge-func';
import {
  createActiveState,
  createARIACheckedState,
  createARIADisabledState,
  createCheckedState,
  createDisabledState,
} from '../../utils/state-props';
import type { Prettify } from '../../utils/types';
import useEventListener from '../../utils/use-event-listener';
import { Button, type ButtonProps } from '../button';
import { RadioGroupContext } from './RadioGroupContext';
import { useRadioGroupRootContext } from './RadioGroupRootContext';
import { RADIO_GROUP_OPTION_TAG } from './tags';

export type RadioGroupOptionBaseProps<V> = Prettify<
  SelectOptionStateOptions<V> & SelectOptionStateRenderProps
>;

export type RadioGroupOptionProps<V, T extends ValidComponent = 'div'> = HeadlessPropsWithRef<
  T,
  RadioGroupOptionBaseProps<V>
>;

/**
 * One choice in a `RadioGroup`. The required `value` prop is what selecting it
 * produces.
 *
 * Renders a `<div>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/radio-group.md}
 */
export function RadioGroupOption<V, T extends ValidComponent = 'div'>(
  props: RadioGroupOptionProps<V, T>,
): JSX.Element {
  const context = useRadioGroupRootContext('RadioGroupOption');

  const descriptionID = createUniqueId();
  const labelID = createUniqueId();

  const [internalRef, setInternalRef] = createForwardRef(props);
  const state = createSelectOptionState(props);

  createEffect(internalRef, (current) => {
    if (current instanceof HTMLElement) {
      return mergeFunc(
        useEventListener(current, 'click', () => {
          state.select();
        }),
        useEventListener(current, 'focus', () => {
          state.focus();
          state.select();
        }),
        useEventListener(current, 'blur', () => {
          state.blur();
        }),
      );
    }
    return undefined;
  });

  const ownerAttribute = createOwnerAttribute(context.getId());
  const disabledState = createDisabledState(() => state.disabled());
  const ariaDisabledState = createARIADisabledState(() => state.disabled());
  const checkedState = createCheckedState(() => state.isSelected());
  const ariaCheckedState = createARIACheckedState(() => state.isSelected());
  const activeState = createActiveState(() => state.isActive());
  const rest = omit(
    props,
    'as',
    'children',
    'value',
    'disabled',
    'ref',
  ) as unknown as ButtonProps<T>;
  return (
    <RadioGroupContext value={{ descriptionID, labelID }}>
      <Button
        {...RADIO_GROUP_OPTION_TAG}
        {...ownerAttribute}
        as={props.as || ('div' as T)}
        role="radio"
        aria-labelledby={labelID}
        aria-describedby={descriptionID}
        ref={setInternalRef}
        tabindex={state.disabled() || !state.isSelected() ? -1 : 0}
        {...disabledState}
        {...ariaDisabledState}
        {...checkedState}
        {...ariaCheckedState}
        {...activeState}
        {...rest}
      >
        <SelectOptionStateProvider state={state}>{props.children}</SelectOptionStateProvider>
      </Button>
    </RadioGroupContext>
  );
}
