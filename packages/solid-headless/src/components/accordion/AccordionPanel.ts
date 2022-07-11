import {
  JSX,
  createComponent,
  mergeProps,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use';
import {
  HeadlessSelectOptionChild,
  HeadlessSelectOptionChildProps,
  useHeadlessSelectOptionProperties,
} from '../../headless/select';
import createDynamic from '../../utils/create-dynamic';
import {
  ValidConstructor,
  HeadlessProps,
  DynamicProps,
} from '../../utils/dynamic-prop';
import {
  createUnmountable,
  UnmountableProps,
} from '../../utils/Unmountable';
import {
  useAccordionItemContext,
} from './AccordionItemContext';

export type AccordionPanelProps<T extends ValidConstructor = 'div'> =
  HeadlessProps<T, HeadlessSelectOptionChildProps & UnmountableProps>;

export function AccordionPanel<T extends ValidConstructor = 'div'>(
  props: AccordionPanelProps<T>,
): JSX.Element {
  const context = useAccordionItemContext('AccordionPanel');
  const properties = useHeadlessSelectOptionProperties();

  return createUnmountable(
    props,
    () => properties.isSelected(),
    () => createDynamic(
      () => props.as ?? ('div' as T),
      mergeProps(
        omitProps(props, [
          'as',
          'children',
          'unmount',
        ]),
        {
          id: context.panelID,
          'aria-labelledby': context.buttonID,
          get children() {
            return createComponent(HeadlessSelectOptionChild, {
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
