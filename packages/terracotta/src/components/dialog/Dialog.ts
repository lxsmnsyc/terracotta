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
  DialogContext,
} from './DialogContext';
import { DIALOG_TAG } from './tags';
import { Prettify } from '../../utils/types';
import {
  DisclosureStateControlledOptions,
  DisclosureStateProvider,
  DisclosureStateRenderProps,
  DisclosureStateUncontrolledOptions,
  createDisclosureState,
} from '../../states/create-disclosure-state';

export type DialogControlledBaseProps = Prettify<
  & DisclosureStateControlledOptions
  & DisclosureStateRenderProps
  & UnmountableProps
>;

export type DialogControlledProps<T extends ValidConstructor = 'div'> =
  HeadlessProps<T, DialogControlledBaseProps>;

export type DialogUncontrolledBaseProps = Prettify<
  & DisclosureStateUncontrolledOptions
  & DisclosureStateRenderProps
  & UnmountableProps
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
        () => createDynamic(
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
          ) as DynamicProps<T>,
        ),
      );
    },
  });
}
