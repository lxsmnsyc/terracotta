import {
  JSX,
  createEffect,
  mergeProps,
  onCleanup,
  untrack,
} from 'solid-js';
import { omitProps } from 'solid-use/props';
import {
  DynamicProps,
  HeadlessPropsWithRef,
  ValidConstructor,
  createForwardRef,
} from '../../utils/dynamic-prop';
import { useComboboxContext } from './ComboboxContext';
import createDynamic from '../../utils/create-dynamic';
import { useAutocompleteState } from '../../states/create-autocomplete-state';
import {
  createARIADisabledState,
  createARIAExpandedState,
  createDisabledState,
  createExpandedState,
  createHasActiveState,
  createHasQueryState,
  createHasSelectedState,
} from '../../utils/state-props';
import { COMMAND_INPUT_TAG } from '../command/tags';
import { useDisclosureState } from '../../states/create-disclosure-state';

export type ComboboxInputProps<T extends ValidConstructor = 'input'> =
  HeadlessPropsWithRef<T>;

export function ComboboxInput<T extends ValidConstructor = 'input'>(
  props: ComboboxInputProps<T>,
): JSX.Element {
  const context = useComboboxContext('ComboboxInput');
  const autocompleteState = useAutocompleteState();
  const disclosureState = useDisclosureState();
  const [internalRef, setInternalRef] = createForwardRef(props);

  const isDisabled = () => autocompleteState.disabled() || props.disabled;

  createEffect(() => {
    const current = internalRef();
    if (current instanceof HTMLElement) {
      context.anchor = current;

      if (current instanceof HTMLInputElement) {
        const onInput = () => {
          if (!isDisabled()) {
            autocompleteState.setQuery(current.value);
          }
        };
        current.addEventListener('input', onInput);
        onCleanup(() => {
          current.removeEventListener('input', onInput);
        });
      }

      const onKeyDown = (e: KeyboardEvent) => {
        if (!isDisabled()) {
          switch (e.key) {
            case 'Escape':
              disclosureState.close();
              break;
            case 'ArrowUp':
              e.preventDefault();
              if (disclosureState.isOpen()) {
                context.controller.setPrevChecked(true);
              } else {
                disclosureState.open();
              }
              break;
            case 'ArrowDown':
              e.preventDefault();
              if (disclosureState.isOpen()) {
                context.controller.setNextChecked(true);
              } else {
                disclosureState.open();
              }
              break;
            case 'Enter':
              e.preventDefault();
              if (disclosureState.isOpen()) {
                context.selectedDescendant = context.activeDescendant;
              }
              break;
            default:
              break;
          }
        }
      };

      const toggle = () => {
        if (!isDisabled()) {
          disclosureState.toggle();
        }
      };

      const onBlur = (e: FocusEvent) => {
        if (context.optionsHovering) {
          return;
        }
        autocompleteState.blur();
        if (!e.relatedTarget || !current.contains(e.relatedTarget as Node)) {
          disclosureState.close();
        }
      };

      current.addEventListener('click', toggle);
      current.addEventListener('keydown', onKeyDown);
      current.addEventListener('blur', onBlur);

      onCleanup(() => {
        current.removeEventListener('click', toggle);
        current.removeEventListener('keydown', onKeyDown);
        current.removeEventListener('blur', onBlur);
      });

      const onMouseEnter = () => {
        context.inputHovering = true;
      };
      const onMouseLeave = () => {
        context.inputHovering = false;
      };

      current.addEventListener('mouseenter', onMouseEnter);
      current.addEventListener('mouseleave', onMouseLeave);
      onCleanup(() => {
        current.removeEventListener('mouseenter', onMouseEnter);
        current.removeEventListener('mouseleave', onMouseLeave);
      });
    }
  });

  createEffect(() => {
    if (autocompleteState.query() !== '') {
      if (untrack(() => disclosureState.isOpen())) {
        context.controller.setFirstChecked();
      } else {
        disclosureState.open();
      }
    }
  });

  createEffect(() => {
    if (context.activeDescendant) {
      const current = document.getElementById(context.activeDescendant);
      if (current) {
        context.controller.setCurrent(current);
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
      COMMAND_INPUT_TAG,
      createDisabledState(isDisabled),
      createARIADisabledState(isDisabled),
      createExpandedState(() => disclosureState.isOpen()),
      createARIAExpandedState(() => disclosureState.isOpen()),
      createHasSelectedState(() => autocompleteState.hasSelected()),
      createHasActiveState(() => autocompleteState.hasActive()),
      createHasQueryState(() => autocompleteState.hasQuery()),
    ) as DynamicProps<T>,
  );
}
