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
  DynamicComponent,
  DynamicProps,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  OmitAndMerge,
} from '../../utils/types';

export type AlertProps<T extends ValidConstructor = 'div'> =
  OmitAndMerge<DynamicComponent<T>, DynamicProps<T>>;

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
