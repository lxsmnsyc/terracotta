import {
  onCleanup,
  JSX,
  createComponent,
  mergeProps,
  createRenderEffect,
  createUniqueId,
  createEffect,
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
  createMatchesState,
  createSelectedState,
} from '../../utils/state-props';
import { OmitAndMerge, Prettify } from '../../utils/types';
import {
  Button,
  ButtonProps,
} from '../button';
import {
  useComboboxContext,
} from './ComboboxContext';
import { COMBOBOX_OPTION_TAG } from './tags';
import { useDisclosureState } from '../../states/create-disclosure-state';
import {
  AutocompleteOptionStateOptions,
  AutocompleteOptionStateProvider,
  AutocompleteOptionStateRenderProps,
  createAutocompleteOptionState,
} from '../../states/create-autocomplete-option-state';
import { registerVirtualFocus } from '../../utils/virtual-focus';

export type ComboboxOptionBaseProps<V> = Prettify<
  & AutocompleteOptionStateOptions<V>
  & AutocompleteOptionStateRenderProps
>;

export type ComboboxOptionProps<V, T extends ValidConstructor = 'li'> =
  HeadlessPropsWithRef<T, OmitAndMerge<ComboboxOptionBaseProps<V>, ButtonProps<T>>>;

export function ComboboxOption<V, T extends ValidConstructor = 'li'>(
  props: ComboboxOptionProps<V, T>,
): JSX.Element {
  const context = useComboboxContext('ComboboxOptions');
  const disclosure = useDisclosureState();
  const state = createAutocompleteOptionState(props);
  const [internalRef, setInternalRef] = createForwardRef(props);

  const isDisabled = () => state.disabled() || props.disabled;
  const id = createUniqueId();

  createEffect(() => {
    if (!isDisabled() && context.selectedDescendant === id) {
      state.select();
      if (!context.multiple) {
        disclosure.close();
      }
    }
  });

  function focusOption() {
    context.activeDescendant = id;
    state.focus();
  }

  // I would really love to use createEffect but for some reason
  // the timing is never accurate
  createRenderEffect(() => {
    const ref = internalRef();

    if (ref instanceof HTMLElement) {
      const onClick = () => {
        if (!isDisabled()) {
          state.select();
          if (!context.multiple) {
            disclosure.close();
          }
        }
      };
      const onMouseEnter = () => {
        if (!isDisabled()) {
          focusOption();
        }
      };
      const onMouseLeave = () => {
        if (!isDisabled()) {
          state.blur();
        }
      };

      ref.addEventListener('click', onClick);
      ref.addEventListener('mouseenter', onMouseEnter);
      ref.addEventListener('mouseleave', onMouseLeave);
      onCleanup(() => {
        ref.removeEventListener('click', onClick);
        ref.removeEventListener('mouseenter', onMouseEnter);
        ref.removeEventListener('mouseleave', onMouseLeave);
      });

      onCleanup(registerVirtualFocus((el) => {
        if (el === ref) {
          focusOption();
        }
      }));
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
    COMBOBOX_OPTION_TAG,
    createOwnerAttribute(context.controller.getId()),
    {
      id,
      get as() {
        return props.as || ('li' as T);
      },
      role: 'option',
      tabindex: -1,
      ref: setInternalRef,
    },
    createDisabledState(() => state.disabled()),
    createARIADisabledState(() => state.disabled()),
    createSelectedState(() => state.isSelected()),
    createARIASelectedState(() => state.isSelected()),
    createActiveState(() => state.isActive()),
    createMatchesState(() => state.matches()),
    {
      get children() {
        return createComponent(AutocompleteOptionStateProvider, {
          state,
          get children() {
            return props.children;
          },
        });
      },
    },
  ) as ButtonProps<T>);
}
