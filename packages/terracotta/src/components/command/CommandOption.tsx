import type { JSX, ValidComponent } from '@solidjs/web';
import { createEffect, createUniqueId, omit } from 'solid-js';
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

  const ownerAttribute = createOwnerAttribute(context.controller.getId());
  const disabledState = createDisabledState(() => state.disabled());
  const ariaDisabledState = createARIADisabledState(() => state.disabled());
  const selectedState = createSelectedState(() => state.isSelected());
  const ariaSelectedState = createARIASelectedState(() => state.isSelected());
  const activeState = createActiveState(() => state.isActive());
  const matchesState = createMatchesState(() => state.matches());
  const rest = omit(props, 'as', 'children', 'value', 'ref') as unknown as ButtonProps<T>;
  return (
    <Button
      {...COMMAND_OPTION_TAG}
      {...ownerAttribute}
      id={id}
      as={props.as || ('li' as T)}
      role="option"
      tabindex={-1}
      ref={setInternalRef}
      {...disabledState}
      {...ariaDisabledState}
      {...selectedState}
      {...ariaSelectedState}
      {...activeState}
      {...matchesState}
      {...rest}
    >
      <AutocompleteOptionStateProvider state={state}>
        {props.children}
      </AutocompleteOptionStateProvider>
    </Button>
  );
}
