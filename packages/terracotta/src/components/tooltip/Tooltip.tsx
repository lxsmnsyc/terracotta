import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { createEffect, createUniqueId, omit, onCleanup, untrack } from 'solid-js';
import type {
  DisclosureStateControlledOptions,
  DisclosureStateRenderProps,
  DisclosureStateUncontrolledOptions,
} from '../../states/create-disclosure-state';
import {
  createDisclosureState,
  DisclosureStateProvider,
} from '../../states/create-disclosure-state';
import type { HeadlessProps } from '../../utils/dynamic-prop';
import { createDisabledState, createExpandedState } from '../../utils/state-props';
import type { Prettify } from '../../utils/types';
import useEventListener from '../../utils/use-event-listener';
import { TooltipContext } from './TooltipContext';
import { TOOLTIP_TAG } from './tags';

export interface TooltipDelayOptions {
  /** Milliseconds between the pointer entering the trigger and the tooltip opening. */
  openDelay?: number;
  /**
   * Milliseconds between the pointer leaving and the tooltip closing. It gives
   * the pointer time to move from the trigger onto the tooltip.
   */
  closeDelay?: number;
}

export type TooltipControlledBaseProps = Prettify<
  DisclosureStateRenderProps & DisclosureStateControlledOptions & TooltipDelayOptions
>;

export type TooltipControlledProps<T extends ValidComponent = 'div'> = HeadlessProps<
  T,
  TooltipControlledBaseProps
>;

export type TooltipUncontrolledBaseProps = Prettify<
  DisclosureStateRenderProps & DisclosureStateUncontrolledOptions & TooltipDelayOptions
>;

export type TooltipUncontrolledProps<T extends ValidComponent = 'div'> = HeadlessProps<
  T,
  TooltipUncontrolledBaseProps
>;

export type TooltipProps<T extends ValidComponent = 'div'> =
  | TooltipControlledProps<T>
  | TooltipUncontrolledProps<T>;

function isTooltipUncontrolled<T extends ValidComponent = 'div'>(
  props: TooltipProps<T>,
): props is TooltipUncontrolledProps<T> {
  return 'defaultOpen' in props;
}

const DEFAULT_OPEN_DELAY = 300;
const DEFAULT_CLOSE_DELAY = 100;

/**
 * A short description of a control, shown while the control is hovered or
 * focused, following the ARIA tooltip pattern. The tooltip never takes focus,
 * and <kbd>Escape</kbd> hides it.
 *
 * Renders a `<div>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/tooltip.md}
 */
export function Tooltip<T extends ValidComponent = 'div'>(props: TooltipProps<T>): JSX.Element {
  const triggerID = createUniqueId();
  const panelID = createUniqueId();

  const state = createDisclosureState(props);

  let timer: ReturnType<typeof setTimeout> | undefined;

  function cancel(): void {
    if (timer !== undefined) {
      clearTimeout(timer);
      timer = undefined;
    }
  }

  function schedule(open: boolean, delay: number): void {
    cancel();
    if (delay <= 0) {
      state.setState(open);
    } else {
      timer = setTimeout(() => {
        timer = undefined;
        state.setState(open);
      }, delay);
    }
  }

  onCleanup(cancel);

  // Escape hides the tooltip wherever focus is. It is handled first, in the
  // capture phase, so a `Dialog` around the trigger does not close as well.
  createEffect(
    () => state.isOpen(),
    (isOpen) => {
      if (isOpen) {
        return useEventListener(
          document,
          'keydown',
          (e) => {
            if (e.key === 'Escape') {
              e.stopPropagation();
              cancel();
              state.close();
            }
          },
          true,
        );
      }
      return undefined;
    },
  );

  const disabledState = createDisabledState(() => state.disabled());
  const expandedState = createExpandedState(() => state.isOpen());
  const rest = isTooltipUncontrolled(props)
    ? omit(
        props,
        'as',
        'children',
        'defaultOpen',
        'disabled',
        'onChange',
        'onClose',
        'onOpen',
        'openDelay',
        'closeDelay',
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
        'openDelay',
        'closeDelay',
      );
  const Root = dynamic(() => props.as || 'div');
  return (
    <TooltipContext
      value={{
        triggerID,
        panelID,
        scheduleOpen(): void {
          schedule(
            true,
            untrack(() => props.openDelay ?? DEFAULT_OPEN_DELAY),
          );
        },
        scheduleClose(): void {
          schedule(
            false,
            untrack(() => props.closeDelay ?? DEFAULT_CLOSE_DELAY),
          );
        },
        openNow(): void {
          schedule(true, 0);
        },
        closeNow(): void {
          schedule(false, 0);
        },
        cancel,
      }}
    >
      <Root {...TOOLTIP_TAG} {...disabledState} {...expandedState} {...rest}>
        <DisclosureStateProvider state={state}>{props.children}</DisclosureStateProvider>
      </Root>
    </TooltipContext>
  );
}
