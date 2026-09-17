import type { JSX, ValidComponent } from '@solidjs/web';
import { createComponent, createEffect, createUniqueId, merge, omit } from 'solid-js';
import type {
  AutocompleteOptionStateOptions,
  AutocompleteOptionStateRenderProps,
} from '../../states/create-autocomplete-option-state';
import {
  AutocompleteOptionStateProvider,
  createAutocompleteOptionState,
} from '../../states/create-autocomplete-option-state';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import { createOwnerAttribute } from '../../utils/focus-navigator';
import { mergeFunc } from '../../utils/merge-func';
import {
  createActiveState,
  createARIADisabledState,
  createARIASelectedState,
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

export type CommandOptionProps<V, T extends ValidComponent = 'li'> = HeadlessPropsWithRef<
  T,
  OmitAndMerge<CommandOptionBaseProps<V>, ButtonProps<T>>
>;

/**
 * One result in a `Command`. Carries `tc-matches` while it matches the current
 * query.
 *
 * Renders an `<li>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/command.md}
 */
export function CommandOption<V, T extends ValidComponent = 'li'>(
  props: CommandOptionProps<V, T>,
): JSX.Element {
  const context = useCommandContext('CommandOption');
  const [internalRef, setInternalRef] = createForwardRef(props);
  const state = createAutocompleteOptionState(props);
  const id = createUniqueId();

  createEffect(
    () => !state.disabled() && context.getSelectedDescendant() === id,
    (flag) => {
      if (flag) {
        state.select();
      }
    },
  );

  function focusOption(): void {
    context.setActiveDescendant(id);
    state.focus();
  }

  createEffect(internalRef, (current) => {
    if (current instanceof HTMLElement) {
      return mergeFunc(
        useEventListener(current, 'click', () => {
          if (!state.disabled()) {
            state.select();
            focusOption();
          }
        }),
        useEventListener(current, 'mouseenter', () => {
          if (!state.disabled()) {
            focusOption();
          }
        }),
        useEventListener(current, 'mouseleave', () => {
          state.blur();
        }),
        useVirtualFocus((el) => {
          if (el === current) {
            focusOption();
          }
        }),
      );
    }
    return undefined;
  });

  return createComponent(
    Button,
    merge(
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
      omit(props, 'as', 'children', 'value', 'ref'),
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
