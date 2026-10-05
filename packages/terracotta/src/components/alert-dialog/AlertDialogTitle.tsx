import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { omit } from 'solid-js';
import type { DisclosureStateRenderProps } from '../../states/create-disclosure-state';
import { DisclosureStateChild, useDisclosureState } from '../../states/create-disclosure-state';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createDisabledState, createExpandedState } from '../../utils/state-props';
import { useAlertDialogContext } from './AlertDialogContext';
import { ALERT_DIALOG_TITLE_TAG } from './tags';

export type AlertDialogTitleProps<T extends ValidComponent = 'h2'> = HeadlessPropsWithRef<
  T,
  DisclosureStateRenderProps
>;

/**
 * The accessible name of an `AlertDialog`, wired up through `aria-labelledby`.
 *
 * Renders an `<h2>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/alert-dialog.md}
 */
export function AlertDialogTitle<T extends ValidComponent = 'h2'>(
  props: AlertDialogTitleProps<T>,
): JSX.Element {
  const context = useAlertDialogContext('AlertDialogTitle');
  const state = useDisclosureState();

  const id = (): string => (props as { id?: string }).id ?? context.titleID;
  context.registerTitle(id);
  const rest = omit(props, 'as', 'children');
  const disabledState = createDisabledState(() => state.disabled());
  const expandedState = createExpandedState(() => state.isOpen());
  const Root = dynamic(() => props.as || 'h2');
  return (
    <Root {...rest} {...ALERT_DIALOG_TITLE_TAG} id={id()} {...disabledState} {...expandedState}>
      <DisclosureStateChild>{props.children}</DisclosureStateChild>
    </Root>
  );
}
