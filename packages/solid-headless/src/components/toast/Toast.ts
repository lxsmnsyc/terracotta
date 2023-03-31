import {
  JSX,
  mergeProps,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use/props';
import createDynamic from '../../utils/create-dynamic';
import {
  DynamicProps,
  HeadlessProps,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import { TOAST_TAG } from './tags';
import {
  useToastContext,
} from './ToastContext';

export type ToastProps<T extends ValidConstructor = 'div'> =
  HeadlessProps<T>;

export function Toast<T extends ValidConstructor = 'div'>(
  props: ToastProps<T>,
): JSX.Element {
  useToastContext('Toast');

  return createDynamic(
    () => props.as || ('div' as T),
    mergeProps(
      omitProps(props, [
        'as',
      ]),
      TOAST_TAG,
      {
        role: 'status',
        'aria-live': 'polite',
      },
    ) as DynamicProps<T>,
  );
}
