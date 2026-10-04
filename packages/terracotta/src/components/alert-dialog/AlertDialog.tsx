import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { createTrackedEffect, createUniqueId, omit } from 'solid-js';
import type {
  DisclosureStateControlledOptions,
  DisclosureStateRenderProps,
  DisclosureStateUncontrolledOptions,
} from '../../states/create-disclosure-state';
import {
  createDisclosureState,
  DisclosureStateProvider,
} from '../../states/create-disclosure-state';
import { Unmountable, type UnmountableProps } from '../../utils/unmountable';
import type { HeadlessProps } from '../../utils/dynamic-prop';
import {
  createARIADisabledState,
  createDisabledState,
  createExpandedState,
} from '../../utils/state-props';
import type { Prettify } from '../../utils/types';
import useFocusStartPoint from '../../utils/use-focus-start-point';
import { AlertDialogContext } from './AlertDialogContext';
import { ALERT_DIALOG_TAG } from './tags';

export type AlertDialogControlledBaseProps = Prettify<
  DisclosureStateControlledOptions & DisclosureStateRenderProps & UnmountableProps
>;

export type AlertDialogControlledProps<T extends ValidComponent = 'div'> = HeadlessProps<
  T,
  AlertDialogControlledBaseProps
>;

export type AlertDialogUncontrolledBaseProps = Prettify<
  DisclosureStateUncontrolledOptions & DisclosureStateRenderProps & UnmountableProps
>;

export type AlertDialogUncontrolledProps<T extends ValidComponent = 'div'> = HeadlessProps<
  T,
  AlertDialogUncontrolledBaseProps
>;

export type AlertDialogProps<T extends ValidComponent = 'div'> =
  | AlertDialogControlledProps<T>
  | AlertDialogUncontrolledProps<T>;

function isAlertDialogUncontrolled<T extends ValidComponent = 'div'>(
  props: AlertDialogProps<T>,
): props is AlertDialogUncontrolledProps<T> {
  return 'defaultOpen' in props;
}

/**
 * A modal that interrupts the user to confirm an action. Same behaviour as
 * `Dialog`, but with `role="alertdialog"`, so it is announced immediately. Use
 * it only for messages that require a response.
 *
 * Renders a `<div>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/alert-dialog.md}
 */
export function AlertDialog<T extends ValidComponent = 'div'>(
  props: AlertDialogProps<T>,
): JSX.Element {
  const ownerID = createUniqueId();
  const panelID = createUniqueId();
  const titleID = createUniqueId();
  const descriptionID = createUniqueId();

  const fsp = useFocusStartPoint();

  const state = createDisclosureState(props);

  createTrackedEffect(() => {
    if (state.isOpen()) {
      fsp.save();
    } else {
      fsp.load();
    }
  });

  const rest = isAlertDialogUncontrolled(props)
    ? omit(
        props,
        'as',
        'children',
        'defaultOpen',
        'disabled',
        'onChange',
        'onClose',
        'onOpen',
        'unmount',
      )
    : omit(
        props,
        'as',
        'children',
        'isOpen',
        'disabled',
        'onChange',
        'onClose',
        'onOpen',
        'unmount',
      );
  const disabledState = createDisabledState(() => state.disabled());
  const ariaDisabledState = createARIADisabledState(() => state.disabled());
  const expandedState = createExpandedState(() => state.isOpen());
  const Root = dynamic(() => props.as || 'div');
  return (
    <AlertDialogContext
      value={{
        ownerID,
        panelID,
        titleID,
        descriptionID,
      }}
    >
      <Unmountable unmount={props.unmount} when={state.isOpen()}>
        <Root
          {...rest}
          {...ALERT_DIALOG_TAG}
          id={ownerID}
          role="alertdialog"
          aria-modal="true"
          aria-labelledby={titleID}
          aria-describedby={descriptionID}
          {...disabledState}
          {...ariaDisabledState}
          {...expandedState}
        >
          <DisclosureStateProvider state={state}>{props.children}</DisclosureStateProvider>
        </Root>
      </Unmountable>
    </AlertDialogContext>
  );
}
