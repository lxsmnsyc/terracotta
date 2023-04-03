import {
  createComponent,
  createUniqueId,
  JSX,
  mergeProps,
} from 'solid-js';
import { omitProps } from 'solid-use/props';
import {
  DynamicProps,
  HeadlessProps,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import Fragment from '../../utils/Fragment';
import { Prettify } from '../../utils/types';
import {
  CheckStateControlledOptions,
  CheckStateProvider,
  CheckStateRenderProps,
  CheckStateUncontrolledOptions,
  createCheckState,
} from '../../states/create-check-state';
import { CheckboxContext } from './CheckboxContext';
import createDynamic from '../../utils/create-dynamic';
import { CHECKBOX_TAG } from './tags';
import { createDisabledState } from '../../utils/state-props';

export type CheckboxControlledBaseProps = Prettify<
  & CheckStateControlledOptions
  & CheckStateRenderProps
>;

export type CheckboxControlledProps<T extends ValidConstructor = typeof Fragment> =
  HeadlessProps<T, CheckboxControlledBaseProps>;

export type CheckboxUncontrolledBaseProps = Prettify<
  & CheckStateUncontrolledOptions
  & CheckStateRenderProps
>;

export type CheckboxUncontrolledProps<T extends ValidConstructor = typeof Fragment> =
  HeadlessProps<T, CheckboxUncontrolledBaseProps>;

export type CheckboxProps<T extends ValidConstructor = typeof Fragment> =
  | CheckboxControlledProps<T>
  | CheckboxUncontrolledProps<T>;

function isCheckboxUncontrolled<T extends ValidConstructor = typeof Fragment>(
  props: CheckboxProps<T>,
): props is CheckboxUncontrolledProps<T> {
  return 'defaultChecked' in props;
}

export function Checkbox<T extends ValidConstructor = typeof Fragment>(
  props: CheckboxProps<T>,
): JSX.Element {
  const ownerID = createUniqueId();
  const labelID = createUniqueId();
  const indicatorID = createUniqueId();
  const descriptionID = createUniqueId();

  const state = createCheckState(props);

  return createComponent(CheckboxContext.Provider, {
    value: {
      ownerID,
      labelID,
      indicatorID,
      descriptionID,
    },
    get children() {
      return createDynamic(
        () => props.as || Fragment,
        mergeProps(
          isCheckboxUncontrolled(props)
            ? omitProps(props, [
              'as',
              'children',
              'defaultChecked',
              'disabled',
              'onChange',
            ])
            : omitProps(props, [
              'as',
              'children',
              'checked',
              'disabled',
              'onChange',
            ]),
          CHECKBOX_TAG,
          createDisabledState(() => state.disabled()),
          {
            get children() {
              return createComponent(CheckStateProvider, {
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
