import {
  createComponent,
  createEffect,
  createMemo,
  JSX,
  mergeProps,
} from 'solid-js';
import { omitProps } from 'solid-use/props';
import {
  createForwardRef,
  DynamicProps,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import { Prettify } from '../../utils/types';
import {
  createMultipleSelectState,
  createSingleSelectState,
  MultipleSelectStateControlledOptions,
  MultipleSelectStateUncontrolledOptions,
  SelectStateProvider,
  SelectStateRenderProps,
  SingleSelectStateControlledOptions,
  SingleSelectStateUncontrolledOptions,
} from '../../states/create-select-state';
import { AccordionContext, createAccordionFocusNavigator } from './AccordionContext';
import createDynamic from '../../utils/create-dynamic';
import { ACCORDION_TAG } from './tags';
import { createDisabled } from '../../utils/state-props';

export type AccordionSingleControlledBaseProps<V> = Prettify<
  & SingleSelectStateControlledOptions<V>
  & SelectStateRenderProps<V>
>;

export type AccordionSingleControlledProps<V, T extends ValidConstructor = 'div'> =
  HeadlessPropsWithRef<T, AccordionSingleControlledBaseProps<V>>;

export type AccordionSingleUncontrolledBaseProps<V> = Prettify<
  & SingleSelectStateUncontrolledOptions<V>
  & SelectStateRenderProps<V>
>;

export type AccordionSingleUncontrolledProps<V, T extends ValidConstructor = 'div'> =
  HeadlessPropsWithRef<T, AccordionSingleUncontrolledBaseProps<V>>;

export type AccordionMultipleControlledBaseProps<V> = Prettify<
  & MultipleSelectStateControlledOptions<V>
  & SelectStateRenderProps<V>
>;

export type AccordionMultipleControlledProps<V, T extends ValidConstructor = 'div'> =
  HeadlessPropsWithRef<T, AccordionMultipleControlledBaseProps<V>>;

export type AccordionMultipleUncontrolledBaseProps<V> = Prettify<
  & MultipleSelectStateUncontrolledOptions<V>
  & SelectStateRenderProps<V>
>;

export type AccordionMultipleUncontrolledProps<V, T extends ValidConstructor = 'div'> =
  HeadlessPropsWithRef<T, AccordionMultipleUncontrolledBaseProps<V>>;

export type AccordionProps<V, T extends ValidConstructor = 'div'> =
  | AccordionSingleControlledProps<V, T>
  | AccordionSingleUncontrolledProps<V, T>
  | AccordionMultipleControlledProps<V, T>
  | AccordionMultipleUncontrolledProps<V, T>;

function isAccordionUncontrolled<V, T extends ValidConstructor = 'div'>(
  props: AccordionProps<V, T>,
): props is AccordionSingleUncontrolledProps<V, T> | AccordionMultipleUncontrolledProps<V, T> {
  return 'defaultValue' in props;
}

function isAccordionMultiple<V, T extends ValidConstructor = 'div'>(
  props: AccordionProps<V, T>,
): props is AccordionMultipleUncontrolledProps<V, T> | AccordionMultipleControlledProps<V, T> {
  return !!props.multiple;
}

export function Accordion<V, T extends ValidConstructor = 'div'>(
  props: AccordionProps<V, T>,
): JSX.Element {
  return createMemo(() => {
    const state = isAccordionMultiple(props)
      ? createMultipleSelectState(props)
      : createSingleSelectState(props);
    const controller = createAccordionFocusNavigator();
    const [ref, setRef] = createForwardRef(props);

    createEffect(() => {
      const current = ref();
      if (current) {
        controller.setRef(current);
      }
    });

    return createComponent(AccordionContext.Provider, {
      value: controller,
      get children() {
        return createDynamic(
          () => props.as || ('div' as T),
          mergeProps(
            isAccordionUncontrolled(props)
              ? omitProps(props, [
                'as',
                'by',
                'children',
                'defaultValue',
                'disabled',
                'multiple',
                'onChange',
                'ref',
                'toggleable',
              ])
              : omitProps(props, [
                'as',
                'by',
                'children',
                'value',
                'disabled',
                'multiple',
                'onChange',
                'ref',
                'toggleable',
              ]),
            ACCORDION_TAG,
            {
              ref: setRef,
            },
            createDisabled(() => state.disabled()),
            {
              get children() {
                return createComponent(SelectStateProvider, {
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
  }) as unknown as JSX.Element;
}