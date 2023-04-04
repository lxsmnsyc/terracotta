import {
  createComponent,
  createEffect,
  createUniqueId,
  JSX,
  mergeProps,
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
import { ContextMenuContext } from './ContextMenuContext';
import { createDisabledState, createExpandedState } from '../../utils/state-props';
import createDynamic from '../../utils/create-dynamic';
import { CONTEXT_MENU_TAG } from './tags';

export type ContextMenuControlledBaseProps = Prettify<
  & DisclosureStateControlledOptions
  & DisclosureStateRenderProps
>;

export type ContextMenuControlledProps<T extends ValidConstructor = 'div'> =
  HeadlessProps<T, ContextMenuControlledBaseProps>;

export type ContextMenuUncontrolledBaseProps = Prettify<
  & DisclosureStateUncontrolledOptions
  & DisclosureStateRenderProps
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
