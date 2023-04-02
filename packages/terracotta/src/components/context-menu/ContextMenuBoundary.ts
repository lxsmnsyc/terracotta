import {
  createEffect,
  onCleanup,
  JSX,
  mergeProps,
  createComponent,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use/props';
import createDynamic from '../../utils/create-dynamic';
import {
  createForwardRef,
  DynamicProps,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  createDisabled,
  createExpanded,
} from '../../utils/state-props';
import {
  useContextMenuContext,
} from './ContextMenuContext';
import { CONTEXT_MENU_BOUNDARY_TAG } from './tags';
import {
  DisclosureStateChild,
  DisclosureStateRenderProps,
  useDisclosureState,
} from '../../states/create-disclosure-state';

export type ContextMenuBoundaryProps<T extends ValidConstructor = 'div'> =
  HeadlessPropsWithRef<T, DisclosureStateRenderProps>;

export function ContextMenuBoundary<T extends ValidConstructor = 'div'>(
  props: ContextMenuBoundaryProps<T>,
): JSX.Element {
  const context = useContextMenuContext('ContextMenuBoundary');
  const state = useDisclosureState();

  const [internalRef, setInternalRef] = createForwardRef(props);

  createEffect(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      context.anchor = ref;
      const toggle = (e: MouseEvent) => {
        if (!state.disabled()) {
          e.preventDefault();
          state.open();
        }
      };

      ref.addEventListener('contextmenu', toggle);

      onCleanup(() => {
        ref.removeEventListener('contextmenu', toggle);
      });
    }
  });

  return createDynamic(
    () => props.as || ('div' as T),
    mergeProps(
      omitProps(props, [
        'as',
        'children',
        'ref',
      ]),
      CONTEXT_MENU_BOUNDARY_TAG,
      {
        id: context.boundaryID,
        ref: setInternalRef,
        get 'aria-controls'() {
          return state.isOpen() && context.panelID;
        },
      },
      createDisabled(() => state.disabled()),
      createExpanded(() => state.isOpen()),
      {
        get children() {
          return createComponent(DisclosureStateChild, {
            get children() {
              return props.children;
            },
          });
        },
      },
    ) as DynamicProps<T>,
  );
}