import {
  createComponent,
  JSX,
  mergeProps,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use';
import {
  HeadlessSelectRootChildren,
  HeadlessSelectSingleControlledOptions,
  createHeadlessSelectRootSingleControlledProps,
} from '../../headless/select';
import createDynamic from '../../utils/create-dynamic';
import {
  createRef,
  ValidConstructor,
  HeadlessPropsWithRef,
  DynamicProps,
} from '../../utils/dynamic-prop';
import {
  createDisabled,
} from '../../utils/state-props';
import {
  AccordionContext,
  createAccordionFocusNavigator,
} from './AccordionContext';

export type AccordionSingleControlledBaseProps<V> =
  & HeadlessSelectSingleControlledOptions<V>
  & HeadlessSelectRootChildren<V>;

export type AccordionSingleControlledProps<V, T extends ValidConstructor = 'div'> =
  HeadlessPropsWithRef<T, AccordionSingleControlledBaseProps<V>>;

export function AccordionSingleControlled<V, T extends ValidConstructor = 'div'>(
  props: AccordionSingleControlledProps<V, T>,
): JSX.Element {
  const controller = createAccordionFocusNavigator();

  return createComponent(AccordionContext.Provider, {
    value: controller,
    get children() {
      return createDynamic(
        () => props.as ?? ('div' as T),
        mergeProps(
          omitProps(props, [
            'as',
            'children',
            'disabled',
            'onChange',
            'toggleable',
            'value',
            'ref',
          ]),
          {
            'data-sh-accordion': controller.getId(),
            ref: createRef(props, (e) => {
              controller.setRef(e);
            }),
          },
          createDisabled(() => props.disabled),
          createHeadlessSelectRootSingleControlledProps(props),
        ) as DynamicProps<T>,
      );
    },
  });
}
