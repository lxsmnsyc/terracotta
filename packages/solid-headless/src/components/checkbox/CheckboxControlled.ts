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
  HeadlessToggleControlledOptions,
} from '../../headless/toggle';
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

export type CheckboxControlledBaseProps =
  & HeadlessToggleControlledOptions
  & HeadlessToggleRootChildren;

export type CheckboxControlledProps<T extends ValidConstructor = typeof Fragment> =
  HeadlessProps<T, CheckboxControlledBaseProps>;

export function CheckboxControlled<T extends ValidConstructor = typeof Fragment>(
  props: CheckboxControlledProps<T>,
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
            'checked',
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
