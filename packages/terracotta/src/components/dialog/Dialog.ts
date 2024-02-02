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
import useFocusStartPoint from '../../utils/use-focus-start-point';
import { DialogContext } from './DialogContext';
import { DIALOG_TAG } from './tags';

export type DialogControlledBaseProps = Prettify<
  DisclosureStateControlledOptions &
    DisclosureStateRenderProps &
    UnmountableProps
>;

export type DialogControlledProps<T extends ValidConstructor = 'div'> =
  HeadlessProps<T, DialogControlledBaseProps>;

export type DialogUncontrolledBaseProps = Prettify<
  DisclosureStateUncontrolledOptions &
    DisclosureStateRenderProps &
    UnmountableProps
>;

export type DialogUncontrolledProps<T extends ValidConstructor = 'div'> =
  HeadlessProps<T, DialogUncontrolledBaseProps>;

export type DialogProps<T extends ValidConstructor = 'div'> =
  | DialogControlledProps<T>
  | DialogUncontrolledProps<T>;

function isDialogUncontrolled<T extends ValidConstructor = 'div'>(
  props: DialogProps<T>,
): props is DialogUncontrolledProps<T> {
  return 'defaultOpen' in props;
}

export function Dialog<T extends ValidConstructor = 'div'>(
  props: DialogProps<T>,
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

  return createComponent(DialogContext.Provider, {
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
              isDialogUncontrolled(props)
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
              DIALOG_TAG,
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
              createDisabledState(() => state.disabled()),
              createARIADisabledState(() => state.disabled()),
              createExpandedState(() => state.isOpen()),
            ) as DynamicProps<T>,
          ),
      );
    },
  });
}
