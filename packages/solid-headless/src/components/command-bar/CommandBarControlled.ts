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
  DynamicProps,
  HeadlessProps,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  createUnmountable,
} from '../../utils/Unmountable';
import useFocusStartPoint from '../../utils/use-focus-start-point';
import {
  CommandBarContext,
} from './CommandBarContext';
import CommandBarEvents from './CommandBarEvents';
import {
  CommandBarBaseProps,
} from './types';

export type CommandBarControlledBaseProps =
  & CommandBarBaseProps
  & HeadlessDisclosureControlledOptions;

export type CommandBarControlledProps<T extends ValidConstructor = 'div'> =
  HeadlessProps<T, CommandBarControlledBaseProps>;

export function CommandBarControlled<T extends ValidConstructor = 'div'>(
  props: CommandBarControlledProps<T>,
): JSX.Element {
  const ownerID = createUniqueId();
  const panelID = createUniqueId();
  const titleID = createUniqueId();
  const descriptionID = createUniqueId();
  const fsp = useFocusStartPoint();

  return createComponent(CommandBarContext.Provider, {
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
        children: ({ isOpen }) => createComponent(CommandBarEvents, {
          get children() {
            return createUnmountable(
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
              ),
            );
          },
        }),
      });
    },
  });
}
