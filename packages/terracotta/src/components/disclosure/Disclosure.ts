import type { ComponentProps, JSX, ValidComponent } from '@solidjs/web';
import { createComponent, createUniqueId, merge, omit } from 'solid-js';
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
import { DisclosureContext } from './DisclosureContext';
import { DISCLOSURE_TAG } from './tags';

export type DisclosureControlledBaseProps = Prettify<
  DisclosureStateControlledOptions & DisclosureStateRenderProps
>;

export type DisclosureControlledProps<T extends ValidComponent = 'div'> =
  HeadlessProps<T, DisclosureControlledBaseProps>;

export type DisclosureUncontrolledBaseProps = Prettify<
  DisclosureStateUncontrolledOptions & DisclosureStateRenderProps
>;

export type DisclosureUncontrolledProps<T extends ValidComponent = 'div'> =
  HeadlessProps<T, DisclosureUncontrolledBaseProps>;

export type DisclosureProps<T extends ValidComponent = 'div'> =
  | DisclosureControlledProps<T>
  | DisclosureUncontrolledProps<T>;

function isDisclosureUncontrolled<T extends ValidComponent = 'div'>(
  props: DisclosureProps<T>,
): props is DisclosureUncontrolledProps<T> {
  return 'defaultOpen' in props;
}

/**
 * A button that shows and hides a section. The simplest stateful component in
 * the library, and the base the dialog-like components are built on.
 *
 * Renders a `<div>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/disclosure.md}
 */
export function Disclosure<T extends ValidComponent = 'div'>(
  props: DisclosureProps<T>,
): JSX.Element {
  const ownerID = createUniqueId();
  const buttonID = createUniqueId();
  const panelID = createUniqueId();
  const state = createDisclosureState(props);

  return createComponent(DisclosureContext, {
    value: {
      ownerID,
      buttonID,
      panelID,
    },
    get children() {
      return createDynamic(
        () => props.as || 'div',
        merge(
          DISCLOSURE_TAG,
          createDisabledState(() => state.disabled()),
          createARIADisabledState(() => state.disabled()),
          createExpandedState(() => state.isOpen()),
          isDisclosureUncontrolled(props)
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
