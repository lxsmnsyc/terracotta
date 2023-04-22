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
  usePopoverContext,
} from './PopoverContext';
import { POPOVER_PANEL_TAG } from './tags';
import type { DisclosureStateRenderProps } from '../../states/create-disclosure-state';
import {
  DisclosureStateChild,
  useDisclosureState,
} from '../../states/create-disclosure-state';
import type { Prettify } from '../../utils/types';
import { createDisabledState, createExpandedState } from '../../utils/state-props';

export type PopoverPanelBaseProps = Prettify<
  & DisclosureStateRenderProps
  & UnmountableProps
>;

export type PopoverPanelProps<T extends ValidConstructor = 'div'> =
  HeadlessPropsWithRef<T, PopoverPanelBaseProps>;

export function PopoverPanel<T extends ValidConstructor = 'div'>(
  props: PopoverPanelProps<T>,
): JSX.Element {
  const context = usePopoverContext('PopoverPanel');
  const state = useDisclosureState();

  const [internalRef, setInternalRef] = createForwardRef(props);

  createEffect(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement && state.isOpen()) {
      focusFirst(getFocusableElements(ref), false);

      const onKeyDown = (e: KeyboardEvent): void => {
        if (!state.disabled()) {
          switch (e.key) {
            case 'Tab':
              e.preventDefault();
              lockFocus(ref, e.shiftKey, false);
              break;
            case 'Escape':
              state.close();
              break;
            default:
              break;
          }
        }
      };

      const onBlur = (e: FocusEvent): void => {
        if (context.hovering) {
          return;
        }
        if (!e.relatedTarget || !ref.contains(e.relatedTarget as Node)) {
          state.close();
        }
      };

      ref.addEventListener('keydown', onKeyDown);
      ref.addEventListener('focusout', onBlur);
      onCleanup(() => {
        ref.removeEventListener('keydown', onKeyDown);
        ref.removeEventListener('focusout', onBlur);
      });
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
        POPOVER_PANEL_TAG,
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
