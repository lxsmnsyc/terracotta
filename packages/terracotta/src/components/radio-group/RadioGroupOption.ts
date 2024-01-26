import type { JSX } from 'solid-js';
import {
  createComponent,
  createEffect,
  createUniqueId,
  mergeProps,
} from 'solid-js';
import { omitProps } from 'solid-use/props';
import type {
  SelectOptionStateOptions,
  SelectOptionStateRenderProps,
} from '../../states/create-select-option-state';
import {
  SelectOptionStateProvider,
  createSelectOptionState,
} from '../../states/create-select-option-state';
import type {
  DynamicProps,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import { createOwnerAttribute } from '../../utils/focus-navigator';
import {
  createARIACheckedState,
  createARIADisabledState,
  createActiveState,
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
  T extends ValidConstructor = 'div',
> = HeadlessPropsWithRef<T, RadioGroupOptionBaseProps<V>>;

export function RadioGroupOption<V, T extends ValidConstructor = 'div'>(
  props: RadioGroupOptionProps<V, T>,
): JSX.Element {
  const context = useRadioGroupRootContext('RadioGroupOption');

  const descriptionID = createUniqueId();
  const labelID = createUniqueId();

  const [internalRef, setInternalRef] = createForwardRef(props);
  const state = createSelectOptionState(props);

  createEffect(() => {
    const current = internalRef();
    if (current instanceof HTMLElement) {
      useEventListener(current, 'click', () => {
        state.select();
      });
      useEventListener(current, 'focus', () => {
        state.focus();
        state.select();
      });
      useEventListener(current, 'blur', () => {
        state.blur();
      });
    }
  });

  return createComponent(RadioGroupContext.Provider, {
    value: { descriptionID, labelID },
    get children() {
      return createComponent(
        Button,
        mergeProps(
          omitProps(props, ['as', 'children', 'value', 'disabled', 'ref']),
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
        ) as DynamicProps<T>,
      );
    },
  });
}
