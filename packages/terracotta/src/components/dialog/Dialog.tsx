import { Dynamic, type JSX, type ValidComponent } from '@solidjs/web';
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
import { Unmountable, type UnmountableProps } from '../../utils/unmountable';
import type { HeadlessProps } from '../../utils/dynamic-prop';
import {
  createARIADisabledState,
  createDisabledState,
  createExpandedState,
} from '../../utils/state-props';
import type { Prettify } from '../../utils/types';
import useFocusStartPoint from '../../utils/use-focus-start-point';
import { DialogContext } from './DialogContext';
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
  return (
    <DialogContext
      value={{
        ownerID,
        panelID,
        titleID,
        descriptionID,
      }}
    >
      <Unmountable unmount={props.unmount} when={state.isOpen()}>
        <Dynamic
          component={props.as || 'div'}
          {...DIALOG_TAG}
          id={ownerID}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleID}
          aria-describedby={descriptionID}
          {...disabledState}
          {...ariaDisabledState}
          {...expandedState}
          {...rest}
        >
          <DisclosureStateProvider state={state}>{props.children}</DisclosureStateProvider>
        </Dynamic>
      </Unmountable>
    </DialogContext>
  );
}
