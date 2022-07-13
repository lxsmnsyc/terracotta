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
  createHeadlessSelectOptionProps,
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
import { useAccordionContext } from './AccordionContext';
import {
  AccordionItemContext,
} from './AccordionItemContext';
import { ACCORDION_ITEM_TAG } from './tags';

export type AccordionItemProps<V, T extends ValidConstructor = 'div'> =
  HeadlessProps<T, HeadlessSelectOptionProps<V>>;

export function AccordionItem<V, T extends ValidConstructor = 'div'>(
  props: AccordionItemProps<V, T>,
): JSX.Element {
  useAccordionContext('AccordionItem');
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
          ACCORDION_ITEM_TAG,
          createDisabled(() => props.disabled),
          createHeadlessSelectOptionProps(props),
        ) as DynamicProps<T>,
      );
    },
  });
}
