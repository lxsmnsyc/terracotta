import type { JSX } from 'solid-js';
import {
  createComponent,
  createEffect,
  mergeProps,
  onCleanup,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use/props';
import type {
  SelectOptionStateOptions,
  SelectOptionStateRenderProps,
} from '../../states/create-select-option-state';
import {
  createSelectOptionState,
  SelectOptionStateProvider,
} from '../../states/create-select-option-state';
import type {
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  createForwardRef,
} from '../../utils/dynamic-prop';
import { createOwnerAttribute } from '../../utils/focus-navigator';
import {
  createActiveState,
  createARIADisabledState,
  createARIASelectedState,
  createDisabledState,
  createSelectedState,
} from '../../utils/state-props';
import type { OmitAndMerge, Prettify } from '../../utils/types';
import type { ButtonProps } from '../button';
import {
  Button,
} from '../button';
import {
  useSelectContext,
} from './SelectContext';
import { SELECT_OPTION_TAG } from './tags';

export type SelectOptionBaseProps<V> = Prettify<
  & SelectOptionStateOptions<V>
  & SelectOptionStateRenderProps
>;

export type SelectOptionProps<V, T extends ValidConstructor = 'li'> =
  HeadlessPropsWithRef<T, OmitAndMerge<SelectOptionBaseProps<V>, ButtonProps<T>>>;

export function SelectOption<V, T extends ValidConstructor = 'li'>(
  props: SelectOptionProps<V, T>,
): JSX.Element {
  const context = useSelectContext('SelectOption');
  const [internalRef, setInternalRef] = createForwardRef(props);
  const state = createSelectOptionState(props);

  const isDisabled = (): boolean | undefined => state.disabled() || props.disabled;

  createEffect(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const onClick = (): void => {
        if (!isDisabled()) {
          state.select();
        }
      };
      const onFocus = (): void => {
        if (!isDisabled()) {
          state.focus();
        }
      };
      const onBlur = (): void => {
        if (!isDisabled()) {
          state.blur();
        }
      };
      const onMouseEnter = (): void => {
        if (!isDisabled()) {
          ref.focus();
        }
      };
      const onMouseLeave = (): void => {
        if (!isDisabled()) {
          ref.blur();
        }
      };

      ref.addEventListener('click', onClick);
      ref.addEventListener('focus', onFocus);
      ref.addEventListener('blur', onBlur);
      ref.addEventListener('mouseenter', onMouseEnter);
      ref.addEventListener('mouseleave', onMouseLeave);
      onCleanup(() => {
        ref.removeEventListener('click', onClick);
        ref.removeEventListener('focus', onFocus);
        ref.removeEventListener('blur', onBlur);
        ref.removeEventListener('mouseenter', onMouseEnter);
        ref.removeEventListener('mouseleave', onMouseLeave);
      });
    }
  });

  return createComponent(Button, mergeProps(
    omitProps(props, [
      'as',
      'children',
      'value',
      'ref',
    ]),
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
    createDisabledState(isDisabled),
    createARIADisabledState(isDisabled),
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
  ) as ButtonProps<T>);
}
