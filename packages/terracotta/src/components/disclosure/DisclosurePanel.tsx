import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { omit } from 'solid-js';
import type { DisclosureStateRenderProps } from '../../states/create-disclosure-state';
import { DisclosureStateChild, useDisclosureState } from '../../states/create-disclosure-state';
import type { HeadlessProps } from '../../utils/dynamic-prop';
import { createDisabledState, createExpandedState } from '../../utils/state-props';
import type { Prettify } from '../../utils/types';
import { Unmountable, type UnmountableProps } from '../../utils/unmountable';
import { useDisclosureContext } from './DisclosureContext';
import { DISCLOSURE_PANEL_TAG } from './tags';

export type DisclosurePanelBaseProps = Prettify<DisclosureStateRenderProps & UnmountableProps>;

export type DisclosurePanelProps<T extends ValidComponent = 'div'> = HeadlessProps<
  T,
  DisclosurePanelBaseProps
>;

/**
 * The section a `Disclosure` shows and hides. Unmounts while closed unless
 * `unmount={false}` is set.
 *
 * Renders a `<div>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/disclosure.md}
 */
export function DisclosurePanel<T extends ValidComponent = 'div'>(
  props: DisclosurePanelProps<T>,
): JSX.Element {
  const context = useDisclosureContext('DisclosurePanel');
  const state = useDisclosureState();
  const disabled = createDisabledState(() => state.disabled());
  const expanded = createExpandedState(() => state.isOpen());
  const rest = omit(props, 'as', 'unmount', 'children');

  const Root = dynamic(() => props.as || 'div');
  return (
    <Unmountable unmount={props.unmount} when={state.isOpen()}>
      <Root {...DISCLOSURE_PANEL_TAG} id={context.panelID} {...disabled} {...expanded} {...rest}>
        <DisclosureStateChild>{props.children}</DisclosureStateChild>
      </Root>
    </Unmountable>
  );
}
