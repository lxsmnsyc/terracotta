import { createDynamic } from '@solidjs/web';
import type { ComponentProps, JSX, ValidComponent } from 'solid-js';
import { createComponent, merge, omit } from 'solid-js';
import type { SelectOptionStateRenderProps } from '../../states/create-select-option-state';
import {
  SelectOptionStateChild,
  useSelectOptionState,
} from '../../states/create-select-option-state';
import type { HeadlessProps } from '../../utils/dynamic-prop';
import {
  createActiveState,
  createDisabledState,
  createExpandedState,
  createSelectedState,
} from '../../utils/state-props';
import { useAccordionItemContext } from './AccordionItemContext';
import { ACCORDION_HEADER_TAG } from './tags';

export type AccordionHeaderProps<T extends ValidComponent = 'h3'> =
  HeadlessProps<T, SelectOptionStateRenderProps>;

export function AccordionHeader<T extends ValidComponent = 'h3'>(
  props: AccordionHeaderProps<T>,
): JSX.Element {
  useAccordionItemContext('AccordionHeader');
  const state = useSelectOptionState();
  return createDynamic<T>(
    () => props.as || ('h3' as T),
    merge(
      omit(props, 'as', 'children'),
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
    ) as ComponentProps<T>,
  );
}
