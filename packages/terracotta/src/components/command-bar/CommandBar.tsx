import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { createUniqueId, omit, onSettled } from 'solid-js';
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
import useEventListener from '../../utils/use-event-listener';
import { createModalFocus, createMountedID } from '../../utils/modal';
import { CommandBarContext } from './CommandBarContext';
import { COMMAND_BAR_TAG } from './tags';
export type CommandBarControlledBaseProps = Prettify<
  DisclosureStateControlledOptions & DisclosureStateRenderProps & UnmountableProps
>;

export type CommandBarControlledProps<T extends ValidComponent = 'div'> = HeadlessProps<
  T,
  CommandBarControlledBaseProps
>;

export type CommandBarUncontrolledBaseProps = Prettify<
  DisclosureStateUncontrolledOptions & DisclosureStateRenderProps & UnmountableProps
>;

export type CommandBarUncontrolledProps<T extends ValidComponent = 'div'> = HeadlessProps<
  T,
  CommandBarUncontrolledBaseProps
>;

export type CommandBarProps<T extends ValidComponent = 'div'> =
  | CommandBarControlledProps<T>
  | CommandBarUncontrolledProps<T>;

function isCommandBarUncontrolled<T extends ValidComponent = 'div'>(
  props: CommandBarProps<T>,
): props is CommandBarUncontrolledProps<T> {
  return 'defaultOpen' in props;
}

/**
 * A modal opened by a keyboard shortcut,
 * <kbd>Cmd</kbd>/<kbd>Ctrl</kbd>+<kbd>K</kbd> by default. It is a dialog, not
 * a palette on its own: put a `Command` inside it for the searchable part.
 *
 * Renders a `<div>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/command-bar.md}
 */
export function CommandBar<T extends ValidComponent = 'div'>(
  props: CommandBarProps<T>,
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

  onSettled(() =>
    useEventListener(window, 'keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k' && !e.defaultPrevented) {
        e.preventDefault();
        state.open();
      }
    }),
  );

  const disabledState = createDisabledState(() => state.disabled());
  const expandedState = createExpandedState(() => state.isOpen());
  const rest = isCommandBarUncontrolled(props)
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
    <CommandBarContext
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
          {...COMMAND_BAR_TAG}
          id={ownerID}
          role="dialog"
          aria-modal={state.isOpen() ? 'true' : undefined}
          aria-labelledby={title.id()}
          aria-describedby={description.id()}
          // A closed command bar kept mounted with `unmount={false}` leaves the
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
    </CommandBarContext>
  );
}
