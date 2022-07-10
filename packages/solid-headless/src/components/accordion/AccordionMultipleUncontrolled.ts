import {
  createComponent,
  JSX,
  mergeProps,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use';
import {
  HeadlessSelectRoot,
  HeadlessSelectRootChildren,
  HeadlessSelectRootProps,
} from '../../headless/select/HeadlessSelectRoot';
import {
  HeadlessSelectMultipleUncontrolledOptions,
} from '../../headless/select/useHeadlessSelectMultiple';
import createDynamic from '../../utils/create-dynamic';
import {
  createRef,
  ValidConstructor,
  HeadlessPropsWithRef,
  DynamicProps,
} from '../../utils/dynamic-prop';
import {
  AccordionContext,
} from './AccordionContext';
import AccordionController from './AccordionController';

export type AccordionMultipleUncontrolledBaseProps<V> =
  & HeadlessSelectMultipleUncontrolledOptions<V>
  & HeadlessSelectRootChildren<V>;

export type AccordionMultipleUncontrolledProps<V, T extends ValidConstructor = 'div'> =
  HeadlessPropsWithRef<T, AccordionMultipleUncontrolledBaseProps<V>>;

export function AccordionMultipleUncontrolled<V, T extends ValidConstructor = 'div'>(
  props: AccordionMultipleUncontrolledProps<V, T>,
): JSX.Element {
  const controller = new AccordionController<T>();

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
            'defaultValue',
            'multiple',
            'ref',
          ]),
          {
            'data-sh-accordion': controller.getId(),
            ref: createRef(props, (e) => {
              controller.setRef(e);
            }),
            get disabled() {
              return props.disabled;
            },
            get 'aria-disabled'() {
              return props.disabled;
            },
            get 'data-sh-disabled'() {
              return props.disabled;
            },
            get children() {
              return createComponent(HeadlessSelectRoot, {
                multiple: true,
                get defaultValue() {
                  return props.defaultValue;
                },
                get toggleable() {
                  return props.toggleable;
                },
                get disabled() {
                  return props.disabled;
                },
                onChange: props.onChange,
              } as HeadlessSelectRootProps<V>);
            },
          },
        ) as DynamicProps<T>,
      );
    },
  });
}
