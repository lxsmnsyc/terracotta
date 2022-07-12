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
import { focusNext, focusPrev } from '../../utils/focus-navigation';
import getFocusableElements from '../../utils/get-focusable-elements';
import {
  useAlertDialogContext,
} from './AlertDialogContext';

export type AlertDialogPanelProps<T extends ValidConstructor = 'div'> =
  HeadlessPropsWithRef<T, HeadlessDisclosureChildProps>;

export function AlertDialogPanel<T extends ValidConstructor = 'div'>(
  props: AlertDialogPanelProps<T>,
): JSX.Element {
  const context = useAlertDialogContext('AlertDialogPanel');
  const properties = useHeadlessDisclosureProperties();

  const [internalRef, setInternalRef] = createSignal<DynamicNode<T>>();

  createEffect(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      if (properties.isOpen()) {
        const initialNodes = getFocusableElements(ref);
        if (initialNodes.length) {
          initialNodes[0].focus();
        }

        const onKeyDown = (e: KeyboardEvent) => {
          if (!props.disabled) {
            if (e.key === 'Tab') {
              e.preventDefault();

              const nodes = getFocusableElements(ref);
              if (e.shiftKey) {
                if (!document.activeElement || !ref.contains(document.activeElement)) {
                  nodes[nodes.length - 1].focus();
                } else {
                  focusPrev(nodes, document.activeElement);
                }
              } else if (!document.activeElement || !ref.contains(document.activeElement)) {
                nodes[0].focus();
              } else {
                focusNext(nodes, document.activeElement);
              }
            } else if (e.key === 'Escape') {
              properties.setState(false);
            }
          }
        };

        ref.addEventListener('keydown', onKeyDown);
        onCleanup(() => {
          ref.removeEventListener('keydown', onKeyDown);
        });
      }
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
        id: context.panelID,
        'data-sh-alert-dialog-panel': context.ownerID,
        ref: createRef(props, (e) => {
          setInternalRef(() => e);
        }),
      },
      createHeadlessDisclosureChildProps(props),
    ) as DynamicProps<T>,
  );
}
