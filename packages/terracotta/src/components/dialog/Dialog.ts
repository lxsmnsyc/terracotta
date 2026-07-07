import type { ComponentProps, JSX, ValidComponent } from '@solidjs/web';
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
import createDynamic from '../../utils/create-dynamic';
import type { UnmountableProps } from '../../utils/create-unmountable';
import { createUnmountable } from '../../utils/create-unmountable';
import type { HeadlessProps } from '../../utils/dynamic-prop';
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

export type DialogControlledProps<T extends ValidComponent = 'div'> =
  HeadlessProps<T, DialogControlledBaseProps>;

export type DialogUncontrolledBaseProps = Prettify<
  DisclosureStateUncontrolledOptions &
    DisclosureStateRenderProps &
    UnmountableProps
>;

export type DialogUncontrolledProps<T extends ValidComponent = 'div'> =
  HeadlessProps<T, DialogUncontrolledBaseProps>;

export type DialogProps<T extends ValidComponent = 'div'> =
  | DialogControlledProps<T>
  | DialogUncontrolledProps<T>;

function isDialogUncontrolled<T extends ValidComponent = 'div'>(
  props: DialogProps<T>,
): props is DialogUncontrolledProps<T> {
  return 'defaultOpen' in props;
}

export function Dialog<T extends ValidComponent = 'div'>(
  props: DialogProps<T>,
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

  return createComponent(DialogContext, {
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
              isDialogUncontrolled(props)
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
