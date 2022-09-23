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
  HeadlessDisclosureRoot,
  HeadlessDisclosureControlledOptions,
  createHeadlessDisclosureChildProps,
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

type DialogControlledBaseProps =
  & DialogBaseProps
  & HeadlessDisclosureControlledOptions;

export type DialogControlledProps<T extends ValidConstructor = 'div'> =
  HeadlessProps<T, DialogControlledBaseProps>;

export function DialogControlled<T extends ValidConstructor = 'div'>(
  props: DialogControlledProps<T>,
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
        get isOpen() {
          return props.isOpen;
        },
        get disabled() {
          return props.disabled;
        },
        onChange(value) {
          if (value) {
            fsp.save();
            props.onOpen?.();
          }
          props.onChange?.(value);
          if (!value) {
            props.onClose?.();
            fsp.load();
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
                'isOpen',
                'disabled',
                'onOpen',
                'onClose',
                'onChange',
              ]),
              DIALOG_TAG,
              {
                id: ownerID,
                role: 'dialog',
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
