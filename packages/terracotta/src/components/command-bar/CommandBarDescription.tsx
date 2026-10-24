import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { omit } from 'solid-js';
import type { DisclosureStateRenderProps } from '../../states/create-disclosure-state';
import { DisclosureStateChild, useDisclosureState } from '../../states/create-disclosure-state';
import type { HeadlessProps } from '../../utils/dynamic-prop';
import { createDisabledState, createExpandedState } from '../../utils/state-props';
import { useCommandBarContext } from './CommandBarContext';
import { COMMAND_BAR_DESCRIPTION_TAG } from './tags';

export type CommandBarDescriptionProps<T extends ValidComponent = 'p'> = HeadlessProps<
  T,
  DisclosureStateRenderProps
>;

/**
 * The accessible description of a `CommandBar`, wired up through `aria-
 * describedby`.
 *
 * Renders a `<p>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/command-bar.md}
 */
export function CommandBarDescription<T extends ValidComponent = 'p'>(
  props: CommandBarDescriptionProps<T>,
): JSX.Element {
  const context = useCommandBarContext('CommandBarDescription');
  const state = useDisclosureState();
  const disabledState = createDisabledState(() => state.disabled());
  const id = (): string => (props as { id?: string }).id ?? context.descriptionID;
  context.registerDescription(id);
  const rest = omit(props, 'as', 'children');
  const expandedState = createExpandedState(() => state.isOpen());
  const Root = dynamic(() => props.as || 'p');
  return (
    <Root
      {...COMMAND_BAR_DESCRIPTION_TAG}
      id={id()}
      {...disabledState}
      {...rest}
      {...expandedState}
    >
      <DisclosureStateChild>{props.children}</DisclosureStateChild>
    </Root>
  );
}
