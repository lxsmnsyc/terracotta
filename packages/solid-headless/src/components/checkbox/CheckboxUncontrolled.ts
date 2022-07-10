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
} from '../../headless/toggle/HeadlessToggleRoot';
import {
  HeadlessToggleUncontrolledOptions,
} from '../../headless/toggle/useHeadlessToggle';
import createDynamic from '../../utils/create-dynamic';
import {
  DynamicProps,
  HeadlessProps,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import Fragment from '../../utils/Fragment';
import {
  CheckboxContext,
} from './CheckboxContext';

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
          {
            'data-sh-checkbox': ownerID,
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
