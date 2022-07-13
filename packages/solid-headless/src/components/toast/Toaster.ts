import {
  createComponent,
  createUniqueId,
  JSX,
  mergeProps,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use';
import createDynamic from '../../utils/create-dynamic';
import {
  ValidConstructor,
  HeadlessProps,
  DynamicProps,
} from '../../utils/dynamic-prop';
import {
  ToastContext,
} from './ToastContext';

export type ToasterProps<T extends ValidConstructor = 'div'> =
  HeadlessProps<T>;

export function Toaster<T extends ValidConstructor = 'div'>(
  props: ToasterProps<T>,
): JSX.Element {
  const ownerID = createUniqueId();

  return createComponent(ToastContext.Provider, {
    value: {
      ownerID,
    },
    get children() {
      return createDynamic(
        () => props.as ?? ('div' as T),
        mergeProps(
          omitProps(props, [
            'as',
          ]),
          {
            'data-sh-toaster': ownerID,
          },
        ) as DynamicProps<T>,
      );
    },
  });
}
