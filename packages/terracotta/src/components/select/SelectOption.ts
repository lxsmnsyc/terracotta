import type { JSX, ValidComponent } from 'solid-js';
import { createComponent, createEffect, merge } from 'solid-js';
import { omitProps } from 'solid-use/props';
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

export type SelectOptionProps<
  V,
  T extends ValidComponent = 'li',
> = HeadlessPropsWithRef<
  T,
  OmitAndMerge<SelectOptionBaseProps<V>, ButtonProps<T>>
>;

export function SelectOption<V, T extends ValidComponent = 'li'>(
  props: SelectOptionProps<V, T>,
): JSX.Element {
  const context = useSelectContext('SelectOption');
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
          if (!state.disabled()) {
            current.blur();
          }
        }),
      );
    }
    return undefined;
  });

  return createComponent(
    Button,
    merge(
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
      omitProps(props, ['as', 'children', 'value', 'ref']),
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
