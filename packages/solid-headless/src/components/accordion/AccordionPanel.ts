import {
  Show,
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
  useAccordionItemContext,
} from './AccordionItemContext';

interface AccordionPanelBaseProps extends HeadlessSelectOptionChildProps {
  unmount?: boolean;
}

export type AccordionPanelProps<T extends ValidConstructor = 'div'> =
  HeadlessProps<T, AccordionPanelBaseProps>;

export function AccordionPanel<T extends ValidConstructor = 'div'>(
  props: AccordionPanelProps<T>,
): JSX.Element {
  const context = useAccordionItemContext('AccordionPanel');
  const properties = useHeadlessSelectOptionProperties();

  function renderChildren() {
    return createDynamic(
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
    );
  }

  return createComponent(Show, {
    get when() {
      return props.unmount ?? true;
    },
    get fallback() {
      return renderChildren();
    },
    get children() {
      return createComponent(Show, {
        get when() {
          return properties.isSelected();
        },
        get children() {
          return renderChildren();
        },
      });
    },
  });
}
