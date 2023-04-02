import {
  createUniqueId,
  JSX,
  mergeProps,
  createComponent,
  createEffect,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use/props';
import createDynamic from '../../utils/create-dynamic';
import {
  ValidConstructor,
  HeadlessProps,
  DynamicProps,
} from '../../utils/dynamic-prop';
import {
  UnmountableProps,
  createUnmountable,
} from '../../utils/create-unmountable';
import useFocusStartPoint from '../../utils/use-focus-start-point';
import {
  AlertDialogContext,
} from './AlertDialogContext';
import { ALERT_DIALOG_TAG } from './tags';
import { Prettify } from '../../utils/types';
import {
  DisclosureStateControlledOptions,
  DisclosureStateProvider,
  DisclosureStateRenderProps,
  DisclosureStateUncontrolledOptions,
  createDisclosureState,
} from '../../states/create-disclosure-state';

export type AlertDialogControlledBaseProps = Prettify<
  & DisclosureStateControlledOptions
  & DisclosureStateRenderProps
  & UnmountableProps
>;

export type AlertDialogControlledProps<T extends ValidConstructor = 'div'> =
  HeadlessProps<T, AlertDialogControlledBaseProps>;

export type AlertDialogUncontrolledBaseProps = Prettify<
  & DisclosureStateUncontrolledOptions
  & DisclosureStateRenderProps
  & UnmountableProps
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
        () => createDynamic(
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
          ) as DynamicProps<T>,
        ),
      );
    },
  });
}