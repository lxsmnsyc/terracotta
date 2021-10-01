import {
  createUniqueId,
} from 'solid-js';
import {
  JSX,
} from 'solid-js/jsx-runtime';
import {
  Dynamic,
} from 'solid-js/web';
import {
  DynamicProps,
  ValidConstructor,
} from '../utils/dynamic-prop';
import {
  excludeProps,
} from '../utils/exclude-props';

export type TailwindAlertProps<T extends ValidConstructor = 'div'> = {
  as?: T,
  disabled?: boolean;
} & Omit<DynamicProps<T>, 'as'>

export function TailwindAlert<T extends ValidConstructor = 'div'>(
  props: TailwindAlertProps<T>,
): JSX.Element {
  const alertID = createUniqueId();

  return (
    <Dynamic
      component={props.as ?? 'div'}
      id={alertID}
      {...excludeProps(props, [
        'as',
      ])}
      role="alert"
      data-sh-alert={alertID}
    />
  );
}
