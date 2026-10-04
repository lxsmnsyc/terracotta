import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { createEffect, createUniqueId, omit } from 'solid-js';
import type {
  DisclosureStateControlledOptions,
  DisclosureStateRenderProps,
  DisclosureStateUncontrolledOptions,
} from '../../states/create-disclosure-state';
import {
  createDisclosureState,
  DisclosureStateProvider,
} from '../../states/create-disclosure-state';
import type { HeadlessProps } from '../../utils/dynamic-prop';
import {
  createARIADisabledState,
  createDisabledState,
  createExpandedState,
} from '../../utils/state-props';
import type { Prettify } from '../../utils/types';
import useFocusStartPoint from '../../utils/use-focus-start-point';
import { ContextMenuContext } from './ContextMenuContext';
import { CONTEXT_MENU_TAG } from './tags';

export type ContextMenuControlledBaseProps = Prettify<
  DisclosureStateControlledOptions & DisclosureStateRenderProps
>;

export type ContextMenuControlledProps<T extends ValidComponent = 'div'> = HeadlessProps<
  T,
  ContextMenuControlledBaseProps
>;

export type ContextMenuUncontrolledBaseProps = Prettify<
  DisclosureStateUncontrolledOptions & DisclosureStateRenderProps
>;

export type ContextMenuUncontrolledProps<T extends ValidComponent = 'div'> = HeadlessProps<
  T,
  ContextMenuUncontrolledBaseProps
>;

export type ContextMenuProps<T extends ValidComponent = 'div'> =
  | ContextMenuControlledProps<T>
  | ContextMenuUncontrolledProps<T>;

function isContextMenuUncontrolled<T extends ValidComponent = 'div'>(
  props: ContextMenuProps<T>,
): props is ContextMenuUncontrolledProps<T> {
  return 'defaultOpen' in props;
}

/**
 * A menu opened by right-click. It only manages open state and the trap; the
 * menu's own arrow-key navigation comes from putting a `Menu` inside the
 * panel.
 *
 * Renders a `<div>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/context-menu.md}
 */
export function ContextMenu<T extends ValidComponent = 'div'>(
  props: ContextMenuProps<T>,
): JSX.Element {
  const ownerID = createUniqueId();
  const boundaryID = createUniqueId();
  const panelID = createUniqueId();

  const fsp = useFocusStartPoint();

  const state = createDisclosureState(props);

  createEffect(
    () => state.isOpen(),
    (flag) => {
      if (flag) {
        fsp.save();
      } else {
        fsp.load();
      }
    },
  );

  const disabledState = createDisabledState(() => state.disabled());
  const ariaDisabledState = createARIADisabledState(() => state.disabled());
  const expandedState = createExpandedState(() => state.isOpen());
  const rest = isContextMenuUncontrolled(props)
    ? omit(props, 'as', 'children', 'defaultOpen', 'disabled', 'onChange', 'onClose', 'onOpen')
    : omit(props, 'as', 'children', 'isOpen', 'disabled', 'onChange', 'onClose', 'onOpen');
  const Root = dynamic(() => props.as || 'div');
  return (
    <ContextMenuContext
      value={{
        ownerID,
        boundaryID,
        panelID,
      }}
    >
      <Root
        {...CONTEXT_MENU_TAG}
        {...disabledState}
        {...ariaDisabledState}
        {...expandedState}
        {...rest}
      >
        <DisclosureStateProvider state={state}>{props.children}</DisclosureStateProvider>
      </Root>
    </ContextMenuContext>
  );
}
