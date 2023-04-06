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
import {
  createUnmountable,
  UnmountableProps,
} from '../../utils/create-unmountable';
import {
  useAccordionItemContext,
} from './AccordionItemContext';
import { ACCORDION_PANEL_TAG } from './tags';
import { SelectOptionStateChild, SelectOptionStateRenderProps, useSelectOptionState } from '../../states/create-select-option-state';
import { Prettify } from '../../utils/types';
import {
  createDisabledState,
  createSelectedState,
  createExpandedState,
  createActiveState,
} from '../../utils/state-props';

export type AccordionPanelBaseProps = Prettify<
  & SelectOptionStateRenderProps
  & UnmountableProps
>;

export type AccordionPanelProps<T extends ValidConstructor = 'div'> =
  HeadlessProps<T, AccordionPanelBaseProps>;

export function AccordionPanel<T extends ValidConstructor = 'div'>(
  props: AccordionPanelProps<T>,
): JSX.Element {
  const context = useAccordionItemContext('AccordionPanel');
  const state = useSelectOptionState();

  return createUnmountable(
    props,
    () => state.isSelected(),
    () => createDynamic(
      () => props.as || ('div' as T),
      mergeProps(
        omitProps(props, [
          'as',
          'children',
          'unmount',
        ]),
        ACCORDION_PANEL_TAG,
        {
          id: context.panelID,
          'aria-labelledby': context.buttonID,
        },
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
    ),
  );
}
