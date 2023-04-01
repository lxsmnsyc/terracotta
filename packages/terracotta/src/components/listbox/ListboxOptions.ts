import {
  createEffect,
  onCleanup,
  JSX,
  createComponent,
  mergeProps,
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
  createDisabled,
} from '../../utils/state-props';
import {
  useListboxContext,
} from './ListboxContext';
import {
  createListboxOptionsFocusNavigator,
  ListboxOptionsContext,
} from './ListboxOptionsContext';
import { LISTBOX_OPTIONS_TAG } from './tags';
import { SelectStateProvider, SelectStateRenderProps, useSelectState } from '../../states/create-select-state';
import { useDisclosureState } from '../../states/create-disclosure-state';

export type ListboxOptionsProps<V, T extends ValidConstructor = 'ul'> =
  HeadlessPropsWithRef<T, SelectStateRenderProps<V>>;

export function ListboxOptions<V, T extends ValidConstructor = 'ul'>(
  props: ListboxOptionsProps<V, T>,
): JSX.Element {
  const context = useListboxContext('ListboxOptions');
  const selectState = useSelectState();
  const disclosureState = useDisclosureState();

  const [internalRef, setInternalRef] = createForwardRef(props);

  const controller = createListboxOptionsFocusNavigator(context.optionsID);

  createEffect(() => {
    if (!selectState.hasSelected()) {
      controller.setFirstChecked();
    }
  });

  createEffect(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      controller.setRef(ref);
      const onBlur = (e: FocusEvent) => {
        if (context.hovering) {
          return;
        }
        if (!e.relatedTarget || !ref.contains(e.relatedTarget as Node)) {
          disclosureState.setState(false);
        }
      };
      ref.addEventListener('focusout', onBlur);
      onCleanup(() => {
        ref.removeEventListener('focusout', onBlur);
      });
    }
  });

  return createComponent(ListboxOptionsContext.Provider, {
    value: controller,
    get children() {
      return createDynamic(
        () => props.as || ('ul' as T),
        mergeProps(
          omitProps(props, [
            'as',
            'children',
            'ref',
          ]),
          LISTBOX_OPTIONS_TAG,
          {
            id: context.optionsID,
            role: 'listbox',
            'aria-multiselectable': context.multiple,
            'aria-labelledby': context.buttonID,
            ref: setInternalRef,
            get 'aria-orientation'() {
              return context.horizontal ? 'horizontal' : 'vertical';
            },
            get tabindex() {
              return selectState.disabled() ? -1 : 0;
            },
          },
          createDisabled(() => selectState.disabled()),
          {
            get children() {
              return createComponent(SelectStateProvider, {
                state: selectState,
                get children() {
                  return props.children;
                },
              });
            },
          },
        ) as DynamicProps<T>,
      );
    },
  });
}
