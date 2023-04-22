import type { JSX } from 'solid-js';
import {
  createEffect,
  onCleanup,
  mergeProps,
  createComponent,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use/props';
import createDynamic from '../../utils/create-dynamic';
import type {
  DynamicProps,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  createForwardRef,
} from '../../utils/dynamic-prop';
import {
  createARIADisabledState,
  createARIAExpandedState,
  createDisabledState,
  createExpandedState,
} from '../../utils/state-props';
import {
  useContextMenuContext,
} from './ContextMenuContext';
import { CONTEXT_MENU_BOUNDARY_TAG } from './tags';
import type { DisclosureStateRenderProps } from '../../states/create-disclosure-state';
import {
  DisclosureStateChild,
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
      const toggle = (e: MouseEvent): void => {
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
      createDisabledState(() => state.disabled()),
      createARIADisabledState(() => state.disabled()),
      createExpandedState(() => state.isOpen()),
      createARIAExpandedState(() => state.isOpen()),
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
