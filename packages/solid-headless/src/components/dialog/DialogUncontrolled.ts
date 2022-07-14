import {
  createUniqueId,
  JSX,
  mergeProps,
  createComponent,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use';
import {
  createHeadlessDisclosureChildProps,
  HeadlessDisclosureRoot,
  HeadlessDisclosureUncontrolledOptions,
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
  DialogContext,
} from './DialogContext';
import { DIALOG_TAG } from './tags';
import {
  DialogBaseProps,
} from './types';

type DialogUncontrolledBaseProps =
  & DialogBaseProps
  & HeadlessDisclosureUncontrolledOptions;

export type DialogUncontrolledProps<T extends ValidConstructor = 'div'> =
  HeadlessProps<T, DialogUncontrolledBaseProps>;

export function DialogUncontrolled<T extends ValidConstructor = 'div'>(
  props: DialogUncontrolledProps<T>,
): JSX.Element {
  const ownerID = createUniqueId();
  const panelID = createUniqueId();
  const titleID = createUniqueId();
  const descriptionID = createUniqueId();

  const fsp = useFocusStartPoint();

  return createComponent(DialogContext.Provider, {
    value: {
      ownerID,
      panelID,
      titleID,
      descriptionID,
    },
    get children() {
      return createComponent(HeadlessDisclosureRoot, {
        get defaultOpen() {
          return props.defaultOpen;
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
            () => props.as ?? ('div' as T),
            mergeProps(
              omitProps(props, [
                'as',
                'children',
                'unmount',
                'defaultOpen',
                'disabled',
                'onOpen',
                'onClose',
                'onChange',
              ]),
              DIALOG_TAG,
              {
                id: ownerID,
                role: 'alertdialog',
                'aria-modal': true,
                'aria-labelledby': titleID,
                'aria-describedby': descriptionID,
              },
              createHeadlessDisclosureChildProps(props),
            ) as DynamicProps<T>,
          ),
        ),
      });
    },
  });
}
