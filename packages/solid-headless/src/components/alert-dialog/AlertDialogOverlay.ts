import {
  createSignal,
  createEffect,
  onCleanup,
  JSX,
  mergeProps,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use';
import {
  HeadlessDisclosureChildProps,
  useHeadlessDisclosureProperties,
  createHeadlessDisclosureChildProps,
} from '../../headless/disclosure';
import createDynamic from '../../utils/create-dynamic';
import {
  createRef,
  DynamicNode,
  ValidConstructor,
  HeadlessPropsWithRef,
  DynamicProps,
} from '../../utils/dynamic-prop';
import {
  useAlertDialogContext,
} from './AlertDialogContext';
import { ALERT_DIALOG_OVERLAY } from './tags';

export type AlertDialogOverlayProps<T extends ValidConstructor = 'div'> =
  HeadlessPropsWithRef<T, HeadlessDisclosureChildProps>;

export function AlertDialogOverlay<T extends ValidConstructor = 'div'>(
  props: AlertDialogOverlayProps<T>,
): JSX.Element {
  useAlertDialogContext('AlertDialogOverlay');
  const properties = useHeadlessDisclosureProperties();

  const [internalRef, setInternalRef] = createSignal<DynamicNode<T>>();

  createEffect(() => {
    const ref = internalRef();

    if (ref instanceof HTMLElement) {
      const onClick = () => {
        properties.setState(false);
      };

      ref.addEventListener('click', onClick);

      onCleanup(() => {
        ref.removeEventListener('click', onClick);
      });
    }
  });

  return createDynamic(
    () => props.as ?? ('div' as T),
    mergeProps(
      omitProps(props, [
        'as',
        'children',
        'ref',
      ]),
      ALERT_DIALOG_OVERLAY,
      {
        ref: createRef(props, (e) => {
          setInternalRef(() => e);
        }),
      },
      createHeadlessDisclosureChildProps(props),
    ) as DynamicProps<T>,
  );
}
