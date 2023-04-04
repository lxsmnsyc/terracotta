import {
  createComponent,
  createUniqueId,
  JSX,
  mergeProps,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use/props';
import createDynamic from '../../utils/create-dynamic';
import {
  DynamicProps,
  HeadlessProps,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  createDisabledState,
  createExpandedState,
} from '../../utils/state-props';
import {
  DisclosureContext,
} from './DisclosureContext';
import { DISCLOSURE_TAG } from './tags';
import { Prettify } from '../../utils/types';
import {
  createDisclosureState,
  DisclosureStateControlledOptions,
  DisclosureStateProvider,
  DisclosureStateRenderProps,
  DisclosureStateUncontrolledOptions,
} from '../../states/create-disclosure-state';

export type DisclosureControlledBaseProps = Prettify<
  & DisclosureStateControlledOptions
  & DisclosureStateRenderProps
>;

export type DisclosureControlledProps<T extends ValidConstructor = 'div'> =
  HeadlessProps<T, DisclosureControlledBaseProps>;

export type DisclosureUncontrolledBaseProps = Prettify<
  & DisclosureStateUncontrolledOptions
  & DisclosureStateRenderProps
>;

export type DisclosureUncontrolledProps<T extends ValidConstructor = 'div'> =
  HeadlessProps<T, DisclosureUncontrolledBaseProps>;

export type DisclosureProps<T extends ValidConstructor = 'div'> =
  | DisclosureControlledProps<T>
  | DisclosureUncontrolledProps<T>;

function isDisclosureUncontrolled<T extends ValidConstructor = 'div'>(
  props: DisclosureProps<T>,
): props is DisclosureUncontrolledProps<T> {
  return 'defaultOpen' in props;
}

export function Disclosure<T extends ValidConstructor = 'div'>(
  props: DisclosureProps<T>,
): JSX.Element {
  const ownerID = createUniqueId();
  const buttonID = createUniqueId();
  const panelID = createUniqueId();
  const state = createDisclosureState(props);

  return createComponent(DisclosureContext.Provider, {
    value: {
      ownerID,
      buttonID,
      panelID,
    },
    get children() {
      return createDynamic(
        () => props.as || 'div',
        mergeProps(
          isDisclosureUncontrolled(props)
            ? omitProps(props, [
              'as',
              'children',
              'defaultOpen',
              'disabled',
              'onChange',
              'onClose',
              'onOpen',
            ])
            : omitProps(props, [
              'as',
              'children',
              'isOpen',
              'disabled',
              'onChange',
              'onClose',
              'onOpen',
            ]),
          DISCLOSURE_TAG,
          createDisabledState(() => state.disabled()),
          createExpandedState(() => state.isOpen()),
          {
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
      );
    },
  });
}
