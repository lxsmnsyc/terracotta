import {
  createUniqueId,
  JSX,
} from 'solid-js';
import {
  Dynamic,
} from 'solid-js/web';
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
import {
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

  return (
    <CheckboxContext.Provider
      value={{
        ownerID,
        labelID,
        indicatorID,
        descriptionID,
      }}
    >
      <Dynamic
        component={props.as ?? Fragment}
        {...omitProps(props, [
          'defaultChecked',
          'as',
          'children',
          'disabled',
          'onChange',
        ])}
        disabled={props.disabled}
        aria-disabled={props.disabled}
        data-sh-disabled={props.disabled}
        data-sh-checkbox={ownerID}
      >
        <HeadlessToggleRoot
          defaultChecked={props.defaultChecked}
          onChange={props.onChange}
          disabled={props.disabled}
        >
          {props.children}
        </HeadlessToggleRoot>
      </Dynamic>
    </CheckboxContext.Provider>
  );
}