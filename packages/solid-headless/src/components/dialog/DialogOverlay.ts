import {
  createSignal,
  createEffect,
  onCleanup,
  JSX,
  createComponent,
  mergeProps,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use';
import {
  HeadlessDisclosureChildProps,
  HeadlessDisclosureChild,
  useHeadlessDisclosureProperties,
} from '../../headless/disclosure';
import createDynamic from '../../utils/create-dynamic';
import {
  createRef,
  DynamicNode,
  DynamicProps,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  useDialogContext,
} from './DialogContext';

export type DialogOverlayProps<T extends ValidConstructor = 'div'> =
  HeadlessPropsWithRef<T, HeadlessDisclosureChildProps>;

export function DialogOverlay<T extends ValidConstructor = 'p'>(
  props: DialogOverlayProps<T>,
): JSX.Element {
  const context = useDialogContext('DialogOverlay');
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
      {
        'data-sh-dialog-overlay': context.ownerID,
        ref: createRef(props, (e) => {
          setInternalRef(() => e);
        }),
        get children() {
          return createComponent(HeadlessDisclosureChild, {
            get children() {
              return props.children;
            },
          });
        },
      },
    ) as DynamicProps<T>,
  );
}
