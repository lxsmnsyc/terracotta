import type { JSX } from 'solid-js';
import { createEffect, mergeProps } from 'solid-js';
import { createComponent } from 'solid-js/web';
import { omitProps } from 'solid-use/props';
import type { DisclosureStateRenderProps } from '../../states/create-disclosure-state';
import {
  DisclosureStateChild,
  useDisclosureState,
} from '../../states/create-disclosure-state';
import type {
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import {
  createARIADisabledState,
  createARIAExpandedState,
  createDisabledState,
  createExpandedState,
} from '../../utils/state-props';
import type { OmitAndMerge } from '../../utils/types';
import useEventListener from '../../utils/use-event-listener';
import type { ButtonProps } from '../button';
import { Button } from '../button';
import { useDisclosureContext } from './DisclosureContext';
import { DISCLOSURE_BUTTON_TAG } from './tags';

export type DisclosureButtonProps<T extends ValidConstructor = 'button'> =
  HeadlessPropsWithRef<
    T,
    OmitAndMerge<DisclosureStateRenderProps, ButtonProps<T>>
  >;

export function DisclosureButton<T extends ValidConstructor = 'button'>(
  props: DisclosureButtonProps<T>,
): JSX.Element {
  const context = useDisclosureContext('DisclosureButton');
  const state = useDisclosureState();

  const [internalRef, setInternalRef] = createForwardRef(props);

  const isDisabled = (): boolean | undefined =>
    state.disabled() || props.disabled;

  createEffect(() => {
    const current = internalRef();
    if (current instanceof HTMLElement) {
      useEventListener(current, 'click', () => {
        if (!isDisabled()) {
          state.toggle();
        }
      });
    }
  });

  return createComponent(
    Button,
    mergeProps(
      omitProps(props, ['children', 'ref']),
      DISCLOSURE_BUTTON_TAG,
      {
        id: context.buttonID,
        ref: setInternalRef,
        get 'aria-controls'() {
          return state.isOpen() && context.panelID;
        },
      },
      createDisabledState(isDisabled),
      createARIADisabledState(isDisabled),
      createExpandedState(() => state.isOpen()),
      createARIAExpandedState(() => state.isOpen()),
      {
        get children() {
          return createComponent(DisclosureStateChild, {
            get children() {
              return props.children;
            },
          });
        },
      },
    ) as ButtonProps<T>,
  );
}
