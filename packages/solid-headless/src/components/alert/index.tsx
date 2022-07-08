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
  DynamicProps,
  ValidConstructor,
} from '../../utils/dynamic-prop';

export type AlertProps<T extends ValidConstructor = 'div'> = {
  as?: T,
} & Omit<DynamicProps<T>, 'as'>

export function Alert<T extends ValidConstructor = 'div'>(
  props: AlertProps<T>,
): JSX.Element {
  const alertID = createUniqueId();

  return (
    <Dynamic
      component={props.as ?? 'div'}
      id={alertID}
      {...omitProps(props, [
        'as',
      ])}
      role="alert"
      data-sh-alert={alertID}
    />
  );
}
