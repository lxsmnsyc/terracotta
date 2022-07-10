import {
  createSignal,
  createEffect,
  onCleanup,
  JSX,
  mergeProps,
  createComponent,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use';
import {
  HeadlessDisclosureChildProps,
  HeadlessDisclosureChild,
} from '../../headless/disclosure/HeadlessDisclosureChild';
import {
  useHeadlessDisclosureProperties,
} from '../../headless/disclosure/HeadlessDisclosureContext';
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

export type ContextMenuBoundaryProps<T extends ValidConstructor = 'div'> =
  HeadlessPropsWithRef<T, HeadlessDisclosureChildProps>;

export function ContextMenuBoundary<T extends ValidConstructor = 'div'>(
  props: ContextMenuBoundaryProps<T>,
): JSX.Element {
  const context = useContextMenuContext('ContextMenuBoundary');
  const properties = useHeadlessDisclosureProperties();

  const [internalRef, setInternalRef] = createSignal<DynamicNode<T>>();

  createEffect(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const toggle = (e: MouseEvent) => {
        if (!properties.disabled()) {
          e.preventDefault();
          properties.setState(true);
        }
      };

      ref.addEventListener('contextmenu', toggle);

      onCleanup(() => {
        ref.removeEventListener('contextmenu', toggle);
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
        id: context.boundaryID,
        'data-sh-context-menu-boundary': context.ownerID,
        ref: createRef(props, (e) => {
          setInternalRef(() => e);
          if (e instanceof HTMLElement) {
            context.anchor = e;
          }
        }),
        get disabled() {
          return properties.disabled();
        },
        get 'aria-disabled'() {
          return properties.disabled();
        },
        get 'data-sh-disabled'() {
          return properties.disabled();
        },
        get 'aria-expanded'() {
          return properties.isOpen();
        },
        get 'data-sh-expanded'() {
          return properties.isOpen();
        },
        get 'aria-controls'() {
          return properties.isOpen() && context.panelID;
        },
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
