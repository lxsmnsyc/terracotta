import type { JSX, ValidComponent } from '@solidjs/web';
import { createEffect, omit } from 'solid-js';
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
  createARIADisabledState,
  createARIASelectedState,
  createDisabledState,
  createSelectedState,
} from '../../utils/state-props';
import type { OmitAndMerge, Prettify } from '../../utils/types';
import useEventListener from '../../utils/use-event-listener';
import type { ButtonProps } from '../button';
import { Button } from '../button';
import { useSelectContext } from './SelectContext';
import { SELECT_OPTION_TAG } from './tags';

export type SelectOptionBaseProps<V> = Prettify<
  SelectOptionStateOptions<V> & SelectOptionStateRenderProps
>;

export type SelectOptionProps<V, T extends ValidComponent = 'li'> = HeadlessPropsWithRef<
  T,
  OmitAndMerge<SelectOptionBaseProps<V>, ButtonProps<T>>
>;

/**
 * One option of a `Select`. The required `value` prop is what selecting it
 * produces.
 *
 * Renders an `<li>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/select.md}
 */
export function SelectOption<V, T extends ValidComponent = 'li'>(
  props: SelectOptionProps<V, T>,
): JSX.Element {
  const context = useSelectContext('SelectOption');
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
        }),
        useEventListener(current, 'blur', () => {
          state.blur();
        }),
        useEventListener(current, 'mouseenter', () => {
          if (!state.disabled()) {
            current.focus();
          }
        }),
        useEventListener(current, 'mouseleave', () => {
          // Clear the highlight only. Blurring would drop keyboard focus to the page.
          if (!state.disabled()) {
            state.blur();
          }
        }),
      );
    }
    return undefined;
  });

  const ownerAttribute = createOwnerAttribute(context.getId());
  const disabledState = createDisabledState(() => state.disabled());
  const ariaDisabledState = createARIADisabledState(() => state.disabled());
  const selectedState = createSelectedState(() => state.isSelected());
  const ariaSelectedState = createARIASelectedState(() => state.isSelected());
  const activeState = createActiveState(() => state.isActive());
  const rest = omit(props, 'as', 'children', 'value', 'ref') as unknown as ButtonProps<T>;
  return (
    <Button
      {...SELECT_OPTION_TAG}
      {...ownerAttribute}
      as={props.as || ('li' as T)}
      role="option"
      tabindex={state.isActive() ? 0 : -1}
      ref={setInternalRef}
      {...disabledState}
      {...ariaDisabledState}
      {...selectedState}
      {...ariaSelectedState}
      {...activeState}
      {...rest}
    >
      <SelectOptionStateProvider state={state}>{props.children}</SelectOptionStateProvider>
    </Button>
  );
}
