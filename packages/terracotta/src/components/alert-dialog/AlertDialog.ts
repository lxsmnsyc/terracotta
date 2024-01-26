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
import { AlertDialogContext } from './AlertDialogContext';
import { ALERT_DIALOG_TAG } from './tags';

export type AlertDialogControlledBaseProps = Prettify<
  DisclosureStateControlledOptions &
    DisclosureStateRenderProps &
    UnmountableProps
>;

export type AlertDialogControlledProps<T extends ValidConstructor = 'div'> =
  HeadlessProps<T, AlertDialogControlledBaseProps>;

export type AlertDialogUncontrolledBaseProps = Prettify<
  DisclosureStateUncontrolledOptions &
    DisclosureStateRenderProps &
    UnmountableProps
>;

export type AlertDialogUncontrolledProps<T extends ValidConstructor = 'div'> =
  HeadlessProps<T, AlertDialogUncontrolledBaseProps>;

export type AlertDialogProps<T extends ValidConstructor = 'div'> =
  | AlertDialogControlledProps<T>
  | AlertDialogUncontrolledProps<T>;

function isAlertDialogUncontrolled<T extends ValidConstructor = 'div'>(
  props: AlertDialogProps<T>,
): props is AlertDialogUncontrolledProps<T> {
  return 'defaultOpen' in props;
}

export function AlertDialog<T extends ValidConstructor = 'div'>(
  props: AlertDialogProps<T>,
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

  return createComponent(AlertDialogContext.Provider, {
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
              isAlertDialogUncontrolled(props)
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
              ALERT_DIALOG_TAG,
              {
                id: ownerID,
                role: 'alertdialog',
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
