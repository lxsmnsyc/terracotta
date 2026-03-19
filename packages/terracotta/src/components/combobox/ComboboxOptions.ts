import { createDynamic } from '@solidjs/web';
import type { ComponentProps, JSX, ValidComponent } from 'solid-js';
import { createComponent, createEffect, merge } from 'solid-js';
import { omitProps } from 'solid-use/props';
import type { AutocompleteStateRenderProps } from '../../states/create-autocomplete-state';
import {
  AutocompleteStateChild,
  useAutocompleteState,
} from '../../states/create-autocomplete-state';
import { useDisclosureState } from '../../states/create-disclosure-state';
import type { UnmountableProps } from '../../utils/create-unmountable';
import { createUnmountable } from '../../utils/create-unmountable';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import { mergeFunc } from '../../utils/merge-func';
import { SELECTED_NODE } from '../../utils/namespace';
import {
  createARIADisabledState,
  createDisabledState,
  createExpandedState,
  createHasActiveState,
  createHasQueryState,
  createHasSelectedState,
} from '../../utils/state-props';
import type { Prettify } from '../../utils/types';
import useEventListener from '../../utils/use-event-listener';
import { useComboboxContext } from './ComboboxContext';
import { COMBOBOX_OPTIONS_TAG } from './tags';

export type ComboboxOptionsBaseProps<V> = Prettify<
  UnmountableProps & AutocompleteStateRenderProps<V>
>;

export type ComboboxOptionsProps<
  V,
  T extends ValidComponent = 'ul',
> = HeadlessPropsWithRef<T, ComboboxOptionsBaseProps<V>>;

export function ComboboxOptions<V, T extends ValidComponent = 'ul'>(
  props: ComboboxOptionsProps<V, T>,
): JSX.Element {
  const context = useComboboxContext('ComboboxOptions');
  const autocompleteState = useAutocompleteState();
  const disclosureState = useDisclosureState();

  const [internalRef, setInternalRef] = createForwardRef(props);

  createEffect(internalRef, current => {
    if (current instanceof HTMLElement) {
      context.controller.setRef(current);
      return mergeFunc(
        () => {
          context.controller.clearRef();
        },
        useEventListener(current, 'focusin', () => {
          if (context.anchor) {
            context.anchor.focus();
          }
        }),
        useEventListener(current, 'mouseenter', () => {
          context.optionsHovering = true;
        }),
        useEventListener(current, 'mouseleave', () => {
          context.optionsHovering = false;
        }),
      );
    }
    return undefined;
  });

  createEffect(
    () => !disclosureState.isOpen(),
    value => {
      if (value) {
        setInternalRef(undefined);
      }
    },
  );

  // TODO check timing
  createEffect(
    () => disclosureState.isOpen(),
    value => {
      if (value) {
        if (autocompleteState.hasSelected()) {
          context.controller.setFirstChecked(SELECTED_NODE);
        } else {
          context.controller.setFirstChecked();
        }
      }
    },
  );

  return createUnmountable(
    props,
    () => disclosureState.isOpen(),
    () =>
      createDynamic(
        () => props.as || ('ul' as T),
        merge(
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
          omitProps(props, ['as', 'children', 'ref']),
          {
            get children() {
              return createComponent(AutocompleteStateChild, {
                get children() {
                  return props.children;
                },
              });
            },
          },
        ) as ComponentProps<T>,
      ),
  );
}
