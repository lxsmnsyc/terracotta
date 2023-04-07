import {
  createComponent,
  createEffect,
  createUniqueId,
  JSX,
  mergeProps,
  onCleanup,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use/props';
import {
  createAutocompleteOptionState,
  AutocompleteOptionStateOptions,
  AutocompleteOptionStateProvider,
  AutocompleteOptionStateRenderProps,
} from '../../states/create-autocomplete-option-state';
import {
  createForwardRef,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import { createOwnerAttribute } from '../../utils/focus-navigator';
import {
  createActiveState,
  createARIADisabledState,
  createARIASelectedState,
  createDisabledState,
  createMatchesState,
  createSelectedState,
} from '../../utils/state-props';
import { OmitAndMerge, Prettify } from '../../utils/types';
import {
  Button,
  ButtonProps,
} from '../button';
import { COMMAND_OPTION_TAG } from './tags';
import { useCommandContext } from './CommandContext';
import { registerVirtualFocus } from '../../utils/virtual-focus';

export type CommandOptionBaseProps<V> = Prettify<
  & AutocompleteOptionStateOptions<V>
  & AutocompleteOptionStateRenderProps
>;

export type CommandOptionProps<V, T extends ValidConstructor = 'li'> =
  HeadlessPropsWithRef<T, OmitAndMerge<CommandOptionBaseProps<V>, ButtonProps<T>>>;

export function CommandOption<V, T extends ValidConstructor = 'li'>(
  props: CommandOptionProps<V, T>,
): JSX.Element {
  const context = useCommandContext('CommandOption');
  const [internalRef, setInternalRef] = createForwardRef(props);
  const state = createAutocompleteOptionState(props);
  const id = createUniqueId();

  const isDisabled = () => state.disabled() || props.disabled;
  createEffect(() => {
    if (!isDisabled() && context.selectedDescendant === id) {
      state.select();
    }
  });

  function focusOption() {
    context.activeDescendant = id;
    state.focus();
  }

  createEffect(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const onClick = () => {
        if (!isDisabled()) {
          state.select();
          focusOption();
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
      'value',
      'ref',
    ]),
    COMMAND_OPTION_TAG,
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
    createDisabledState(isDisabled),
    createARIADisabledState(isDisabled),
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
