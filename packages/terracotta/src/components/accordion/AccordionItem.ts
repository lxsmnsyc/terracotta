import {
  createComponent,
  createUniqueId,
  JSX,
  mergeProps,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use/props';
import createDynamic from '../../utils/create-dynamic';
import {
  ValidConstructor,
  HeadlessProps,
  DynamicProps,
} from '../../utils/dynamic-prop';
import {
  createDisabledState,
} from '../../utils/state-props';
import { useAccordionContext } from './AccordionContext';
import {
  AccordionItemContext,
} from './AccordionItemContext';
import { ACCORDION_ITEM_TAG } from './tags';
import {
  createSelectOptionState,
  SelectOptionStateOptions,
  SelectOptionStateProvider,
  SelectOptionStateRenderProps,
} from '../../states/create-select-option-state';
import { Prettify } from '../../utils/types';

export type AccordionItemprops<V> = Prettify<
  & SelectOptionStateOptions<V>
  & SelectOptionStateRenderProps
>;

export type AccordionItemProps<V, T extends ValidConstructor = 'div'> =
  HeadlessProps<T, AccordionItemprops<V>>;

export function AccordionItem<V, T extends ValidConstructor = 'div'>(
  props: AccordionItemProps<V, T>,
): JSX.Element {
  useAccordionContext('AccordionItem');
  const buttonID = createUniqueId();
  const panelID = createUniqueId();
  const state = createSelectOptionState(props);

  return createComponent(AccordionItemContext.Provider, {
    value: { buttonID, panelID },
    get children() {
      return createDynamic(
        () => props.as || ('div' as T),
        mergeProps(
          omitProps(props, [
            'as',
            'children',
            'value',
            'disabled',
          ]),
          ACCORDION_ITEM_TAG,
          createDisabledState(() => state.disabled()),
          {
            get children() {
              return createComponent(SelectOptionStateProvider, {
                state,
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
