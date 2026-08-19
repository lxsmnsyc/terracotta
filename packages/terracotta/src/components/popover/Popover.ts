import type { ComponentProps, JSX, ValidComponent } from '@solidjs/web';
import {
  createComponent,
  createEffect,
  createUniqueId,
  merge,
  omit,
} from 'solid-js';
import type {
  DisclosureStateControlledOptions,
  DisclosureStateRenderProps,
  DisclosureStateUncontrolledOptions,
} from '../../states/create-disclosure-state';
import {
  createDisclosureState,
  DisclosureStateProvider,
} from '../../states/create-disclosure-state';
import createDynamic from '../../utils/create-dynamic';
import type { HeadlessProps } from '../../utils/dynamic-prop';
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

export type PopoverControlledProps<T extends ValidComponent = 'div'> =
  HeadlessProps<T, PopoverControlledBaseProps>;

export type PopoverUncontrolledBaseProps = Prettify<
  DisclosureStateRenderProps & DisclosureStateUncontrolledOptions
>;

export type PopoverUncontrolledProps<T extends ValidComponent = 'div'> =
  HeadlessProps<T, PopoverUncontrolledBaseProps>;

export type PopoverProps<T extends ValidComponent = 'div'> =
  | PopoverControlledProps<T>
  | PopoverUncontrolledProps<T>;

function isPopoverUncontrolled<T extends ValidComponent = 'div'>(
  props: PopoverProps<T>,
): props is PopoverUncontrolledProps<T> {
  return 'defaultOpen' in props;
}

/**
 * A floating panel anchored to a button. Like a `Dialog` in that the panel can
 * trap `Tab`, but the page behind stays usable and the panel also closes when
 * focus leaves it.
 *
 * Renders a `<div>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/popover.md}
 */
export function Popover<T extends ValidComponent = 'div'>(
  props: PopoverProps<T>,
): JSX.Element {
  const ownerID = createUniqueId();
  const buttonID = createUniqueId();
  const panelID = createUniqueId();

  const fsp = useFocusStartPoint();

  const state = createDisclosureState(props);

  createEffect(
    () => state.isOpen(),
    flag => {
      if (flag) {
        fsp.save();
      } else {
        fsp.load();
      }
    },
  );

  return createComponent(PopoverContext, {
    value: {
      ownerID,
      buttonID,
      panelID,
      hovering: false,
    },
    get children() {
      return createDynamic(
        () => props.as || ('div' as T),
        merge(
          POPOVER_TAG,
          createDisabledState(() => state.disabled()),
          createARIADisabledState(() => state.disabled()),
          createExpandedState(() => state.isOpen()),
          isPopoverUncontrolled(props)
            ? omit(
                props,
                'as',
                'children',
                'defaultOpen',
                'disabled',
                'onChange',
                'onClose',
                'onOpen',
              )
            : omit(
                props,
                'as',
                'children',
                'isOpen',
                'disabled',
                'onChange',
                'onClose',
                'onOpen',
              ),
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
        ) as ComponentProps<T>,
      );
    },
  });
}
