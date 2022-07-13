import {
  JSX,
  mergeProps,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use';
import createDynamic from '../../utils/create-dynamic';
import {
  DynamicProps,
  HeadlessProps,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  useToastContext,
} from './ToastContext';

export type ToastProps<T extends ValidConstructor = 'div'> =
  HeadlessProps<T>;

export function Toast<T extends ValidConstructor = 'div'>(
  props: ToastProps<T>,
): JSX.Element {
  const ctx = useToastContext('Toast');

  return createDynamic(
    () => props.as ?? ('div' as T),
    mergeProps(
      omitProps(props, [
        'as',
      ]),
      {
        role: 'status',
        'aria-live': 'polite',
        'data-sh-toast': ctx.ownerID,
      },
    ) as DynamicProps<T>,
  );
}
