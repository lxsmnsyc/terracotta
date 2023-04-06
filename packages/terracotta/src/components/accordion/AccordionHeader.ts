import {
  JSX,
  createComponent,
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
import { useAccordionItemContext } from './AccordionItemContext';
import { ACCORDION_HEADER_TAG } from './tags';
import {
  SelectOptionStateChild,
  SelectOptionStateRenderProps,
  useSelectOptionState,
} from '../../states/create-select-option-state';
import {
  createDisabledState,
  createSelectedState,
  createExpandedState,
  createActiveState,
} from '../../utils/state-props';

export type AccordionHeaderProps<T extends ValidConstructor = 'h3'> =
  HeadlessProps<T, SelectOptionStateRenderProps>;

export function AccordionHeader<T extends ValidConstructor = 'h3'>(
  props: AccordionHeaderProps<T>,
): JSX.Element {
  useAccordionItemContext('AccordionHeader');
  const state = useSelectOptionState();
  return createDynamic<T>(
    () => props.as || ('h3' as T),
    mergeProps(
      omitProps(props, [
        'as',
        'children',
      ]),
      ACCORDION_HEADER_TAG,
      createDisabledState(() => state.disabled()),
      createSelectedState(() => state.isSelected()),
      createExpandedState(() => state.isSelected()),
      createActiveState(() => state.isActive()),
      {
        get children() {
          return createComponent(SelectOptionStateChild, {
            get children() {
              return props.children;
            },
          });
        },
      },
    ) as DynamicProps<T>,
  );
}
