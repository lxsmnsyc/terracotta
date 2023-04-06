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
  DynamicProps,
  HeadlessPropsWithRef,
  ValidConstructor,
  createForwardRef,
} from '../../utils/dynamic-prop';
import { focusFirst, lockFocus } from '../../utils/focus-navigation';
import getFocusableElements from '../../utils/focus-query';
import {
  createUnmountable,
  UnmountableProps,
} from '../../utils/create-unmountable';
import {
  useContextMenuContext,
} from './ContextMenuContext';
import { CONTEXT_MENU_PANEL_TAG } from './tags';
import {
  DisclosureStateChild,
  DisclosureStateRenderProps,
  useDisclosureState,
} from '../../states/create-disclosure-state';
import { Prettify } from '../../utils/types';
import {
  createDisabledState,
  createExpandedState,
} from '../../utils/state-props';

export type ContextMenuPanelBaseProps = Prettify<
  & DisclosureStateRenderProps
  & UnmountableProps
>;

export type ContextMenuPanelProps<T extends ValidConstructor = 'div'> =
  HeadlessPropsWithRef<T, ContextMenuPanelBaseProps>;

export function ContextMenuPanel<T extends ValidConstructor = 'div'>(
  props: ContextMenuPanelProps<T>,
): JSX.Element {
  const context = useContextMenuContext('ContextMenuPanel');
  const state = useDisclosureState();

  const [internalRef, setInternalRef] = createForwardRef(props);

  createEffect(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      if (state.isOpen()) {
        focusFirst(getFocusableElements(ref), false);

        const onKeyDown = (e: KeyboardEvent) => {
          if (!props.disabled) {
            if (e.key === 'Tab') {
              e.preventDefault();

              lockFocus(ref, e.shiftKey, false);
            } else if (e.key === 'Escape') {
              state.close();
            }
          }
        };

        const onClickOutside = (e: FocusEvent) => {
          if (!ref.contains(e.target as Node)) {
            state.close();
          }
        };

        ref.addEventListener('keydown', onKeyDown);
        document.addEventListener('click', onClickOutside);
        onCleanup(() => {
          ref.removeEventListener('keydown', onKeyDown);
          document.removeEventListener('click', onClickOutside);
        });
      }
    }
  });

  return createUnmountable(
    props,
    () => state.isOpen(),
    () => createDynamic(
      () => props.as || ('div' as T),
      mergeProps(
        omitProps(props, [
          'as',
          'unmount',
          'children',
          'ref',
        ]),
        CONTEXT_MENU_PANEL_TAG,
        {
          id: context.panelID,
          ref: setInternalRef,
          get children() {
            return createComponent(DisclosureStateChild, {
              get children() {
                return props.children;
              },
            });
          },
        },
        createDisabledState(() => state.disabled()),
        createExpandedState(() => state.isOpen()),
      ) as DynamicProps<T>,
    ),
  );
}
