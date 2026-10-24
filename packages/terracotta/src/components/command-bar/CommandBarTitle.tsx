import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { omit } from 'solid-js';
import type { DisclosureStateRenderProps } from '../../states/create-disclosure-state';
import { DisclosureStateChild, useDisclosureState } from '../../states/create-disclosure-state';
import type { HeadlessProps } from '../../utils/dynamic-prop';
import { createDisabledState, createExpandedState } from '../../utils/state-props';
import { useCommandBarContext } from './CommandBarContext';
import { COMMAND_BAR_TITLE_TAG } from './tags';

export type CommandBarTitleProps<T extends ValidComponent = 'h2'> = HeadlessProps<
  T,
  DisclosureStateRenderProps
>;

/**
 * The accessible name of a `CommandBar`, wired up through `aria-labelledby`.
 *
 * Renders an `<h2>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/command-bar.md}
 */
export function CommandBarTitle<T extends ValidComponent = 'h2'>(
  props: CommandBarTitleProps<T>,
): JSX.Element {
  const context = useCommandBarContext('CommandBarTitle');
  const state = useDisclosureState();
  const disabledState = createDisabledState(() => state.disabled());
  const expandedState = createExpandedState(() => state.isOpen());
  const id = (): string => (props as { id?: string }).id ?? context.titleID;
  context.registerTitle(id);
  const rest = omit(props, 'as', 'children');
  const Root = dynamic(() => props.as || 'h2');
  return (
    <Root {...COMMAND_BAR_TITLE_TAG} id={id()} {...disabledState} {...expandedState} {...rest}>
      <DisclosureStateChild>{props.children}</DisclosureStateChild>
    </Root>
  );
}
