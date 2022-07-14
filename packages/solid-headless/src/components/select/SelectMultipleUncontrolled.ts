import {
  createComponent,
  JSX,
  mergeProps,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use';
import {
  SelectBaseProps,
} from './types';
import {
  HeadlessSelectMultipleUncontrolledOptions,
  HeadlessSelectRoot,
  HeadlessSelectRootChildren,
  HeadlessSelectRootProps,
} from '../../headless/select';
import {
  createRef,
  DynamicProps,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  createSelectOptionFocusNavigator,
  SelectContext,
} from './SelectContext';
import createDynamic from '../../utils/create-dynamic';
import { createDisabled } from '../../utils/state-props';
import { SELECT_TAG } from './tags';

type SelectMultipleUncontrolledBaseProps<V> =
  & SelectBaseProps
  & HeadlessSelectMultipleUncontrolledOptions<V>
  & HeadlessSelectRootChildren<V>;

export type SelectMultipleUncontrolledProps<V, T extends ValidConstructor = 'ul'> =
  HeadlessPropsWithRef<T, SelectMultipleUncontrolledBaseProps<V>>;

export function SelectMultipleUncontrolled<V, T extends ValidConstructor = 'ul'>(
  props: SelectMultipleUncontrolledProps<V, T>,
): JSX.Element {
  const controller = createSelectOptionFocusNavigator();

  return createComponent(SelectContext.Provider, {
    value: {
      controller,
      get horizontal() {
        return !!props.horizontal;
      },
    },
    get children() {
      return createDynamic(
        () => props.as ?? ('ul' as T),
        mergeProps(
          omitProps(props, [
            'as',
            'children',
            'toggleable',
            'defaultValue',
            'onChange',
            'multiple',
            'horizontal',
            'disabled',
            'ref',
          ]),
          SELECT_TAG,
          {
            id: controller.getId(),
            role: 'listbox',
            'aria-multiselectable': true,
            ref: createRef(props, (e) => {
              controller.setRef(e);
            }),
            get 'aria-orientation'() {
              return props.horizontal ? 'horizontal' : 'vertical';
            },
          },
          createDisabled(() => props.disabled),
          {
            get children() {
              return createComponent(HeadlessSelectRoot, {
                multiple: true,
                onChange: props.onChange,
                get defaultValue() {
                  return props.defaultValue;
                },
                get toggleable() {
                  return props.toggleable;
                },
                get disabled() {
                  return props.disabled;
                },
                get children() {
                  return props.children;
                },
              } as HeadlessSelectRootProps<V>);
            },
          },
        ) as DynamicProps<T>,
      );
    },
  });
}
