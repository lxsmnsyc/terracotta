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
  HeadlessDisclosureRootChildren,
  HeadlessDisclosureRootProps,
  HeadlessDisclosureControlledOptions,
} from '../../headless/disclosure';
import createDynamic from '../../utils/create-dynamic';
import {
  DynamicProps,
  HeadlessProps,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import Fragment from '../../utils/Fragment';
import {
  DisclosureContext,
} from './DisclosureContext';

type DisclosureControlledBaseProps =
  & HeadlessDisclosureControlledOptions
  & HeadlessDisclosureRootChildren;

export type DisclosureControlledProps<T extends ValidConstructor = typeof Fragment> =
  HeadlessProps<T, DisclosureControlledBaseProps>;

export function DisclosureControlled<T extends ValidConstructor = typeof Fragment>(
  props: DisclosureControlledProps<T>,
): JSX.Element {
  const ownerID = createUniqueId();
  const buttonID = createUniqueId();
  const panelID = createUniqueId();

  return createComponent(DisclosureContext.Provider, {
    value: {
      ownerID,
      buttonID,
      panelID,
    },
    get children() {
      return createDynamic(
        () => props.as ?? (Fragment as T),
        mergeProps(
          omitProps(props, [
            'isOpen',
            'as',
            'children',
            'disabled',
            'onChange',
          ]),
          {
            'data-sh-disclosure': ownerID,
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
                get isOpen() {
                  return props.isOpen;
                },
                get disabled() {
                  return props.disabled;
                },
                get children() {
                  return props.children;
                },
                onChange: props.onChange,
              } as HeadlessDisclosureRootProps);
            },
          },
        ) as DynamicProps<T>,
      );
    },
  });
}
