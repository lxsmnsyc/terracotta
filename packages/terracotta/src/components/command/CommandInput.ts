import type { JSX } from 'solid-js';
import { createEffect, mergeProps } from 'solid-js';
import { omitProps } from 'solid-use/props';
import { useAutocompleteState } from '../../states/create-autocomplete-state';
import createDynamic from '../../utils/create-dynamic';
import type {
  DynamicProps,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
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

export type CommandInputProps<T extends ValidConstructor = 'input'> =
  HeadlessPropsWithRef<T>;

export function CommandInput<T extends ValidConstructor = 'input'>(
  props: CommandInputProps<T>,
): JSX.Element {
  const context = useCommandContext('CommandInput');
  const state = useAutocompleteState();
  const [internalRef, setInternalRef] = createForwardRef(props);

  const isDisabled = (): boolean | undefined =>
    state.disabled() || props.disabled;

  createEffect(() => {
    const current = internalRef();
    if (current instanceof HTMLElement) {
      context.anchor = current;

      if (current instanceof HTMLInputElement) {
        useEventListener(current, 'input', () => {
          if (!isDisabled()) {
            state.setQuery(current.value);
          }
        });
      }
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
              context.selectedDescendant = context.activeDescendant;
              break;
            }
          }
        }
      });
      useEventListener(current, 'focus', () => {
        if (context.activeDescendant) {
          const ref = document.getElementById(context.activeDescendant);
          if (ref) {
            context.controller.setCurrent(ref);
          }
        } else if (state.hasSelected()) {
          context.controller.setFirstChecked(SELECTED_NODE);
        } else {
          context.controller.setFirstChecked();
        }
      });
      useEventListener(current, 'blur', () => {
        if (!context.optionsHovering) {
          state.blur();
        }
      });
    }
  });

  createEffect(() => {
    if (state.query() !== '') {
      context.controller.setFirstChecked();
    }
  });

  createEffect(() => {
    if (context.activeDescendant) {
      const ref = document.getElementById(context.activeDescendant);
      if (ref) {
        context.controller.setCurrent(ref);
      }
    }
  });

  return createDynamic(
    () => props.as || ('input' as T),
    mergeProps(
      omitProps(props, ['as', 'ref']),
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
          return context.activeDescendant;
        },
      },
      COMMAND_INPUT_TAG,
      createDisabledState(isDisabled),
      createARIADisabledState(isDisabled),
      createHasSelectedState(() => state.hasSelected()),
      createHasActiveState(() => state.hasActive()),
      createHasQueryState(() => state.hasQuery()),
    ) as DynamicProps<T>,
  );
}
