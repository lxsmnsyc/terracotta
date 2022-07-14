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
  HeadlessSelectMultipleControlledOptions,
  createHeadlessSelectRootMultipleControlledProps,
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
import { ACCORDION_TAG } from './tags';

type AccordionMultipleControlledBaseProps<V> =
  & HeadlessSelectMultipleControlledOptions<V>
  & HeadlessSelectRootChildren<V>;

export type AccordionMultipleControlledProps<V, T extends ValidConstructor = 'div'> =
  HeadlessPropsWithRef<T, AccordionMultipleControlledBaseProps<V>>;

export function AccordionMultipleControlled<V, T extends ValidConstructor = 'div'>(
  props: AccordionMultipleControlledProps<V, T>,
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
            'multiple',
            'ref',
          ]),
          ACCORDION_TAG,
          {
            ref: createRef(props, (e) => {
              controller.setRef(e);
            }),
          },
          createDisabled(() => props.disabled),
          createHeadlessSelectRootMultipleControlledProps(props),
        ) as DynamicProps<T>,
      );
    },
  });
}
