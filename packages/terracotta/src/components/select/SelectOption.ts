import {
  createComponent,
  createEffect,
  JSX,
  mergeProps,
  onCleanup,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use/props';
import {
  createSelectOptionState,
  SelectOptionStateOptions,
  SelectOptionStateProvider,
  SelectOptionStateRenderProps,
} from '../../states/create-select-option-state';
import {
  createForwardRef,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import { createOwnerAttribute } from '../../utils/focus-navigator';
import { createActiveState, createDisabledState, createSelectedState } from '../../utils/state-props';
import { OmitAndMerge, Prettify } from '../../utils/types';
import {
  Button,
  ButtonProps,
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
  const context = useSelectContext('Select');
  const [internalRef, setInternalRef] = createForwardRef(props);
  const state = createSelectOptionState(props);

  createEffect(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const onClick = () => {
        state.select();
      };
      const onFocus = () => {
        state.focus();
      };
      const onBlur = () => {
        state.blur();
      };
      const onMouseEnter = () => {
        if (!state.disabled()) {
          ref.focus();
        }
      };
      const onMouseLeave = () => {
        if (!state.disabled()) {
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
    createDisabledState(() => state.disabled()),
    createSelectedState(() => state.isSelected()),
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
