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
  ContextMenuContext,
} from './ContextMenuContext';
import {
  ContextMenuBaseProps,
} from './types';

export type ContextMenuUncontrolledBaseProps =
  & ContextMenuBaseProps
  & HeadlessDisclosureUncontrolledOptions;

export type ContextMenuUncontrolledProps<T extends ValidConstructor = 'div'> =
  HeadlessProps<T, ContextMenuUncontrolledBaseProps>;

export function ContextMenuUncontrolled<T extends ValidConstructor = 'div'>(
  props: ContextMenuUncontrolledProps<T>,
): JSX.Element {
  const ownerID = createUniqueId();
  const boundaryID = createUniqueId();
  const panelID = createUniqueId();

  const fsp = useFocusStartPoint();

  return createComponent(ContextMenuContext.Provider, {
    value: {
      ownerID,
      boundaryID,
      panelID,
    },
    get children() {
      return createDynamic(
        () => props.as ?? ('div' as T),
        mergeProps(
          omitProps(props, [
            'defaultOpen',
            'as',
            'children',
            'disabled',
            'onChange',
            'onOpen',
            'onClose',
          ]),
          {
            'data-sh-context-menu': ownerID,
            get disabled() {
              return props.disabled;
            },
            get 'aria-disabled'() {
              return props.disabled;
            },
            get 'data-sh-disabled'() {
              return props.disabled;
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
                    fsp.load();
                    props.onClose?.();
                  } else {
                    fsp.save();
                    props.onOpen?.();
                  }
                },
                get children() {
                  return props.children;
                },
              });
            },
          },
        ) as DynamicProps<T>,
      );
    },
  });
}
