import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { createEffect, omit } from 'solid-js';
import { useAutocompleteState } from '../../states/create-autocomplete-state';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import { mergeFunc } from '../../utils/merge-func';
import { SELECTED_NODE } from '../../utils/namespace';
import {
  createARIADisabledState,
  createDisabledState,
  createHasActiveState,
  createHasQueryState,
  createHasSelectedState,
} from '../../utils/state-props';
import useEventListener from '../../utils/use-event-listener';
import { useCommandContext } from './CommandContext';
import { COMMAND_INPUT_TAG } from './tags';

export type CommandInputProps<T extends ValidComponent = 'input'> = HeadlessPropsWithRef<T>;

/**
 * The query field of a `Command`. Typing sets the query, which is debounced by
 * 250ms, and the arrow keys move the active option without moving focus out of
 * the input.
 *
 * Renders an `<input>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/command.md}
 */
export function CommandInput<T extends ValidComponent = 'input'>(
  props: CommandInputProps<T>,
): JSX.Element {
  const context = useCommandContext('CommandInput');
  const state = useAutocompleteState();
  const [internalRef, setInternalRef] = createForwardRef(props);

  const isDisabled = (): boolean | undefined => state.disabled() || props.disabled;

  createEffect(internalRef, (current) => {
    if (current instanceof HTMLElement) {
      context.anchor = current;
      return mergeFunc(
        current instanceof HTMLInputElement &&
          useEventListener(current, 'input', () => {
            if (!isDisabled()) {
              state.setQuery(current.value);
            }
          }),
        useEventListener(current, 'keydown', (e) => {
          if (!isDisabled()) {
            switch (e.key) {
              case 'ArrowUp': {
                e.preventDefault();
                context.controller.setPrevChecked(true);
                break;
              }
              case 'ArrowDown': {
                e.preventDefault();
                context.controller.setNextChecked(true);
                break;
              }
              case 'Enter': {
                e.preventDefault();
                context.setSelectedDescendant(context.getActiveDescendant());
                break;
              }
            }
          }
        }),
        useEventListener(current, 'focus', () => {
          const activeDescendant = context.getActiveDescendant();
          if (activeDescendant) {
            const ref = document.getElementById(activeDescendant);
            if (ref) {
              context.controller.setCurrent(ref);
            }
          } else if (state.hasSelected()) {
            context.controller.setFirstChecked(SELECTED_NODE);
          } else {
            context.controller.setFirstChecked();
          }
        }),
        useEventListener(current, 'blur', () => {
          if (!context.optionsHovering) {
            state.blur();
          }
        }),
      );
    }
    return undefined;
  });

  createEffect(
    () => state.query() !== '',
    (flag) => {
      if (flag) {
        context.controller.setFirstChecked();
      }
    },
  );

  createEffect(
    () => context.getActiveDescendant(),
    (activeDescendant) => {
      if (activeDescendant) {
        const ref = document.getElementById(activeDescendant);
        if (ref) {
          context.controller.setCurrent(ref);
        }
      }
    },
  );

  const disabledState = createDisabledState(isDisabled);
  const ariaDisabledState = createARIADisabledState(isDisabled);
  const hasSelectedState = createHasSelectedState(() => state.hasSelected());
  const hasActiveState = createHasActiveState(() => state.hasActive());
  const hasQueryState = createHasQueryState(() => state.hasQuery());
  const rest = omit(props, 'as', 'ref');
  const Root = dynamic(() => props.as || 'input');
  return (
    <Root
      {...COMMAND_INPUT_TAG}
      id={context.inputID}
      ref={setInternalRef}
      type="text"
      tabindex={0}
      role="combobox"
      aria-controls={context.optionsID}
      aria-expanded="true"
      aria-activedescendant={context.getActiveDescendant()}
      {...disabledState}
      {...ariaDisabledState}
      {...hasSelectedState}
      {...hasActiveState}
      {...hasQueryState}
      {...rest}
    />
  );
}
