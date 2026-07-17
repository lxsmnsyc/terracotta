import type { ComponentProps, JSX, ValidComponent } from '@solidjs/web';
import { createComponent, merge, omit } from 'solid-js';
import type { DisclosureStateRenderProps } from '../../states/create-disclosure-state';
import {
  DisclosureStateChild,
  useDisclosureState,
} from '../../states/create-disclosure-state';
import createDynamic from '../../utils/create-dynamic';
import type { HeadlessProps } from '../../utils/dynamic-prop';
import {
  createDisabledState,
  createExpandedState,
} from '../../utils/state-props';
import { useCommandBarContext } from './CommandBarContext';
import { COMMAND_BAR_DESCRIPTION_TAG } from './tags';

export type CommandBarDescriptionProps<T extends ValidComponent = 'p'> =
  HeadlessProps<T, DisclosureStateRenderProps>;

export function CommandBarDescription<T extends ValidComponent = 'p'>(
  props: CommandBarDescriptionProps<T>,
): JSX.Element {
  const context = useCommandBarContext('CommandBarDescription');
  const state = useDisclosureState();
  return createDynamic(
    () => props.as || ('p' as T),
    merge(
      COMMAND_BAR_DESCRIPTION_TAG,
      {
        id: context.descriptionID,
        get children() {
          return createComponent(DisclosureStateChild, {
            get children() {
              return props.children;
            },
          });
        },
      },
      createDisabledState(() => state.disabled()),
      omit(props, 'as', 'children'),
      createExpandedState(() => state.isOpen()),
    ) as ComponentProps<T>,
  );
}
