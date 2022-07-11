import {
  createComponent,
  createUniqueId,
  JSX,
  mergeProps,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use';
import {
  HeadlessDisclosureChild,
  HeadlessDisclosureRoot,
  HeadlessDisclosureControlledOptions,
} from '../../headless/disclosure';
import createDynamic from '../../utils/create-dynamic';
import {
  ValidConstructor,
  HeadlessProps,
  DynamicProps,
} from '../../utils/dynamic-prop';
import {
  createUnmountable,
} from '../../utils/Unmountable';
import useFocusStartPoint from '../../utils/use-focus-start-point';
import {
  AlertDialogContext,
} from './AlertDialogContext';
import {
  AlertDialogBaseProps,
} from './types';

export type AlertDialogControlledBaseProps =
  & AlertDialogBaseProps
  & HeadlessDisclosureControlledOptions;

export type AlertDialogControlledProps<T extends ValidConstructor = 'div'> =
  HeadlessProps<T, AlertDialogControlledBaseProps>;

export function AlertDialogControlled<T extends ValidConstructor = 'div'>(
  props: AlertDialogControlledProps<T>,
): JSX.Element {
  const ownerID = createUniqueId();
  const panelID = createUniqueId();
  const titleID = createUniqueId();
  const descriptionID = createUniqueId();

  const fsp = useFocusStartPoint();

  return createComponent(AlertDialogContext.Provider, {
    value: {
      ownerID,
      panelID,
      titleID,
      descriptionID,
    },
    get children() {
      return createComponent(HeadlessDisclosureRoot, {
        get isOpen() {
          return props.isOpen;
        },
        get disabled() {
          return props.disabled;
        },
        onChange(value) {
          props.onChange?.(value);
          if (!value) {
            props.onClose?.();
            fsp.load();
          } else {
            fsp.save();
            props.onOpen?.();
          }
        },
        children: ({ isOpen }) => createUnmountable(
          props,
          isOpen,
          () => createDynamic(
            () => props.as ?? 'div',
            mergeProps(
              omitProps(props, [
                'as',
                'children',
                'unmount',
                'isOpen',
                'disabled',
                'onOpen',
                'onClose',
                'onChange',
              ]),
              {
                id: ownerID,
                role: 'alertdialog',
                'aria-modal': true,
                'aria-labelledby': titleID,
                'aria-describedby': descriptionID,
                'data-sh-alert-dialog': ownerID,
                get children() {
                  return createComponent(HeadlessDisclosureChild, {
                    get children() {
                      return props.children;
                    },
                  });
                },
              },
            ) as DynamicProps<T>,
          ),
        ),
      });
    },
  });
}
