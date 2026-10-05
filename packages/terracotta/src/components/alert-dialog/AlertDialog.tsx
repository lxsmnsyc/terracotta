import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
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
import { Unmountable, type UnmountableProps } from '../../utils/unmountable';
import type { HeadlessProps, WithRef } from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import { createDisabledState, createExpandedState } from '../../utils/state-props';
import type { Prettify } from '../../utils/types';
import { createModalFocus, createMountedID } from '../../utils/modal';
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

  const title = createMountedID(titleID);
  const description = createMountedID(descriptionID);

  const state = createDisclosureState(props);

  // `ref` is not a declared prop, but one passed anyway is still called.
  const [root, setRoot] = createForwardRef(props as WithRef<T>);
  createModalFocus(state, root);

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
  const expandedState = createExpandedState(() => state.isOpen());
  const Root = dynamic(() => props.as || 'div');
  return (
    <AlertDialogContext
      value={{
        ownerID,
        panelID,
        titleID,
        descriptionID,
        registerTitle: title.register,
        registerDescription: description.register,
      }}
    >
      <Unmountable unmount={props.unmount} when={state.isOpen()}>
        <Root
          {...ALERT_DIALOG_TAG}
          id={ownerID}
          role="alertdialog"
          aria-modal={state.isOpen() ? 'true' : undefined}
          aria-labelledby={title.id()}
          aria-describedby={description.id()}
          // A closed dialog kept mounted with `unmount={false}` leaves the
          // accessibility tree and the tab order, but stays visible to CSS.
          aria-hidden={state.isOpen() ? undefined : 'true'}
          inert={!state.isOpen()}
          {...disabledState}
          {...expandedState}
          {...rest}
          // After `rest`, so a `ref` in it does not replace this one.
          ref={setRoot}
        >
          <DisclosureStateProvider state={state}>{props.children}</DisclosureStateProvider>
        </Root>
      </Unmountable>
    </AlertDialogContext>
  );
}
