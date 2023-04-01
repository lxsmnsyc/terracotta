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
import { focusFirst, lockFocus } from '../../utils/focus-navigation';
import getFocusableElements from '../../utils/focus-query';
import {
  createUnmountable,
  UnmountableProps,
} from '../../utils/create-unmountable';
import {
  usePopoverContext,
} from './PopoverContext';
import { POPOVER_PANEL_TAG } from './tags';
import {
  DisclosureStateChild,
  DisclosureStateRenderProps,
  useDisclosureState,
} from '../../states/create-disclosure-state';

export type PopoverPanelProps<T extends ValidConstructor = 'div'> =
  HeadlessPropsWithRef<T, DisclosureStateRenderProps & UnmountableProps>;

export function PopoverPanel<T extends ValidConstructor = 'div'>(
  props: PopoverPanelProps<T>,
): JSX.Element {
  const context = usePopoverContext('PopoverPanel');
  const state = useDisclosureState();

  const [internalRef, setInternalRef] = createForwardRef(props);

  createEffect(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      if (state.isOpen()) {
        focusFirst(getFocusableElements(ref));

        const onKeyDown = (e: KeyboardEvent) => {
          if (!state.disabled()) {
            if (e.key === 'Tab') {
              e.preventDefault();

              lockFocus(ref, e.shiftKey);
            } else if (e.key === 'Escape') {
              state.setState(false);
            }
          }
        };

        const onBlur = (e: FocusEvent) => {
          if (context.hovering) {
            return;
          }
          if (!e.relatedTarget || !ref.contains(e.relatedTarget as Node)) {
            state.setState(false);
          }
        };

        ref.addEventListener('keydown', onKeyDown);
        ref.addEventListener('focusout', onBlur);
        onCleanup(() => {
          ref.removeEventListener('keydown', onKeyDown);
          ref.removeEventListener('focusout', onBlur);
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
        POPOVER_PANEL_TAG,
        {
          id: context.panelID,
          ref: setInternalRef,
        },
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
    ),
  );
}
