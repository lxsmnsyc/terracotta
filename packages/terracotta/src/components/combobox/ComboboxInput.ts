import type { JSX, ValidComponent } from 'solid-js';
import { createEffect, merge } from 'solid-js';
import { omitProps } from 'solid-use/props';
import { useAutocompleteState } from '../../states/create-autocomplete-state';
import { useDisclosureState } from '../../states/create-disclosure-state';
import createDynamic from '../../utils/create-dynamic';
import type {
  DynamicProps,
  HeadlessPropsWithRef,
} from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import { mergeFunc } from '../../utils/merge-func';
import {
  createARIADisabledState,
  createARIAExpandedState,
  createDisabledState,
  createExpandedState,
  createHasActiveState,
  createHasQueryState,
  createHasSelectedState,
} from '../../utils/state-props';
import useEventListener from '../../utils/use-event-listener';
import { COMMAND_INPUT_TAG } from '../command/tags';
import { useComboboxContext } from './ComboboxContext';

export type ComboboxInputProps<T extends ValidComponent = 'input'> =
  HeadlessPropsWithRef<T>;

export function ComboboxInput<T extends ValidComponent = 'input'>(
  props: ComboboxInputProps<T>,
): JSX.Element {
  const context = useComboboxContext('ComboboxInput');
  const autocompleteState = useAutocompleteState();
  const disclosureState = useDisclosureState();
  const [internalRef, setInternalRef] = createForwardRef(props);

  const isDisabled = (): boolean | undefined =>
    autocompleteState.disabled() || props.disabled;

  createEffect(internalRef, current => {
    if (current instanceof HTMLElement) {
      context.anchor = current;

      return mergeFunc(
        current instanceof HTMLInputElement &&
          useEventListener(current, 'input', () => {
            if (!isDisabled()) {
              autocompleteState.setQuery(current.value);
            }
          }),
        useEventListener(current, 'keydown', e => {
          if (!isDisabled()) {
            switch (e.key) {
              case 'Escape': {
                disclosureState.close();
                break;
              }
              case 'ArrowUp': {
                e.preventDefault();
                if (disclosureState.isOpen()) {
                  context.controller.setPrevChecked(true);
                } else {
                  disclosureState.open();
                }
                break;
              }
              case 'ArrowDown': {
                e.preventDefault();
                if (disclosureState.isOpen()) {
                  context.controller.setNextChecked(true);
                } else {
                  disclosureState.open();
                }
                break;
              }
              case 'Enter': {
                e.preventDefault();
                if (disclosureState.isOpen()) {
                  context.selectedDescendant = context.activeDescendant;
                }
                break;
              }
              default:
                break;
            }
          }
        }),
        useEventListener(current, 'click', () => {
          if (!isDisabled()) {
            disclosureState.toggle();
          }
        }),
        useEventListener(current, 'blur', e => {
          if (context.optionsHovering) {
            return;
          }
          autocompleteState.blur();
          if (!(e.relatedTarget && current.contains(e.relatedTarget as Node))) {
            disclosureState.close();
          }
        }),
        useEventListener(current, 'mouseenter', () => {
          context.inputHovering = true;
        }),
        useEventListener(current, 'mouseleave', () => {
          context.inputHovering = false;
        }),
      );
    }
    return undefined;
  });

  createEffect(
    () => autocompleteState.query(),
    query => {
      if (query !== '') {
        if (disclosureState.isOpen()) {
          context.controller.setFirstChecked();
        } else {
          disclosureState.open();
        }
      }
    },
  );

  createEffect(
    () => context.activeDescendant,
    activeDescendant => {
      if (activeDescendant) {
        const current = document.getElementById(activeDescendant);
        if (current) {
          context.controller.setCurrent(current);
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
        'aria-haspopup': 'listbox',
        'aria-controls': context.optionsID,
        'aria-labelledby': context.labelID,

        get 'aria-expanded'() {
          return disclosureState.isOpen();
        },
        get 'aria-activedescendant'() {
          return context.activeDescendant;
        },
      },
      createDisabledState(isDisabled),
      createARIADisabledState(isDisabled),
      createExpandedState(() => disclosureState.isOpen()),
      createARIAExpandedState(() => disclosureState.isOpen()),
      createHasSelectedState(() => autocompleteState.hasSelected()),
      createHasActiveState(() => autocompleteState.hasActive()),
      createHasQueryState(() => autocompleteState.hasQuery()),
      omitProps(props, ['as', 'ref']),
    ) as DynamicProps<T>,
  );
}
