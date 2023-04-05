import {
  JSX,
  createEffect,
  mergeProps,
  onCleanup,
} from 'solid-js';
import { omitProps } from 'solid-use/props';
import {
  DynamicProps,
  HeadlessPropsWithRef,
  ValidConstructor,
  createForwardRef,
} from '../../utils/dynamic-prop';
import { useCommandContext } from './CommandContext';
import createDynamic from '../../utils/create-dynamic';
import { useAutocompleteState } from '../../states/create-autocomplete-state';
import { SELECTED_NODE } from '../../utils/namespace';
import {
  createDisabledState,
  createHasActiveState,
  createHasQueryState,
  createHasSelectedState,
} from '../../utils/state-props';
import { COMMAND_INPUT_TAG } from './tags';

export type CommandInputProps<T extends ValidConstructor = 'input'> =
  HeadlessPropsWithRef<T>;

export function CommandInput<T extends ValidConstructor = 'input'>(
  props: CommandInputProps<T>,
): JSX.Element {
  const context = useCommandContext('CommandInput');
  const state = useAutocompleteState();
  const [internalRef, setInternalRef] = createForwardRef(props);

  const isDisabled = () => state.disabled() || props.disabled;

  createEffect(() => {
    const current = internalRef();
    if (current instanceof HTMLElement) {
      if (current instanceof HTMLInputElement) {
        const onInput = () => {
          if (!isDisabled()) {
            state.setQuery(current.value);
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
            case 'ArrowUp':
              e.preventDefault();
              context.controller.setPrevChecked(true);
              break;
            case 'ArrowDown':
              e.preventDefault();
              context.controller.setNextChecked(true);
              break;
            case 'Home':
              e.preventDefault();
              context.controller.setFirstChecked();
              break;
            case 'End':
              e.preventDefault();
              context.controller.setLastChecked();
              break;
            case 'Enter':
              e.preventDefault();
              context.selectedDescendant = context.activeDescendant;
              break;
            default:
              break;
          }
        }
      };
      const onFocus = () => {
        if (!state.hasSelected()) {
          context.controller.setFirstChecked();
        } else {
          context.controller.setFirstChecked(SELECTED_NODE);
        }
      };
      const onBlur = () => {
        state.blur();
      };
      current.addEventListener('keydown', onKeyDown);
      current.addEventListener('focus', onFocus);
      current.addEventListener('blur', onBlur);
      onCleanup(() => {
        current.removeEventListener('keydown', onKeyDown);
        current.removeEventListener('focus', onFocus);
        current.removeEventListener('blur', onBlur);
      });
    }
  });

  createEffect(() => {
    if (state.query() !== '') {
      context.controller.setFirstChecked();
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
        'aria-labelledby': context.labelID,
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
      createHasSelectedState(() => state.hasSelected()),
      createHasActiveState(() => state.hasActive()),
      createHasQueryState(() => state.hasQuery()),
    ) as DynamicProps<T>,
  );
}
