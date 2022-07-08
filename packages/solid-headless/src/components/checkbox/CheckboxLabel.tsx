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
  DynamicProps,
  DynamicComponent,
} from '../../utils/dynamic-prop';
import {
  useCheckboxContext,
} from './CheckboxContext';

export type CheckboxLabelProps<T extends ValidConstructor = 'label'> =
  & DynamicComponent<T>
  & HeadlessToggleChildProps
  & Omit<DynamicProps<T>, keyof HeadlessToggleChildProps>;

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
