import type { ComponentProps, JSX, ValidComponent } from 'solid-js';
import {
  createComponent,
  createEffect,
  createUniqueId,
  merge,
  omit,
} from 'solid-js';
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
import { Button } from '../button';
import { RadioGroupContext } from './RadioGroupContext';
import { useRadioGroupRootContext } from './RadioGroupRootContext';
import { RADIO_GROUP_OPTION_TAG } from './tags';

export type RadioGroupOptionBaseProps<V> = Prettify<
  SelectOptionStateOptions<V> & SelectOptionStateRenderProps
>;

export type RadioGroupOptionProps<
  V,
  T extends ValidComponent = 'div',
> = HeadlessPropsWithRef<T, RadioGroupOptionBaseProps<V>>;

export function RadioGroupOption<V, T extends ValidComponent = 'div'>(
  props: RadioGroupOptionProps<V, T>,
): JSX.Element {
  const context = useRadioGroupRootContext('RadioGroupOption');

  const descriptionID = createUniqueId();
  const labelID = createUniqueId();

  const [internalRef, setInternalRef] = createForwardRef(props);
  const state = createSelectOptionState(props);

  createEffect(internalRef, current => {
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
  });

  return createComponent(RadioGroupContext, {
    value: { descriptionID, labelID },
    get children() {
      return createComponent(
        Button,
        merge(
          RADIO_GROUP_OPTION_TAG,
          createOwnerAttribute(context.getId()),
          {
            get as() {
              return props.as || ('div' as T);
            },
            role: 'radio',
            'aria-labelledby': labelID,
            'aria-describedby': descriptionID,
            ref: setInternalRef,
            get tabindex() {
              const selected = state.isSelected();
              return state.disabled() || !selected ? -1 : 0;
            },
          },
          createDisabledState(() => state.disabled()),
          createARIADisabledState(() => state.disabled()),
          createCheckedState(() => state.isSelected()),
          createARIACheckedState(() => state.isSelected()),
          createActiveState(() => state.isActive()),
          omit(props, 'as', 'children', 'value', 'disabled', 'ref'),
          {
            get children() {
              return createComponent(SelectOptionStateProvider, {
                state,
                get children() {
                  return props.children;
                },
              });
            },
          },
        ) as ComponentProps<T>,
      );
    },
  });
}
