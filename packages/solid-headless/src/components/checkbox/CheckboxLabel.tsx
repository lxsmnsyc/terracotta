import {
  JSX,
} from 'solid-js';
import {
  Dynamic,
} from 'solid-js/web';
import {
  omitProps,
} from 'solid-use';
import {
  HeadlessToggleChildProps,
} from '../../headless/toggle/HeadlessToggleChild';
import {
  ValidConstructor,
  HeadlessProps,
} from '../../utils/dynamic-prop';
import {
  useCheckboxContext,
} from './CheckboxContext';

export type CheckboxLabelProps<T extends ValidConstructor = 'label'> =
  HeadlessProps<T, HeadlessToggleChildProps>;

export function CheckboxLabel<T extends ValidConstructor = 'label'>(
  props: CheckboxLabelProps<T>,
): JSX.Element {
  const context = useCheckboxContext('CheckboxLabel');
  return (
    <Dynamic
      component={props.as ?? 'label'}
      {...omitProps(props, [
        'as',
      ])}
      id={context.labelID}
      for={context.indicatorID}
      data-sh-checkbox-label={context.ownerID}
    >
      {props.children}
    </Dynamic>
  );
}
