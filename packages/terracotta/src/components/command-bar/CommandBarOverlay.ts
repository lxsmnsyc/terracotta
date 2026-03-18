import type { JSX, ValidComponent } from 'solid-js';
import { createComponent, createEffect, merge } from 'solid-js';
import { omitProps } from 'solid-use/props';
import type { DisclosureStateRenderProps } from '../../states/create-disclosure-state';
import {
  DisclosureStateChild,
  useDisclosureState,
} from '../../states/create-disclosure-state';
import createDynamic from '../../utils/create-dynamic';
import type {
  DynamicProps,
  HeadlessPropsWithRef,
} from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import {
  createDisabledState,
  createExpandedState,
} from '../../utils/state-props';
import useEventListener from '../../utils/use-event-listener';
import { useCommandBarContext } from './CommandBarContext';
import { COMMAND_BAR_OVERLAY_TAG } from './tags';

export type CommandBarOverlayProps<T extends ValidComponent = 'div'> =
  HeadlessPropsWithRef<T, DisclosureStateRenderProps>;

export function CommandBarOverlay<T extends ValidComponent = 'p'>(
  props: CommandBarOverlayProps<T>,
): JSX.Element {
  useCommandBarContext('CommandBarOverlay');
  const state = useDisclosureState();

  const [internalRef, setInternalRef] = createForwardRef(props);

  createEffect(internalRef, current => {
    if (current instanceof HTMLElement) {
      return useEventListener(current, 'click', () => {
        state.close();
      });
    }
    return undefined;
  });

  return createDynamic(
    () => props.as || ('div' as T),
    merge(
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
      omitProps(props, ['as', 'children', 'ref']),
    ) as DynamicProps<T>,
  );
}
