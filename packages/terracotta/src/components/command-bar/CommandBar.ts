import type { JSX } from 'solid-js';
import {
  createComponent,
  createEffect,
  createUniqueId,
  mergeProps,
} from 'solid-js';
import { omitProps } from 'solid-use/props';
import type {
  DisclosureStateControlledOptions,
  DisclosureStateRenderProps,
  DisclosureStateUncontrolledOptions,
} from '../../states/create-disclosure-state';
import {
  DisclosureStateProvider,
  createDisclosureState,
} from '../../states/create-disclosure-state';
import createDynamic from '../../utils/create-dynamic';
import type { UnmountableProps } from '../../utils/create-unmountable';
import { createUnmountable } from '../../utils/create-unmountable';
import type {
  DynamicProps,
  HeadlessProps,
  ValidConstructor,
} from '../../utils/dynamic-prop';
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

export type CommandBarControlledProps<T extends ValidConstructor = 'div'> =
  HeadlessProps<T, CommandBarControlledBaseProps>;

export type CommandBarUncontrolledBaseProps = Prettify<
  DisclosureStateUncontrolledOptions &
    DisclosureStateRenderProps &
    UnmountableProps
>;

export type CommandBarUncontrolledProps<T extends ValidConstructor = 'div'> =
  HeadlessProps<T, CommandBarUncontrolledBaseProps>;

export type CommandBarProps<T extends ValidConstructor = 'div'> =
  | CommandBarControlledProps<T>
  | CommandBarUncontrolledProps<T>;

function isCommandBarUncontrolled<T extends ValidConstructor = 'div'>(
  props: CommandBarProps<T>,
): props is CommandBarUncontrolledProps<T> {
  return 'defaultOpen' in props;
}

export function CommandBar<T extends ValidConstructor = 'div'>(
  props: CommandBarProps<T>,
): JSX.Element {
  const ownerID = createUniqueId();
  const panelID = createUniqueId();
  const titleID = createUniqueId();
  const descriptionID = createUniqueId();
  const fsp = useFocusStartPoint();

  const state = createDisclosureState(props);

  createEffect(() => {
    if (state.isOpen()) {
      fsp.save();
    } else {
      fsp.load();
    }
  });

  createEffect(() => {
    useEventListener(window, 'keydown', e => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k' && !e.defaultPrevented) {
        e.preventDefault();
        state.open();
      }
    });
  });

  return createComponent(CommandBarContext.Provider, {
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
            mergeProps(
              isCommandBarUncontrolled(props)
                ? omitProps(props, [
                    'as',
                    'children',
                    'defaultOpen',
                    'disabled',
                    'onChange',
                    'onClose',
                    'onOpen',
                    'unmount',
                  ])
                : omitProps(props, [
                    'as',
                    'children',
                    'isOpen',
                    'disabled',
                    'onChange',
                    'onClose',
                    'onOpen',
                    'unmount',
                  ]),
              {
                id: ownerID,
                role: 'dialog',
                'aria-modal': true,
                'aria-labelledby': titleID,
                'aria-describedby': descriptionID,
              },
              COMMAND_BAR_TAG,
              createDisabledState(() => state.disabled()),
              createARIADisabledState(() => state.disabled()),
              createExpandedState(() => state.isOpen()),
              {
                get children() {
                  return createComponent(DisclosureStateProvider, {
                    state,
                    get children() {
                      return props.children;
                    },
                  });
                },
              },
            ) as DynamicProps<T>,
          ),
      );
    },
  });
}
