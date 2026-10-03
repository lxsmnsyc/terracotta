import { Dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { createUniqueId, omit } from 'solid-js';
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
import { DisclosureContext } from './DisclosureContext';
import { DISCLOSURE_TAG } from './tags';

export type DisclosureControlledBaseProps = Prettify<
  DisclosureStateControlledOptions & DisclosureStateRenderProps
>;

export type DisclosureControlledProps<T extends ValidComponent = 'div'> = HeadlessProps<
  T,
  DisclosureControlledBaseProps
>;

export type DisclosureUncontrolledBaseProps = Prettify<
  DisclosureStateUncontrolledOptions & DisclosureStateRenderProps
>;

export type DisclosureUncontrolledProps<T extends ValidComponent = 'div'> = HeadlessProps<
  T,
  DisclosureUncontrolledBaseProps
>;

export type DisclosureProps<T extends ValidComponent = 'div'> =
  | DisclosureControlledProps<T>
  | DisclosureUncontrolledProps<T>;

function isDisclosureUncontrolled<T extends ValidComponent = 'div'>(
  props: DisclosureProps<T>,
): props is DisclosureUncontrolledProps<T> {
  return 'defaultOpen' in props;
}

/**
 * A button that shows and hides a section. The simplest stateful component in
 * the library, and the base the dialog-like components are built on.
 *
 * Renders a `<div>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/disclosure.md}
 */
export function Disclosure<T extends ValidComponent = 'div'>(
  props: DisclosureProps<T>,
): JSX.Element {
  const ownerID = createUniqueId();
  const buttonID = createUniqueId();
  const panelID = createUniqueId();
  const state = createDisclosureState(props);

  const disabledState = createDisabledState(() => state.disabled());
  const ariaDisabledState = createARIADisabledState(() => state.disabled());
  const expandedState = createExpandedState(() => state.isOpen());
  const rest = isDisclosureUncontrolled(props)
    ? omit(props, 'as', 'children', 'defaultOpen', 'disabled', 'onChange', 'onClose', 'onOpen')
    : omit(props, 'as', 'children', 'isOpen', 'disabled', 'onChange', 'onClose', 'onOpen');
  return (
    <DisclosureContext
      value={{
        ownerID,
        buttonID,
        panelID,
      }}
    >
      <Dynamic
        component={props.as || 'div'}
        {...DISCLOSURE_TAG}
        {...disabledState}
        {...ariaDisabledState}
        {...expandedState}
        {...rest}
      >
        <DisclosureStateProvider state={state}>{props.children}</DisclosureStateProvider>
      </Dynamic>
    </DisclosureContext>
  );
}
