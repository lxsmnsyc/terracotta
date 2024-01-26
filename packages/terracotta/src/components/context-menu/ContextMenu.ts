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
import useFocusStartPoint from '../../utils/use-focus-start-point';
import { ContextMenuContext } from './ContextMenuContext';
import { CONTEXT_MENU_TAG } from './tags';

export type ContextMenuControlledBaseProps = Prettify<
  DisclosureStateControlledOptions & DisclosureStateRenderProps
>;

export type ContextMenuControlledProps<T extends ValidConstructor = 'div'> =
  HeadlessProps<T, ContextMenuControlledBaseProps>;

export type ContextMenuUncontrolledBaseProps = Prettify<
  DisclosureStateUncontrolledOptions & DisclosureStateRenderProps
>;

export type ContextMenuUncontrolledProps<T extends ValidConstructor = 'div'> =
  HeadlessProps<T, ContextMenuUncontrolledBaseProps>;

export type ContextMenuProps<T extends ValidConstructor = 'div'> =
  | ContextMenuControlledProps<T>
  | ContextMenuUncontrolledProps<T>;

function isContextMenuUncontrolled<T extends ValidConstructor = 'div'>(
  props: ContextMenuProps<T>,
): props is ContextMenuUncontrolledProps<T> {
  return 'defaultOpen' in props;
}

export function ContextMenu<T extends ValidConstructor = 'div'>(
  props: ContextMenuProps<T>,
): JSX.Element {
  const ownerID = createUniqueId();
  const boundaryID = createUniqueId();
  const panelID = createUniqueId();

  const fsp = useFocusStartPoint();

  const state = createDisclosureState(props);

  createEffect(() => {
    if (state.isOpen()) {
      fsp.save();
    } else {
      fsp.load();
    }
  });

  return createComponent(ContextMenuContext.Provider, {
    value: {
      ownerID,
      boundaryID,
      panelID,
    },
    get children() {
      return createDynamic(
        () => props.as || ('div' as T),
        mergeProps(
          isContextMenuUncontrolled(props)
            ? omitProps(props, [
                'as',
                'children',
                'defaultOpen',
                'disabled',
                'onChange',
                'onClose',
                'onOpen',
              ])
            : omitProps(props, [
                'as',
                'children',
                'isOpen',
                'disabled',
                'onChange',
                'onClose',
                'onOpen',
              ]),
          CONTEXT_MENU_TAG,
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
      );
    },
  });
}
