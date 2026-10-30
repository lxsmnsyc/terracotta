import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { omit } from 'solid-js';
import type { DisclosureStateRenderProps } from '../../states/create-disclosure-state';
import { DisclosureStateChild, useDisclosureState } from '../../states/create-disclosure-state';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createDisabledState, createExpandedState } from '../../utils/state-props';
import { useDialogContext } from './DialogContext';
import { DIALOG_TITLE_TAG } from './tags';

export type DialogTitleProps<T extends ValidComponent = 'h2'> = HeadlessPropsWithRef<
  T,
  DisclosureStateRenderProps
>;

/**
 * The accessible name of a `Dialog`, wired up through `aria-labelledby`.
 *
 * Renders an `<h2>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/dialog.md}
 */
export function DialogTitle<T extends ValidComponent = 'h2'>(
  props: DialogTitleProps<T>,
): JSX.Element {
  const context = useDialogContext('DialogTitle');
  const state = useDisclosureState();
  const disabledState = createDisabledState(() => state.disabled());
  const expandedState = createExpandedState(() => state.isOpen());
  const id = (): string => (props as { id?: string }).id ?? context.titleID;
  context.registerTitle(id);
  const rest = omit(props, 'as', 'children');
  const Root = dynamic(() => props.as || 'h2');
  return (
    <Root {...DIALOG_TITLE_TAG} id={id()} {...disabledState} {...expandedState} {...rest}>
      <DisclosureStateChild>{props.children}</DisclosureStateChild>
    </Root>
  );
}
