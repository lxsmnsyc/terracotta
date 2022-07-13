import {
  createSignal,
  createEffect,
  onCleanup,
  JSX,
  createComponent,
  mergeProps,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use';
import {
  useHeadlessDisclosureProperties,
} from '../../headless/disclosure';
import {
  HeadlessSelectChildProps,
  HeadlessSelectChild,
  useHeadlessSelectProperties,
} from '../../headless/select';
import createDynamic from '../../utils/create-dynamic';
import {
  createRef,
  DynamicNode,
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

export type ListboxOptionsProps<V, T extends ValidConstructor = 'ul'> =
  HeadlessPropsWithRef<T, HeadlessSelectChildProps<V>>;

export function ListboxOptions<V, T extends ValidConstructor = 'ul'>(
  props: ListboxOptionsProps<V, T>,
): JSX.Element {
  const context = useListboxContext('ListboxOptions');
  const selectProperties = useHeadlessSelectProperties();
  const properties = useHeadlessDisclosureProperties();

  const [internalRef, setInternalRef] = createSignal<DynamicNode<T>>();

  const controller = createListboxOptionsFocusNavigator(context.ownerID);

  createEffect(() => {
    if (!selectProperties.hasSelected()) {
      controller.setFirstChecked();
    }
  });

  createEffect(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const onBlur = (e: FocusEvent) => {
        if (context.hovering) {
          return;
        }
        if (!e.relatedTarget || !ref.contains(e.relatedTarget as Node)) {
          properties.setState(false);
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
        () => props.as ?? ('ul' as T),
        mergeProps(
          omitProps(props, [
            'as',
            'children',
            'ref',
          ]),
          {
            id: context.optionsID,
            role: 'listbox',
            'aria-multiselectable': context.multiple,
            'aria-labelledby': context.buttonID,
            'data-sh-listbox-options': context.ownerID,
            tabindex: 0,
            ref: createRef(props, (e) => {
              setInternalRef(() => e);
              controller.setRef(e);
            }),
            get 'aria-orientation'() {
              return context.horizontal ? 'horizontal' : 'vertical';
            },
          },
          createDisabled(() => properties.disabled() || props.disabled),
          {
            get children() {
              return createComponent(HeadlessSelectChild, {
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
