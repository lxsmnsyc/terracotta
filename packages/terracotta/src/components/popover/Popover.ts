import type { JSX } from 'solid-js';
import {
  createComponent,
  createEffect,
  createUniqueId,
  mergeProps,
} from 'solid-js';
import { omitProps } from 'solid-use/props';
import type {
  DisclosureStateControlledOptions,
  DisclosureStateRenderProps,
  DisclosureStateUncontrolledOptions,
} from '../../states/create-disclosure-state';
import {
  DisclosureStateProvider,
  createDisclosureState,
} from '../../states/create-disclosure-state';
import createDynamic from '../../utils/create-dynamic';
import type {
  DynamicProps,
  HeadlessProps,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  createARIADisabledState,
  createDisabledState,
  createExpandedState,
} from '../../utils/state-props';
import type { Prettify } from '../../utils/types';
import useFocusStartPoint from '../../utils/use-focus-start-point';
import { PopoverContext } from './PopoverContext';
import { POPOVER_TAG } from './tags';

export type PopoverControlledBaseProps = Prettify<
  DisclosureStateRenderProps & DisclosureStateControlledOptions
>;

export type PopoverControlledProps<T extends ValidConstructor = 'div'> =
  HeadlessProps<T, PopoverControlledBaseProps>;

export type PopoverUncontrolledBaseProps = Prettify<
  DisclosureStateRenderProps & DisclosureStateUncontrolledOptions
>;

export type PopoverUncontrolledProps<T extends ValidConstructor = 'div'> =
  HeadlessProps<T, PopoverUncontrolledBaseProps>;

export type PopoverProps<T extends ValidConstructor = 'div'> =
  | PopoverControlledProps<T>
  | PopoverUncontrolledProps<T>;

function isPopoverUncontrolled<T extends ValidConstructor = 'div'>(
  props: PopoverProps<T>,
): props is PopoverUncontrolledProps<T> {
  return 'defaultOpen' in props;
}

export function Popover<T extends ValidConstructor = 'div'>(
  props: PopoverProps<T>,
): JSX.Element {
  const ownerID = createUniqueId();
  const buttonID = createUniqueId();
  const panelID = createUniqueId();

  const fsp = useFocusStartPoint();

  const state = createDisclosureState(props);

  createEffect(() => {
    if (state.isOpen()) {
      fsp.save();
    } else {
      fsp.load();
    }
  });

  return createComponent(PopoverContext.Provider, {
    value: {
      ownerID,
      buttonID,
      panelID,
      hovering: false,
    },
    get children() {
      return createDynamic(
        () => props.as || ('div' as T),
        mergeProps(
          isPopoverUncontrolled(props)
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
          POPOVER_TAG,
          createDisabledState(() => state.disabled()),
          createARIADisabledState(() => state.disabled()),
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
