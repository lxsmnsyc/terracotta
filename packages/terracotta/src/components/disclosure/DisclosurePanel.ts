import { createDynamic } from '@solidjs/web';
import type { ComponentProps, JSX, ValidComponent } from 'solid-js';
import { createComponent, merge, omit } from 'solid-js';
import type { DisclosureStateRenderProps } from '../../states/create-disclosure-state';
import {
  DisclosureStateChild,
  useDisclosureState,
} from '../../states/create-disclosure-state';
import type { UnmountableProps } from '../../utils/create-unmountable';
import { createUnmountable } from '../../utils/create-unmountable';
import type { HeadlessProps } from '../../utils/dynamic-prop';
import {
  createDisabledState,
  createExpandedState,
} from '../../utils/state-props';
import type { Prettify } from '../../utils/types';
import { useDisclosureContext } from './DisclosureContext';
import { DISCLOSURE_PANEL_TAG } from './tags';

export type DisclosurePanelBaseProps = Prettify<
  DisclosureStateRenderProps & UnmountableProps
>;

export type DisclosurePanelProps<T extends ValidComponent = 'div'> =
  HeadlessProps<T, DisclosurePanelBaseProps>;

export function DisclosurePanel<T extends ValidComponent = 'div'>(
  props: DisclosurePanelProps<T>,
): JSX.Element {
  const context = useDisclosureContext('DisclosurePanel');
  const state = useDisclosureState();

  return createUnmountable(
    props,
    () => state.isOpen(),
    () =>
      createDynamic(
        () => props.as || ('div' as T),
        merge(
          DISCLOSURE_PANEL_TAG,
          {
            id: context.panelID,
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
          omit(props, 'as', 'unmount', 'children'),
        ) as ComponentProps<T>,
      ),
  );
}
