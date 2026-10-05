import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { omit } from 'solid-js';
import type { DisclosureStateRenderProps } from '../../states/create-disclosure-state';
import { DisclosureStateChild, useDisclosureState } from '../../states/create-disclosure-state';
import type { HeadlessProps } from '../../utils/dynamic-prop';
import { createDisabledState, createExpandedState } from '../../utils/state-props';
import { useAlertDialogContext } from './AlertDialogContext';
import { ALERT_DIALOG_DESCRIPTION_TAG } from './tags';

export type AlertDialogDescriptionProps<T extends ValidComponent = 'p'> = HeadlessProps<
  T,
  DisclosureStateRenderProps
>;

/**
 * The accessible description of an `AlertDialog`, wired up through `aria-
 * describedby`.
 *
 * Renders a `<p>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/alert-dialog.md}
 */
export function AlertDialogDescription<T extends ValidComponent = 'p'>(
  props: AlertDialogDescriptionProps<T>,
): JSX.Element {
  const context = useAlertDialogContext('AlertDialogDescription');
  const state = useDisclosureState();
  const id = (): string => (props as { id?: string }).id ?? context.descriptionID;
  context.registerDescription(id);
  const rest = omit(props, 'as', 'children');
  const disabledState = createDisabledState(() => state.disabled());
  const expandedState = createExpandedState(() => state.isOpen());
  const Root = dynamic(() => props.as || 'p');
  return (
    <Root
      {...rest}
      {...ALERT_DIALOG_DESCRIPTION_TAG}
      id={id()}
      {...disabledState}
      {...expandedState}
    >
      <DisclosureStateChild>{props.children}</DisclosureStateChild>
    </Root>
  );
}
