import type { JSX } from 'solid-js';
import {
  createComponent,
  createEffect,
  createUniqueId,
  mergeProps,
} from 'solid-js';
import { omitProps } from 'solid-use/props';
import type {
  AutocompleteOptionStateOptions,
  AutocompleteOptionStateRenderProps,
} from '../../states/create-autocomplete-option-state';
import {
  AutocompleteOptionStateProvider,
  createAutocompleteOptionState,
} from '../../states/create-autocomplete-option-state';
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
  createMatchesState,
  createSelectedState,
} from '../../utils/state-props';
import type { OmitAndMerge, Prettify } from '../../utils/types';
import useEventListener from '../../utils/use-event-listener';
import { useVirtualFocus } from '../../utils/virtual-focus';
import type { ButtonProps } from '../button';
import { Button } from '../button';
import { useCommandContext } from './CommandContext';
import { COMMAND_OPTION_TAG } from './tags';

export type CommandOptionBaseProps<V> = Prettify<
  AutocompleteOptionStateOptions<V> & AutocompleteOptionStateRenderProps
>;

export type CommandOptionProps<
  V,
  T extends ValidConstructor = 'li',
> = HeadlessPropsWithRef<
  T,
  OmitAndMerge<CommandOptionBaseProps<V>, ButtonProps<T>>
>;

export function CommandOption<V, T extends ValidConstructor = 'li'>(
  props: CommandOptionProps<V, T>,
): JSX.Element {
  const context = useCommandContext('CommandOption');
  const [internalRef, setInternalRef] = createForwardRef(props);
  const state = createAutocompleteOptionState(props);
  const id = createUniqueId();

  createEffect(() => {
    if (!state.disabled() && context.selectedDescendant === id) {
      state.select();
    }
  });

  function focusOption(): void {
    context.activeDescendant = id;
    state.focus();
  }

  createEffect(() => {
    const current = internalRef();
    if (current instanceof HTMLElement) {
      useEventListener(current, 'click', () => {
        if (!state.disabled()) {
          state.select();
          focusOption();
        }
      });
      useEventListener(current, 'mouseenter', () => {
        if (!state.disabled()) {
          focusOption();
        }
      });
      useEventListener(current, 'mouseleave', () => {
        state.blur();
      });
      useVirtualFocus(el => {
        if (el === current) {
          focusOption();
        }
      });
    }
  });

  return createComponent(
    Button,
    mergeProps(
      omitProps(props, ['as', 'children', 'value', 'ref']),
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
    ) as ButtonProps<T>,
  );
}
