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
import { DialogContext } from './DialogContext';
import { createModalFocus, createMountedID } from '../../utils/modal';
import { DIALOG_TAG } from './tags';

export type DialogControlledBaseProps = Prettify<
  DisclosureStateControlledOptions & DisclosureStateRenderProps & UnmountableProps
>;

export type DialogControlledProps<T extends ValidComponent = 'div'> = HeadlessProps<
  T,
  DialogControlledBaseProps
>;

export type DialogUncontrolledBaseProps = Prettify<
  DisclosureStateUncontrolledOptions & DisclosureStateRenderProps & UnmountableProps
>;

export type DialogUncontrolledProps<T extends ValidComponent = 'div'> = HeadlessProps<
  T,
  DialogUncontrolledBaseProps
>;

export type DialogProps<T extends ValidComponent = 'div'> =
  | DialogControlledProps<T>
  | DialogUncontrolledProps<T>;

function isDialogUncontrolled<T extends ValidComponent = 'div'>(
  props: DialogProps<T>,
): props is DialogUncontrolledProps<T> {
  return 'defaultOpen' in props;
}

/**
 * A modal dialog. While it is open the panel traps `Tab`, <kbd>Escape</kbd>
 * closes it, and focus returns to whatever opened it. Rendering it into a
 * portal is up to you.
 *
 * Renders a `<div>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/dialog.md}
 */
export function Dialog<T extends ValidComponent = 'div'>(props: DialogProps<T>): JSX.Element {
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

  const disabledState = createDisabledState(() => state.disabled());
  const expandedState = createExpandedState(() => state.isOpen());
  const rest = isDialogUncontrolled(props)
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
  const Root = dynamic(() => props.as || 'div');
  return (
    <DialogContext
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
          {...DIALOG_TAG}
          id={ownerID}
          role="dialog"
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
    </DialogContext>
  );
}
