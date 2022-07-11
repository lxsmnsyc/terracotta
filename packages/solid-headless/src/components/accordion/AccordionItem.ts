import {
  createComponent,
  createUniqueId,
  JSX,
  mergeProps,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use';
import {
  HeadlessSelectOption,
  HeadlessSelectOptionProps,
} from '../../headless/select';
import createDynamic from '../../utils/create-dynamic';
import {
  ValidConstructor,
  HeadlessProps,
  DynamicProps,
} from '../../utils/dynamic-prop';
import {
  createDisabled,
} from '../../utils/state-props';
import {
  AccordionItemContext,
} from './AccordionItemContext';

export type AccordionItemProps<V, T extends ValidConstructor = 'div'> =
  HeadlessProps<T, HeadlessSelectOptionProps<V>>;

export function AccordionItem<V, T extends ValidConstructor = 'div'>(
  props: AccordionItemProps<V, T>,
): JSX.Element {
  const buttonID = createUniqueId();
  const panelID = createUniqueId();

  return createComponent(AccordionItemContext.Provider, {
    value: { buttonID, panelID },
    get children() {
      return createDynamic(
        () => props.as ?? ('div' as T),
        mergeProps(
          omitProps(props, [
            'as',
            'children',
            'value',
            'disabled',
          ]),
          createDisabled(() => props.disabled),
          {
            get children() {
              return createComponent(HeadlessSelectOption, {
                get value() {
                  return props.value;
                },
                get disabled() {
                  return props.disabled;
                },
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
