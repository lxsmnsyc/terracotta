import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { omit } from 'solid-js';
import type { DisclosureStateRenderProps } from '../../states/create-disclosure-state';
import { DisclosureStateChild, useDisclosureState } from '../../states/create-disclosure-state';
import type { HeadlessProps } from '../../utils/dynamic-prop';
import { createDisabledState, createExpandedState } from '../../utils/state-props';
import { useDialogContext } from './DialogContext';
import { DIALOG_DESCRIPTION_TAG } from './tags';

export type DialogDescriptionProps<T extends ValidComponent = 'p'> = HeadlessProps<
  T,
  DisclosureStateRenderProps
>;

/**
 * The accessible description of a `Dialog`, wired up through `aria-
 * describedby`.
 *
 * Renders a `<p>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/dialog.md}
 */
export function DialogDescription<T extends ValidComponent = 'p'>(
  props: DialogDescriptionProps<T>,
): JSX.Element {
  const context = useDialogContext('DialogDescription');
  const state = useDisclosureState();
  const disabledState = createDisabledState(() => state.disabled());
  const expandedState = createExpandedState(() => state.isOpen());
  const id = (): string => (props as { id?: string }).id ?? context.descriptionID;
  context.registerDescription(id);
  const rest = omit(props, 'as', 'children');
  const Root = dynamic(() => props.as || 'p');
  return (
    <Root {...DIALOG_DESCRIPTION_TAG} id={id()} {...disabledState} {...expandedState} {...rest}>
      <DisclosureStateChild>{props.children}</DisclosureStateChild>
    </Root>
  );
}
