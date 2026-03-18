import type { JSX, ValidComponent } from 'solid-js';
import {
  createComponent,
  createEffect,
  createMemo,
  merge,
  omit,
} from 'solid-js';
import type {
  MultipleSelectStateControlledOptions,
  MultipleSelectStateUncontrolledOptions,
  SelectStateRenderProps,
  SingleSelectStateControlledOptions,
  SingleSelectStateUncontrolledOptions,
} from '../../states/create-select-state';
import {
  createMultipleSelectState,
  createSingleSelectState,
  SelectStateProvider,
} from '../../states/create-select-state';
import createDynamic from '../../utils/create-dynamic';
import type {
  DynamicProps,
  HeadlessPropsWithRef,
} from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import {
  createARIADisabledState,
  createDisabledState,
  createHasActiveState,
  createHasSelectedState,
} from '../../utils/state-props';
import type { Prettify } from '../../utils/types';
import useEventListener from '../../utils/use-event-listener';
import {
  AccordionContext,
  createAccordionFocusNavigator,
} from './AccordionContext';
import { ACCORDION_TAG } from './tags';

export type AccordionSingleControlledBaseProps<V> = Prettify<
  SingleSelectStateControlledOptions<V> & SelectStateRenderProps<V>
>;

export type AccordionSingleControlledProps<
  V,
  T extends ValidComponent = 'div',
> = HeadlessPropsWithRef<T, AccordionSingleControlledBaseProps<V>>;

export type AccordionSingleUncontrolledBaseProps<V> = Prettify<
  SingleSelectStateUncontrolledOptions<V> & SelectStateRenderProps<V>
>;

export type AccordionSingleUncontrolledProps<
  V,
  T extends ValidComponent = 'div',
> = HeadlessPropsWithRef<T, AccordionSingleUncontrolledBaseProps<V>>;

export type AccordionMultipleControlledBaseProps<V> = Prettify<
  MultipleSelectStateControlledOptions<V> & SelectStateRenderProps<V>
>;

export type AccordionMultipleControlledProps<
  V,
  T extends ValidComponent = 'div',
> = HeadlessPropsWithRef<T, AccordionMultipleControlledBaseProps<V>>;

export type AccordionMultipleUncontrolledBaseProps<V> = Prettify<
  MultipleSelectStateUncontrolledOptions<V> & SelectStateRenderProps<V>
>;

export type AccordionMultipleUncontrolledProps<
  V,
  T extends ValidComponent = 'div',
> = HeadlessPropsWithRef<T, AccordionMultipleUncontrolledBaseProps<V>>;

export type AccordionProps<V, T extends ValidComponent = 'div'> =
  | AccordionSingleControlledProps<V, T>
  | AccordionSingleUncontrolledProps<V, T>
  | AccordionMultipleControlledProps<V, T>
  | AccordionMultipleUncontrolledProps<V, T>;

function isAccordionUncontrolled<V, T extends ValidComponent = 'div'>(
  props: AccordionProps<V, T>,
): props is
  | AccordionSingleUncontrolledProps<V, T>
  | AccordionMultipleUncontrolledProps<V, T> {
  return 'defaultValue' in props;
}

function isAccordionMultiple<V, T extends ValidComponent = 'div'>(
  props: AccordionProps<V, T>,
): props is
  | AccordionMultipleUncontrolledProps<V, T>
  | AccordionMultipleControlledProps<V, T> {
  return !!props.multiple;
}

export function Accordion<V, T extends ValidComponent = 'div'>(
  props: AccordionProps<V, T>,
): JSX.Element {
  return createMemo(() => {
    const state = isAccordionMultiple(props)
      ? createMultipleSelectState(props)
      : createSingleSelectState(props);
    const controller = createAccordionFocusNavigator();
    const [ref, setRef] = createForwardRef(props);

    createEffect(ref, current => {
      if (current instanceof HTMLElement) {
        controller.setRef(current);

        const cleanupKeydown = useEventListener(current, 'keydown', e => {
          if (!state.disabled()) {
            switch (e.key) {
              case 'ArrowUp': {
                e.preventDefault();
                controller.setPrevChecked(true);
                break;
              }
              case 'ArrowDown': {
                e.preventDefault();
                controller.setNextChecked(true);
                break;
              }
              case 'Home': {
                e.preventDefault();
                controller.setFirstChecked();
                break;
              }
              case 'End': {
                e.preventDefault();
                controller.setLastChecked();
                break;
              }
              default:
                break;
            }
          }
        });

        const cleanupFocusIn = useEventListener(current, 'focusin', e => {
          if (e.target && e.target !== current) {
            controller.setCurrent(e.target as HTMLElement);
          }
        });

        return () => {
          controller.clearRef();
          cleanupKeydown();
          cleanupFocusIn();
        };
      }
      return undefined;
    });

    return createComponent(AccordionContext, {
      value: controller,
      get children() {
        return createDynamic(
          () => props.as || ('div' as T),
          merge(
            isAccordionUncontrolled(props)
              ? omit(
                  props,
                  'as',
                  'by',
                  'children',
                  'defaultValue',
                  'disabled',
                  'multiple',
                  'onChange',
                  'ref',
                  'toggleable',
                )
              : omit(
                  props,
                  'as',
                  'by',
                  'children',
                  'value',
                  'disabled',
                  'multiple',
                  'onChange',
                  'ref',
                  'toggleable',
                ),
            ACCORDION_TAG,
            {
              ref: setRef,
              id: controller.getId(),
            },
            createDisabledState(() => state.disabled()),
            createARIADisabledState(() => state.disabled()),
            createHasSelectedState(() => state.hasSelected()),
            createHasActiveState(() => state.hasActive()),
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
