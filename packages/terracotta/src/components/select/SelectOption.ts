import type { JSX } from 'solid-js';
import { createComponent, createEffect, mergeProps } from 'solid-js';
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
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import { createOwnerAttribute } from '../../utils/focus-navigator';
import {
  createARIADisabledState,
  createARIASelectedState,
  createActiveState,
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

export type SelectOptionProps<
  V,
  T extends ValidConstructor = 'li',
> = HeadlessPropsWithRef<
  T,
  OmitAndMerge<SelectOptionBaseProps<V>, ButtonProps<T>>
>;

export function SelectOption<V, T extends ValidConstructor = 'li'>(
  props: SelectOptionProps<V, T>,
): JSX.Element {
  const context = useSelectContext('SelectOption');
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
      });
      useEventListener(current, 'blur', () => {
        state.blur();
      });
      useEventListener(current, 'mouseenter', () => {
        if (!state.disabled()) {
          current.focus();
        }
      });
      useEventListener(current, 'mouseleave', () => {
        if (!state.disabled()) {
          current.blur();
        }
      });
    }
  });

  return createComponent(
    Button,
    mergeProps(
      omitProps(props, ['as', 'children', 'value', 'ref']),
      SELECT_OPTION_TAG,
      createOwnerAttribute(context.controller.getId()),
      {
        get as() {
          return props.as || ('li' as T);
        },
        role: 'option',
        get tabindex() {
          return state.isActive() ? 0 : -1;
        },
        ref: setInternalRef,
      },
      createDisabledState(() => state.disabled()),
      createARIADisabledState(() => state.disabled()),
      createSelectedState(() => state.isSelected()),
      createARIASelectedState(() => state.isSelected()),
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
    ) as ButtonProps<T>,
  );
}
