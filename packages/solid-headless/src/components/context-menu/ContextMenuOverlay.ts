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
  DynamicProps,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  useContextMenuContext,
} from './ContextMenuContext';
import { CONTEXT_MENU_OVERLAY_TAG } from './tags';

export type ContextMenuOverlayProps<T extends ValidConstructor = 'div'> =
  HeadlessPropsWithRef<T, HeadlessDisclosureChildProps>;

export function ContextMenuOverlay<T extends ValidConstructor = 'div'>(
  props: ContextMenuOverlayProps<T>,
): JSX.Element {
  useContextMenuContext('ContextMenuOverlay');
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
      CONTEXT_MENU_OVERLAY_TAG,
      {
        ref: createRef(props, (e) => {
          setInternalRef(() => e);
        }),
      },
      createHeadlessDisclosureChildProps(props),
    ) as DynamicProps<T>,
  );
}
