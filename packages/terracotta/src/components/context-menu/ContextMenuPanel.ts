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
import { focusFirst, lockFocus } from '../../utils/focus-navigation';
import getFocusableElements from '../../utils/focus-query';
import type { UnmountableProps } from '../../utils/create-unmountable';
import {
  createUnmountable,
} from '../../utils/create-unmountable';
import {
  useContextMenuContext,
} from './ContextMenuContext';
import { CONTEXT_MENU_PANEL_TAG } from './tags';
import type { DisclosureStateRenderProps } from '../../states/create-disclosure-state';
import {
  DisclosureStateChild,
  useDisclosureState,
} from '../../states/create-disclosure-state';
import type { Prettify } from '../../utils/types';
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

        const onKeyDown = (e: KeyboardEvent): void => {
          if (!props.disabled) {
            if (e.key === 'Tab') {
              e.preventDefault();

              lockFocus(ref, e.shiftKey, false);
            } else if (e.key === 'Escape') {
              state.close();
            }
          }
        };

        const onClickOutside = (e: FocusEvent): void => {
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
