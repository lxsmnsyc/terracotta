import {
  createComponent,
  createUniqueId,
  JSX,
  mergeProps,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use';
import {
  HeadlessToggleRoot,
  HeadlessToggleRootChildren,
  HeadlessToggleUncontrolledOptions,
} from '../../headless/toggle';
import createDynamic from '../../utils/create-dynamic';
import {
  DynamicProps,
  HeadlessProps,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import Fragment from '../../utils/Fragment';
import {
  createDisabled,
} from '../../utils/state-props';
import {
  CheckboxContext,
} from './CheckboxContext';
import { CHECKBOX_TAG } from './tags';

export type CheckboxUncontrolledBaseProps =
  & HeadlessToggleUncontrolledOptions
  & HeadlessToggleRootChildren;

export type CheckboxUncontrolledProps<T extends ValidConstructor = typeof Fragment> =
  HeadlessProps<T, CheckboxUncontrolledBaseProps>;

export function CheckboxUncontrolled<T extends ValidConstructor = typeof Fragment>(
  props: CheckboxUncontrolledProps<T>,
): JSX.Element {
  const ownerID = createUniqueId();
  const labelID = createUniqueId();
  const indicatorID = createUniqueId();
  const descriptionID = createUniqueId();

  return createComponent(CheckboxContext.Provider, {
    value: {
      ownerID,
      labelID,
      indicatorID,
      descriptionID,
    },
    get children() {
      return createDynamic(
        () => props.as ?? (Fragment as T),
        mergeProps(
          omitProps(props, [
            'defaultChecked',
            'as',
            'children',
            'disabled',
            'onChange',
          ]),
          CHECKBOX_TAG,
          createDisabled(() => props.disabled),
          {
            get children() {
              return createComponent(HeadlessToggleRoot, {
                onChange: props.onChange,
                get checked() {
                  return props.checked;
                },
                get disabled() {
                  return props.disabled;
                },
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
