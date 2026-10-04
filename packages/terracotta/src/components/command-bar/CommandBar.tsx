import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { createEffect, createUniqueId, omit, onSettled } from 'solid-js';
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
import useEventListener from '../../utils/use-event-listener';
import useFocusStartPoint from '../../utils/use-focus-start-point';
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

  onSettled(() =>
    useEventListener(window, 'keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k' && !e.defaultPrevented) {
        e.preventDefault();
        state.open();
      }
    }),
  );

  const disabledState = createDisabledState(() => state.disabled());
  const ariaDisabledState = createARIADisabledState(() => state.disabled());
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
      }}
    >
      <Unmountable unmount={props.unmount} when={state.isOpen()}>
        <Root
          {...COMMAND_BAR_TAG}
          {...disabledState}
          {...ariaDisabledState}
          {...expandedState}
          id={ownerID}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleID}
          aria-describedby={descriptionID}
          {...rest}
        >
          <DisclosureStateProvider state={state}>{props.children}</DisclosureStateProvider>
        </Root>
      </Unmountable>
    </CommandBarContext>
  );
}
