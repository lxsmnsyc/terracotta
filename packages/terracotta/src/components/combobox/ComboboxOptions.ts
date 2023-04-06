import {
  createEffect,
  JSX,
  createComponent,
  mergeProps,
  untrack,
  onMount,
  onCleanup,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use/props';
import createDynamic from '../../utils/create-dynamic';
import {
  createForwardRef,
  DynamicProps,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  useComboboxContext,
} from './ComboboxContext';
import { COMBOBOX_OPTIONS_TAG } from './tags';
import {
  createDisabledState,
  createHasSelectedState,
  createHasActiveState,
  createHasQueryState,
  createExpandedState,
  createARIADisabledState,
} from '../../utils/state-props';
import {
  AutocompleteStateChild,
  AutocompleteStateRenderProps,
  useAutocompleteState,
} from '../../states/create-autocomplete-state';
import { UnmountableProps, createUnmountable } from '../../utils/create-unmountable';
import { Prettify } from '../../utils/types';
import { useDisclosureState } from '../../states/create-disclosure-state';
import { SELECTED_NODE } from '../../utils/namespace';

export type ComboboxOptionsBaseProps<V> = Prettify<
  & UnmountableProps
  & AutocompleteStateRenderProps<V>
>;

export type ComboboxOptionsProps<V, T extends ValidConstructor = 'ul'> =
  HeadlessPropsWithRef<T, ComboboxOptionsBaseProps<V>>;

export function ComboboxOptions<V, T extends ValidConstructor = 'ul'>(
  props: ComboboxOptionsProps<V, T>,
): JSX.Element {
  const context = useComboboxContext('ComboboxOptions');
  const autocompleteState = useAutocompleteState();
  const disclosureState = useDisclosureState();

  const [internalRef, setInternalRef] = createForwardRef(props);

  createEffect(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      context.controller.setRef(ref);

      const onMouseEnter = () => {
        context.hovering = true;
      };
      const onMouseLeave = () => {
        context.hovering = false;
      };

      ref.addEventListener('mouseenter', onMouseEnter);
      ref.addEventListener('mouseleave', onMouseLeave);
      onCleanup(() => {
        ref.removeEventListener('mouseenter', onMouseEnter);
        ref.removeEventListener('mouseleave', onMouseLeave);
      });

      onCleanup(() => {
        context.controller.clearRef();
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
        if (!untrack(() => autocompleteState.hasSelected())) {
          context.controller.setFirstChecked();
        } else {
          context.controller.setFirstChecked(SELECTED_NODE);
        }
      }
    });
  });

  return createUnmountable(
    props,
    () => disclosureState.isOpen(),
    () => createDynamic(
      () => props.as || ('ul' as T),
      mergeProps(
        omitProps(props, [
          'as',
          'children',
          'ref',
        ]),
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
