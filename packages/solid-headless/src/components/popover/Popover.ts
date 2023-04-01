import {
  createComponent,
  createEffect,
  createSignal,
  createUniqueId,
  JSX,
  mergeProps,
} from 'solid-js';
import { omitProps } from 'solid-use/props';
import {
  DynamicProps,
  HeadlessProps,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import { Prettify } from '../../utils/types';
import {
  createDisclosureState,
  DisclosureStateControlledOptions,
  DisclosureStateProvider,
  DisclosureStateRenderProps,
  DisclosureStateUncontrolledOptions,
} from '../../states/create-disclosure-state';
import useFocusStartPoint from '../../utils/use-focus-start-point';
import { PopoverContext } from './PopoverContext';
import createDynamic from '../../utils/create-dynamic';
import { POPOVER_TAG } from './tags';
import { createDisabled } from '../../utils/state-props';

export type PopoverControlledBaseProps = Prettify<
  DisclosureStateRenderProps
  & DisclosureStateControlledOptions
>

export type PopoverControlledProps<T extends ValidConstructor = 'div'> =
  HeadlessProps<T, PopoverControlledBaseProps>;

export type PopoverUncontrolledBaseProps = Prettify<
  DisclosureStateRenderProps
  & DisclosureStateUncontrolledOptions
>

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
  const [hovering, setHovering] = createSignal(false);
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
      get hovering() {
        return hovering();
      },
      set hovering(value: boolean) {
        setHovering(value);
      },
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
          createDisabled(() => state.disabled()),
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
