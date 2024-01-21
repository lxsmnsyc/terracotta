import type { JSX } from 'solid-js';
import { createEffect, mergeProps, createComponent } from 'solid-js';
import { omitProps } from 'solid-use/props';
import createDynamic from '../../utils/create-dynamic';
import type {
  DynamicProps,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import { useCommandBarContext } from './CommandBarContext';
import { COMMAND_BAR_OVERLAY_TAG } from './tags';
import type { DisclosureStateRenderProps } from '../../states/create-disclosure-state';
import {
  DisclosureStateChild,
  useDisclosureState,
} from '../../states/create-disclosure-state';
import {
  createDisabledState,
  createExpandedState,
} from '../../utils/state-props';
import useEventListener from '../../utils/use-event-listener';

export type CommandBarOverlayProps<T extends ValidConstructor = 'div'> =
  HeadlessPropsWithRef<T, DisclosureStateRenderProps>;

export function CommandBarOverlay<T extends ValidConstructor = 'p'>(
  props: CommandBarOverlayProps<T>,
): JSX.Element {
  useCommandBarContext('CommandBarOverlay');
  const state = useDisclosureState();

  const [internalRef, setInternalRef] = createForwardRef(props);

  createEffect(() => {
    const current = internalRef();
    if (current instanceof HTMLElement) {
      useEventListener(current, 'click', () => {
        state.close();
      });
    }
  });

  return createDynamic(
    () => props.as || ('div' as T),
    mergeProps(
      omitProps(props, ['as', 'children', 'ref']),
      COMMAND_BAR_OVERLAY_TAG,
      {
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
  );
}
