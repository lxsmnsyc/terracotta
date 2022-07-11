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
  HeadlessSelectMultipleControlledOptions,
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
} from './AccordionContext';
import AccordionController from './AccordionController';

type AccordionMultipleControlledBaseProps<V> =
  & HeadlessSelectMultipleControlledOptions<V>
  & HeadlessSelectRootChildren<V>;

export type AccordionMultipleControlledProps<V, T extends ValidConstructor = 'div'> =
  HeadlessPropsWithRef<T, AccordionMultipleControlledBaseProps<V>>;

export function AccordionMultipleControlled<V, T extends ValidConstructor = 'div'>(
  props: AccordionMultipleControlledProps<V, T>,
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
            'value',
            'multiple',
            'ref',
          ]),
          {
            'data-sh-accordion': controller.getId(),
            ref: createRef(props, (e) => {
              controller.setRef(e);
            }),
            get children() {
              return createComponent(HeadlessSelectRoot, {
                multiple: true,
                get value() {
                  return props.value;
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
          createDisabled(() => props.disabled),
        ) as DynamicProps<T>,
      );
    },
  });
}
