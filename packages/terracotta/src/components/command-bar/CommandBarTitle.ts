import { createDynamic } from '@solidjs/web';
import type { ComponentProps, JSX, ValidComponent } from 'solid-js';
import { createComponent, merge } from 'solid-js';
import { omitProps } from 'solid-use/props';
import type { DisclosureStateRenderProps } from '../../states/create-disclosure-state';
import {
  DisclosureStateChild,
  useDisclosureState,
} from '../../states/create-disclosure-state';
import type { HeadlessProps } from '../../utils/dynamic-prop';
import {
  createDisabledState,
  createExpandedState,
} from '../../utils/state-props';
import { useCommandBarContext } from './CommandBarContext';
import { COMMAND_BAR_TITLE_TAG } from './tags';

export type CommandBarTitleProps<T extends ValidComponent = 'h2'> =
  HeadlessProps<T, DisclosureStateRenderProps>;

export function CommandBarTitle<T extends ValidComponent = 'h2'>(
  props: CommandBarTitleProps<T>,
): JSX.Element {
  const context = useCommandBarContext('CommandBarTitle');
  const state = useDisclosureState();
  return createDynamic(
    () => props.as || ('h2' as T),
    merge(
      COMMAND_BAR_TITLE_TAG,
      {
        id: context.titleID,
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
      omitProps(props, ['as', 'children']),
    ) as ComponentProps<T>,
  );
}
