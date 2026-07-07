import type { ComponentProps, JSX, ValidComponent } from '@solidjs/web';
import { createEffect, merge, omit } from 'solid-js';
import { useAutocompleteState } from '../../states/create-autocomplete-state';
import createDynamic from '../../utils/create-dynamic';
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

export type CommandInputProps<T extends ValidComponent = 'input'> =
  HeadlessPropsWithRef<T>;

export function CommandInput<T extends ValidComponent = 'input'>(
  props: CommandInputProps<T>,
): JSX.Element {
  const context = useCommandContext('CommandInput');
  const state = useAutocompleteState();
  const [internalRef, setInternalRef] = createForwardRef(props);

  const isDisabled = (): boolean | undefined =>
    state.disabled() || props.disabled;

  createEffect(internalRef, current => {
    if (current instanceof HTMLElement) {
      context.anchor = current;
      return mergeFunc(
        current instanceof HTMLInputElement &&
          useEventListener(current, 'input', () => {
            if (!isDisabled()) {
              state.setQuery(current.value);
            }
          }),
        useEventListener(current, 'keydown', e => {
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
    flag => {
      if (flag) {
        context.controller.setFirstChecked();
      }
    },
  );

  createEffect(
    () => context.getActiveDescendant(),
    activeDescendant => {
      if (activeDescendant) {
        const ref = document.getElementById(activeDescendant);
        if (ref) {
          context.controller.setCurrent(ref);
        }
      }
    },
  );

  return createDynamic(
    () => props.as || ('input' as T),
    merge(
      COMMAND_INPUT_TAG,
      {
        id: context.inputID,
        ref: setInternalRef,
        // Guarantee it's a text
        type: 'text',
        // Guarantee it's interactive
        tabindex: 0,
        role: 'combobox',

        // Controls the options listbox
        'aria-controls': context.optionsID,
        // Since combobox roles have aria-expanded=false
        // as default but Command has a visible listbox
        // we set this to true
        'aria-expanded': true,
        get 'aria-activedescendant'() {
          return context.getActiveDescendant();
        },
      },
      createDisabledState(isDisabled),
      createARIADisabledState(isDisabled),
      createHasSelectedState(() => state.hasSelected()),
      createHasActiveState(() => state.hasActive()),
      createHasQueryState(() => state.hasQuery()),
      omit(props, 'as', 'ref'),
    ) as ComponentProps<T>,
  );
}
