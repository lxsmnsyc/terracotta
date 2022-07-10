import {
  createComponent,
  createUniqueId,
  JSX,
  mergeProps,
  Show,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use';
import {
  HeadlessDisclosureChild,
} from '../../headless/disclosure/HeadlessDisclosureChild';
import {
  HeadlessDisclosureRoot,
} from '../../headless/disclosure/HeadlessDisclosureRoot';
import {
  HeadlessDisclosureUncontrolledOptions,
} from '../../headless/disclosure/useHeadlessDisclosure';
import createDynamic from '../../utils/create-dynamic';
import {
  DynamicProps,
  HeadlessProps,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import useFocusStartPoint from '../../utils/use-focus-start-point';
import {
  CommandBarContext,
} from './CommandBarContext';
import CommandBarEvents from './CommandBarEvents';
import {
  CommandBarBaseProps,
} from './types';

export type CommandBarUncontrolledBaseProps =
  & CommandBarBaseProps
  & HeadlessDisclosureUncontrolledOptions;

export type CommandBarUncontrolledProps<T extends ValidConstructor = 'div'> =
  HeadlessProps<T, CommandBarUncontrolledBaseProps>;

export function CommandBarUncontrolled<T extends ValidConstructor = 'div'>(
  props: CommandBarUncontrolledProps<T>,
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
          'defaultOpen',
          'disabled',
          'onOpen',
          'onClose',
          'onChange',
        ]),
        {
          id: ownerID,
          role: 'dialog',
          'aria-modal': true,
          'aria-labelledby': titleID,
          'aria-describedby': descriptionID,
          'data-sh-command-bar': ownerID,
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

  return createComponent(CommandBarContext.Provider, {
    value: {
      ownerID,
      panelID,
      titleID,
      descriptionID,
    },
    get children() {
      return createComponent(HeadlessDisclosureRoot, {
        defaultOpen: props.defaultOpen,
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
        children: ({ isOpen }) => createComponent(CommandBarEvents, {
          get children() {
            return createComponent(Show, {
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
            });
          },
        }),
      });
    },
  });
}
