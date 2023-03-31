import {
  createComponent,
  createRenderEffect,
  JSX,
  mergeProps,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use/props';
import {
  SelectBaseProps,
} from './types';
import {
  createForwardRef,
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
import {
  createMultipleSelectState,
  MultipleSelectStateControlledOptions,
  MultipleSelectStateUncontrolledOptions,
  SelectStateProvider,
  SelectStateRenderProps,
} from '../../states/create-select-state';
import { Prettify } from '../../utils/types';

export type MultipleSelectControlledBaseProps<V> = Prettify<
  & SelectBaseProps
  & MultipleSelectStateControlledOptions<V>
  & SelectStateRenderProps<V>
>;

export type MultipleSelectControlledProps<V, T extends ValidConstructor = 'ul'> =
  HeadlessPropsWithRef<T, MultipleSelectControlledBaseProps<V>>;

export type MultipleSelectUncontrolledBaseProps<V> = Prettify<
  & SelectBaseProps
  & MultipleSelectStateUncontrolledOptions<V>
  & SelectStateRenderProps<V>
>;

export type MultipleSelectUncontrolledProps<V, T extends ValidConstructor = 'ul'> =
  HeadlessPropsWithRef<T, MultipleSelectUncontrolledBaseProps<V>>;

export type MultipleSelectProps<V, T extends ValidConstructor = 'ul'> =
  | MultipleSelectControlledProps<V, T>
  | MultipleSelectUncontrolledProps<V, T>

function isMultipleSelectUncontrolled<V, T extends ValidConstructor = 'ul'>(
  props: MultipleSelectProps<V, T>,
): props is MultipleSelectUncontrolledProps<V, T> {
  return 'defaultValue' in props;
}

export function MultipleSelect<V, T extends ValidConstructor = 'ul'>(
  props: MultipleSelectProps<V, T>,
): JSX.Element {
  const controller = createSelectOptionFocusNavigator();
  const [ref, setRef] = createForwardRef(props);
  const state = createMultipleSelectState(props);

  createRenderEffect(() => {
    const current = ref();
    if (current) {
      controller.setRef(current);
    }
  });

  return createComponent(SelectContext.Provider, {
    value: {
      controller,
      get horizontal() {
        return !!props.horizontal;
      },
    },
    get children() {
      return createDynamic(
        () => props.as || ('ul' as T),
        mergeProps(
          isMultipleSelectUncontrolled(props)
            ? omitProps(props, [
              'as',
              'by',
              'children',
              'defaultValue',
              'disabled',
              'horizontal',
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
              'horizontal',
              'multiple',
              'onChange',
              'ref',
              'toggleable',
            ]),
          SELECT_TAG,
          {
            id: controller.getId(),
            role: 'listbox',
            'aria-multiselectable': true,
            ref: setRef,
            get 'aria-orientation'() {
              return props.horizontal ? 'horizontal' : 'vertical';
            },
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
}
