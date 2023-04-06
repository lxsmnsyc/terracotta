import {
  onCleanup,
  JSX,
  createComponent,
  mergeProps,
  createRenderEffect,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use/props';
import {
  createForwardRef,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import { createOwnerAttribute } from '../../utils/focus-navigator';
import {
  createARIADisabledState,
  createARIASelectedState,
  createActiveState,
  createDisabledState,
  createSelectedState,
} from '../../utils/state-props';
import { OmitAndMerge, Prettify } from '../../utils/types';
import {
  Button,
  ButtonProps,
} from '../button';
import {
  useListboxContext,
} from './ListboxContext';
import {
  useListboxOptionsContext,
} from './ListboxOptionsContext';
import { LISTBOX_OPTION_TAG } from './tags';
import { useDisclosureState } from '../../states/create-disclosure-state';
import {
  SelectOptionStateOptions,
  SelectOptionStateProvider,
  SelectOptionStateRenderProps,
  createSelectOptionState,
} from '../../states/create-select-option-state';

export type ListboxOptionBaseProps<V> = Prettify<
  & SelectOptionStateOptions<V>
  & SelectOptionStateRenderProps
>;

export type ListboxOptionProps<V, T extends ValidConstructor = 'li'> =
  HeadlessPropsWithRef<T, OmitAndMerge<ListboxOptionBaseProps<V>, ButtonProps<T>>>;

export function ListboxOption<V, T extends ValidConstructor = 'li'>(
  props: ListboxOptionProps<V, T>,
): JSX.Element {
  const rootContext = useListboxContext('ListboxOptions');
  const context = useListboxOptionsContext('ListboxOptions');
  const disclosure = useDisclosureState();
  const state = createSelectOptionState(props);

  const [internalRef, setInternalRef] = createForwardRef(props);

  const isDisabled = () => state.disabled() || props.disabled;

  // I would really love to use createEffect but for some reason
  // the timing is never accurate
  createRenderEffect(() => {
    const ref = internalRef();

    if (ref instanceof HTMLElement) {
      const onClick = () => {
        if (!isDisabled()) {
          state.select();
          if (!rootContext.multiple) {
            disclosure.close();
          }
        }
      };
      const onFocus = () => {
        if (!isDisabled()) {
          state.focus();
        }
      };
      const onBlur = () => {
        if (!isDisabled()) {
          state.blur();
        }
      };

      ref.addEventListener('click', onClick);
      ref.addEventListener('focus', onFocus);
      ref.addEventListener('blur', onBlur);
      onCleanup(() => {
        ref.removeEventListener('click', onClick);
        ref.removeEventListener('focus', onFocus);
        ref.removeEventListener('blur', onBlur);
      });
    }
  });

  return createComponent(Button, mergeProps(
    omitProps(props, [
      'as',
      'children',
      'disabled',
      'value',
      'ref',
    ]),
    LISTBOX_OPTION_TAG,
    createOwnerAttribute(context.getId()),
    {
      get as() {
        return props.as || ('li' as T);
      },
      role: 'option',
      tabindex: -1,
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
