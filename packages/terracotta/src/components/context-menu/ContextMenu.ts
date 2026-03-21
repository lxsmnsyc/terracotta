import { createDynamic } from '@solidjs/web';
import type { ComponentProps, JSX, ValidComponent } from 'solid-js';
import {
  createComponent,
  createEffect,
  createUniqueId,
  merge,
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
import type { HeadlessProps } from '../../utils/dynamic-prop';
import {
  createARIADisabledState,
  createDisabledState,
  createExpandedState,
} from '../../utils/state-props';
import type { Prettify } from '../../utils/types';
import useFocusStartPoint from '../../utils/use-focus-start-point';
import { ContextMenuContext } from './ContextMenuContext';
import { CONTEXT_MENU_TAG } from './tags';

export type ContextMenuControlledBaseProps = Prettify<
  DisclosureStateControlledOptions & DisclosureStateRenderProps
>;

export type ContextMenuControlledProps<T extends ValidComponent = 'div'> =
  HeadlessProps<T, ContextMenuControlledBaseProps>;

export type ContextMenuUncontrolledBaseProps = Prettify<
  DisclosureStateUncontrolledOptions & DisclosureStateRenderProps
>;

export type ContextMenuUncontrolledProps<T extends ValidComponent = 'div'> =
  HeadlessProps<T, ContextMenuUncontrolledBaseProps>;

export type ContextMenuProps<T extends ValidComponent = 'div'> =
  | ContextMenuControlledProps<T>
  | ContextMenuUncontrolledProps<T>;

function isContextMenuUncontrolled<T extends ValidComponent = 'div'>(
  props: ContextMenuProps<T>,
): props is ContextMenuUncontrolledProps<T> {
  return 'defaultOpen' in props;
}

export function ContextMenu<T extends ValidComponent = 'div'>(
  props: ContextMenuProps<T>,
): JSX.Element {
  const ownerID = createUniqueId();
  const boundaryID = createUniqueId();
  const panelID = createUniqueId();

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

  return createComponent(ContextMenuContext, {
    value: {
      ownerID,
      boundaryID,
      panelID,
    },
    get children() {
      return createDynamic(
        () => props.as || ('div' as T),
        merge(
          CONTEXT_MENU_TAG,
          createDisabledState(() => state.disabled()),
          createARIADisabledState(() => state.disabled()),
          createExpandedState(() => state.isOpen()),
          isContextMenuUncontrolled(props)
            ? omit(
                props,
                'as',
                'children',
                'defaultOpen',
                'disabled',
                'onChange',
                'onClose',
                'onOpen',
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
              ),
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
        ) as ComponentProps<T>,
      );
    },
  });
}
