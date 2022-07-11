import {
  createUniqueId,
  Show,
  JSX,
  mergeProps,
  createComponent,
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
import useFocusStartPoint from '../../utils/use-focus-start-point';
import {
  DialogContext,
} from './DialogContext';
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

  function renderChildren() {
    return createDynamic(
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
        {
          id: ownerID,
          role: 'alertdialog',
          'aria-modal': true,
          'aria-labelledby': titleID,
          'aria-describedby': descriptionID,
          'data-sh-dialog': ownerID,
          get children() {
            return createComponent(HeadlessDisclosureChild, {
              get children() {
                return props.children;
              },
            });
          },
        },
      ) as DynamicProps<T>,
    );
  }

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
          props.onChange?.(value);
          if (!value) {
            props.onClose?.();
            fsp.load();
          } else {
            fsp.save();
            props.onOpen?.();
          }
        },
        children: ({ isOpen }) => createComponent(Show, {
          get when() {
            return props.unmount ?? true;
          },
          get fallback() {
            return renderChildren();
          },
          get children() {
            return createComponent(Show, {
              get when() {
                return isOpen();
              },
              get children() {
                return renderChildren();
              },
            });
          },
        }),
      });
    },
  });
}
