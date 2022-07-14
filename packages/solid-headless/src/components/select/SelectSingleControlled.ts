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
  HeadlessSelectSingleControlledOptions,
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

type SelectSingleControlledBaseProps<V> =
  & SelectBaseProps
  & HeadlessSelectSingleControlledOptions<V>
  & HeadlessSelectRootChildren<V>;

export type SelectSingleControlledProps<V, T extends ValidConstructor = 'ul'> =
  HeadlessPropsWithRef<T, SelectSingleControlledBaseProps<V>>;

export function SelectSingleControlled<V, T extends ValidConstructor = 'ul'>(
  props: SelectSingleControlledProps<V, T>,
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
            'value',
            'onChange',
            'horizontal',
            'disabled',
            'ref',
          ]),
          SELECT_TAG,
          {
            id: controller.getId(),
            role: 'listbox',
            'aria-multiselectable': false,
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
                onChange: props.onChange,
                get value() {
                  return props.value;
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
