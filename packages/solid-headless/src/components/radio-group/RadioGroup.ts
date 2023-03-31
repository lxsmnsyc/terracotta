import {
  createComponent,
  createMemo,
  createRenderEffect,
  createUniqueId,
  JSX,
  mergeProps,
} from 'solid-js';
import { omitProps } from 'solid-use/props';
import {
  createSingleSelectState,
  SelectStateProvider,
  SelectStateRenderProps,
  SingleSelectStateControlledOptions,
  SingleSelectStateUncontrolledOptions,
} from '../../states/create-select-state';
import createDynamic from '../../utils/create-dynamic';
import {
  createForwardRef,
  DynamicProps,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import { createDisabled } from '../../utils/state-props';
import { Prettify } from '../../utils/types';
import { RadioGroupContext } from './RadioGroupContext';
import { createRadioGroupOptionFocusNavigator, RadioGroupRootContext } from './RadioGroupRootContext';
import { RADIO_GROUP_TAG } from './tags';

export type RadioGroupControlledBaseProps<V> = Prettify<
  SingleSelectStateControlledOptions<V>
  & SelectStateRenderProps<V>
>;

export type RadioGroupControlledProps<V, T extends ValidConstructor = 'div'> =
  HeadlessPropsWithRef<T, RadioGroupControlledBaseProps<V>>;

export type RadioGroupUncontrolledBaseProps<V> = Prettify<
  SingleSelectStateUncontrolledOptions<V>
  & SelectStateRenderProps<V>
>;

export type RadioGroupUncontrolledProps<V, T extends ValidConstructor = 'div'> =
  HeadlessPropsWithRef<T, RadioGroupUncontrolledBaseProps<V>>;

export type RadioGroupProps<V, T extends ValidConstructor = 'div'> =
  | RadioGroupControlledProps<V, T>
  | RadioGroupUncontrolledProps<V, T>;

function isRadioGroupUncontrolled<V, T extends ValidConstructor = 'div'>(
  props: RadioGroupProps<V, T>,
): props is RadioGroupUncontrolledProps<V, T> {
  return 'defaultValue' in props;
}

export function RadioGroup<V, T extends ValidConstructor = 'div'>(
  props: RadioGroupProps<V, T>,
): JSX.Element {
  return createMemo(() => {
    const controller = createRadioGroupOptionFocusNavigator();
    const descriptionID = createUniqueId();
    const labelID = createUniqueId();
    const state = createSingleSelectState(props);

    const [ref, setRef] = createForwardRef(props);

    createRenderEffect(() => {
      const current = ref();
      if (current) {
        controller.setRef(current);
      }
    });

    return createComponent(RadioGroupRootContext.Provider, {
      value: controller,
      get children() {
        return createComponent(RadioGroupContext.Provider, {
          value: {
            descriptionID,
            labelID,
          },
          get children() {
            return createDynamic(
              () => props.as || ('div' as T),
              mergeProps(
                isRadioGroupUncontrolled(props)
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
                RADIO_GROUP_TAG,
                {
                  role: 'radiogroup',
                  'aria-labelledby': labelID,
                  'aria-describedby': descriptionID,
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
      },
    });
  }) as unknown as JSX.Element;
}
