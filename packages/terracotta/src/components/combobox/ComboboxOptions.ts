import type { JSX } from 'solid-js';
import {
  createEffect,
  createComponent,
  mergeProps,
  untrack,
  onMount,
  onCleanup,
} from 'solid-js';
import { omitProps } from 'solid-use/props';
import createDynamic from '../../utils/create-dynamic';
import type {
  DynamicProps,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import { useComboboxContext } from './ComboboxContext';
import { COMBOBOX_OPTIONS_TAG } from './tags';
import {
  createDisabledState,
  createHasSelectedState,
  createHasActiveState,
  createHasQueryState,
  createExpandedState,
  createARIADisabledState,
} from '../../utils/state-props';
import type { AutocompleteStateRenderProps } from '../../states/create-autocomplete-state';
import {
  AutocompleteStateChild,
  useAutocompleteState,
} from '../../states/create-autocomplete-state';
import type { UnmountableProps } from '../../utils/create-unmountable';
import { createUnmountable } from '../../utils/create-unmountable';
import type { Prettify } from '../../utils/types';
import { useDisclosureState } from '../../states/create-disclosure-state';
import { SELECTED_NODE } from '../../utils/namespace';
import useEventListener from '../../utils/use-event-listener';

export type ComboboxOptionsBaseProps<V> = Prettify<
  UnmountableProps & AutocompleteStateRenderProps<V>
>;

export type ComboboxOptionsProps<
  V,
  T extends ValidConstructor = 'ul',
> = HeadlessPropsWithRef<T, ComboboxOptionsBaseProps<V>>;

export function ComboboxOptions<V, T extends ValidConstructor = 'ul'>(
  props: ComboboxOptionsProps<V, T>,
): JSX.Element {
  const context = useComboboxContext('ComboboxOptions');
  const autocompleteState = useAutocompleteState();
  const disclosureState = useDisclosureState();

  const [internalRef, setInternalRef] = createForwardRef(props);

  createEffect(() => {
    const current = internalRef();
    if (current instanceof HTMLElement) {
      context.controller.setRef(current);
      onCleanup(() => {
        context.controller.clearRef();
      });

      useEventListener(current, 'focusin', () => {
        if (context.anchor) {
          context.anchor.focus();
        }
      });
      useEventListener(current, 'mouseenter', () => {
        context.optionsHovering = true;
      });
      useEventListener(current, 'mouseleave', () => {
        context.optionsHovering = false;
      });
    }
  });

  createEffect(() => {
    if (!disclosureState.isOpen()) {
      setInternalRef(undefined);
    }
  });

  onMount(() => {
    createEffect(() => {
      if (disclosureState.isOpen()) {
        if (untrack(() => autocompleteState.hasSelected())) {
          context.controller.setFirstChecked(SELECTED_NODE);
        } else {
          context.controller.setFirstChecked();
        }
      }
    });
  });

  return createUnmountable(
    props,
    () => disclosureState.isOpen(),
    () =>
      createDynamic(
        () => props.as || ('ul' as T),
        mergeProps(
          omitProps(props, ['as', 'children', 'ref']),
          COMBOBOX_OPTIONS_TAG,
          {
            id: context.optionsID,
            role: 'listbox',
            'aria-multiselectable': context.multiple,
            ref: setInternalRef,
            // TODO should Combobox support "horizontal"?
            'aria-orientation': 'vertical',
            tabindex: -1,
          },
          createDisabledState(() => autocompleteState.disabled()),
          createARIADisabledState(() => autocompleteState.disabled()),
          createExpandedState(() => disclosureState.isOpen()),
          createHasSelectedState(() => autocompleteState.hasSelected()),
          createHasActiveState(() => autocompleteState.hasActive()),
          createHasQueryState(() => autocompleteState.hasQuery()),
          {
            get children() {
              return createComponent(AutocompleteStateChild, {
                get children() {
                  return props.children;
                },
              });
            },
          },
        ) as DynamicProps<T>,
      ),
  );
}
