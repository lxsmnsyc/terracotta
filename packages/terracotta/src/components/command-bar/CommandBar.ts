import {
  createComponent,
  createEffect,
  createUniqueId,
  JSX,
  mergeProps,
  onCleanup,
} from 'solid-js';
import { omitProps } from 'solid-use/props';
import {
  DynamicProps,
  HeadlessProps,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import { Prettify } from '../../utils/types';
import {
  createDisclosureState,
  DisclosureStateControlledOptions,
  DisclosureStateProvider,
  DisclosureStateRenderProps,
  DisclosureStateUncontrolledOptions,
} from '../../states/create-disclosure-state';
import useFocusStartPoint from '../../utils/use-focus-start-point';
import { CommandBarContext } from './CommandBarContext';
import { createUnmountable, UnmountableProps } from '../../utils/create-unmountable';
import createDynamic from '../../utils/create-dynamic';
import { COMMAND_BAR_TAG } from './tags';
import { createDisabledState, createExpandedState } from '../../utils/state-props';

export type CommandBarControlledBaseProps = Prettify<
  & DisclosureStateControlledOptions
  & DisclosureStateRenderProps
  & UnmountableProps
>;

export type CommandBarControlledProps<T extends ValidConstructor = 'div'> =
  HeadlessProps<T, CommandBarControlledBaseProps>;

export type CommandBarUncontrolledBaseProps = Prettify<
  & DisclosureStateUncontrolledOptions
  & DisclosureStateRenderProps
  & UnmountableProps
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
    const onKeyDown = (ev: KeyboardEvent) => {
      if ((ev.metaKey || ev.ctrlKey) && ev.key === 'k' && ev.defaultPrevented === false) {
        ev.preventDefault();
        state.open();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    onCleanup(() => {
      window.removeEventListener('keydown', onKeyDown);
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
        () => createDynamic(
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
