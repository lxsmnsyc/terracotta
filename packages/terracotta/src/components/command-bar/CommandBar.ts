import { createDynamic } from '@solidjs/web';
import type { ComponentProps, JSX, ValidComponent } from 'solid-js';
import {
  createComponent,
  createEffect,
  createUniqueId,
  merge,
  onSettled,
  omit,
} from 'solid-js';
import type {
  DisclosureStateControlledOptions,
  DisclosureStateRenderProps,
  DisclosureStateUncontrolledOptions,
} from '../../states/create-disclosure-state';
import {
  createDisclosureState,
  DisclosureStateProvider,
} from '../../states/create-disclosure-state';
import type { UnmountableProps } from '../../utils/create-unmountable';
import { createUnmountable } from '../../utils/create-unmountable';
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
  DisclosureStateControlledOptions &
    DisclosureStateRenderProps &
    UnmountableProps
>;

export type CommandBarControlledProps<T extends ValidComponent = 'div'> =
  HeadlessProps<T, CommandBarControlledBaseProps>;

export type CommandBarUncontrolledBaseProps = Prettify<
  DisclosureStateUncontrolledOptions &
    DisclosureStateRenderProps &
    UnmountableProps
>;

export type CommandBarUncontrolledProps<T extends ValidComponent = 'div'> =
  HeadlessProps<T, CommandBarUncontrolledBaseProps>;

export type CommandBarProps<T extends ValidComponent = 'div'> =
  | CommandBarControlledProps<T>
  | CommandBarUncontrolledProps<T>;

function isCommandBarUncontrolled<T extends ValidComponent = 'div'>(
  props: CommandBarProps<T>,
): props is CommandBarUncontrolledProps<T> {
  return 'defaultOpen' in props;
}

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
    flag => {
      if (flag) {
        fsp.save();
      } else {
        fsp.load();
      }
    },
  );

  onSettled(() =>
    useEventListener(window, 'keydown', e => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k' && !e.defaultPrevented) {
        e.preventDefault();
        state.open();
      }
    }),
  );

  return createComponent(CommandBarContext, {
    value: {
      ownerID,
      panelID,
      titleID,
      descriptionID,
    },
    get children() {
      return createUnmountable(
        props,
        () => state.isOpen(),
        () =>
          createDynamic(
            () => props.as || ('div' as T),
            merge(
              COMMAND_BAR_TAG,
              createDisabledState(() => state.disabled()),
              createARIADisabledState(() => state.disabled()),
              createExpandedState(() => state.isOpen()),
              {
                id: ownerID,
                role: 'dialog',
                'aria-modal': true,
                'aria-labelledby': titleID,
                'aria-describedby': descriptionID,
                get children() {
                  return createComponent(DisclosureStateProvider, {
                    state,
                    get children() {
                      return props.children;
                    },
                  });
                },
              },
              isCommandBarUncontrolled(props)
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
                  ),
            ) as ComponentProps<T>,
          ),
      );
    },
  });
}
