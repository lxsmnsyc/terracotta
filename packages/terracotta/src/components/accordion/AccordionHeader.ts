import type { JSX } from 'solid-js';
import { createComponent, mergeProps } from 'solid-js';
import { omitProps } from 'solid-use/props';
import type { SelectOptionStateRenderProps } from '../../states/create-select-option-state';
import {
  SelectOptionStateChild,
  useSelectOptionState,
} from '../../states/create-select-option-state';
import createDynamic from '../../utils/create-dynamic';
import type {
  DynamicProps,
  HeadlessProps,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  createActiveState,
  createDisabledState,
  createExpandedState,
  createSelectedState,
} from '../../utils/state-props';
import { useAccordionItemContext } from './AccordionItemContext';
import { ACCORDION_HEADER_TAG } from './tags';

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
      omitProps(props, ['as', 'children']),
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
