import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { createEffect, omit } from 'solid-js';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import { mergeFunc } from '../../utils/merge-func';
import { createARIADisabledState, createDisabledState } from '../../utils/state-props';
import useEventListener from '../../utils/use-event-listener';
import type { SplitterStateRenderProps } from './SplitterContext';
import { SplitterStateChild, useSplitterContext } from './SplitterContext';
import { SPLITTER_SEPARATOR_TAG } from './tags';

export type SplitterSeparatorProps<T extends ValidComponent = 'div'> = HeadlessPropsWithRef<
  T,
  SplitterStateRenderProps
>;

/**
 * The movable separator, with `role="separator"`. It is focusable, takes the
 * arrow keys, <kbd>Enter</kbd>, <kbd>Home</kbd> and <kbd>End</kbd>, and can be
 * dragged. Name it after the primary pane, with `aria-label` or
 * `aria-labelledby`.
 *
 * Renders a `<div>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/splitter.md}
 */
export function SplitterSeparator<T extends ValidComponent = 'div'>(
  props: SplitterSeparatorProps<T>,
): JSX.Element {
  const context = useSplitterContext('SplitterSeparator');
  const state = context.state;

  const [internalRef, setInternalRef] = createForwardRef(props);

  createEffect(internalRef, (current) => {
    if (current instanceof HTMLElement) {
      const separator = current;
      let pointer: number | undefined;

      // The primary pane comes first: on the left, on the right in
      // right-to-left text, or on top when the panes are stacked.
      function isReversed(): boolean {
        const root = context.root();
        return !context.isHorizontal() && !!root && getComputedStyle(root).direction === 'rtl';
      }

      function setFromPointer(e: PointerEvent): void {
        const root = context.root();
        if (!root) {
          return;
        }
        const rect = root.getBoundingClientRect();
        let ratio: number;
        if (context.isHorizontal()) {
          ratio = rect.height === 0 ? 0 : (e.clientY - rect.top) / rect.height;
        } else {
          ratio = rect.width === 0 ? 0 : (e.clientX - rect.left) / rect.width;
          if (isReversed()) {
            ratio = 1 - ratio;
          }
        }
        const min = state.min();
        const max = state.max();
        // The value is a share of the whole splitter, scaled to its range, and
        // rounded to two decimals so `aria-valuenow` stays readable.
        const next = min + Math.min(1, Math.max(0, ratio)) * (max - min);
        state.setValue(Math.round(next * 100) / 100);
      }

      return mergeFunc(
        useEventListener(separator, 'keydown', (e) => {
          if (state.disabled()) {
            return;
          }
          const horizontal = context.isHorizontal();
          // Moving towards the primary pane makes it smaller.
          const towards = isReversed() ? 'ArrowRight' : 'ArrowLeft';
          const away = isReversed() ? 'ArrowLeft' : 'ArrowRight';
          switch (e.key) {
            case towards:
              if (horizontal) {
                return;
              }
              state.shrink();
              break;
            case away:
              if (horizontal) {
                return;
              }
              state.grow();
              break;
            case 'ArrowUp':
              if (!horizontal) {
                return;
              }
              state.shrink();
              break;
            case 'ArrowDown':
              if (!horizontal) {
                return;
              }
              state.grow();
              break;
            case 'Enter':
              state.toggle();
              break;
            case 'Home':
              state.setValue(state.min());
              break;
            case 'End':
              state.setValue(state.max());
              break;
            default:
              return;
          }
          e.preventDefault();
        }),
        useEventListener(separator, 'pointerdown', (e) => {
          if (state.disabled() || e.button !== 0) {
            return;
          }
          // Keeps the drag from selecting text, and focuses the separator.
          e.preventDefault();
          separator.focus();
          pointer = e.pointerId;
          if ('setPointerCapture' in separator) {
            separator.setPointerCapture(e.pointerId);
          }
        }),
        useEventListener(separator, 'pointermove', (e) => {
          if (pointer === e.pointerId) {
            setFromPointer(e);
          }
        }),
        useEventListener(separator, 'pointerup', (e) => {
          if (pointer === e.pointerId) {
            pointer = undefined;
            if ('releasePointerCapture' in separator) {
              separator.releasePointerCapture(e.pointerId);
            }
          }
        }),
        useEventListener(separator, 'pointercancel', () => {
          pointer = undefined;
        }),
      );
    }
    return undefined;
  });

  const disabledState = createDisabledState(() => state.disabled());
  const ariaDisabledState = createARIADisabledState(() => state.disabled());
  const rest = omit(props, 'as', 'children', 'ref');
  const Root = dynamic(() => props.as || 'div');
  return (
    <Root
      {...SPLITTER_SEPARATOR_TAG}
      role="separator"
      tabindex={state.disabled() ? -1 : 0}
      aria-orientation={context.isHorizontal() ? 'horizontal' : 'vertical'}
      aria-valuenow={state.value()}
      aria-valuemin={state.min()}
      aria-valuemax={state.max()}
      aria-controls={context.paneID}
      tc-collapsed={state.collapsed() ? '' : undefined}
      ref={setInternalRef}
      {...disabledState}
      {...ariaDisabledState}
      {...rest}
    >
      <SplitterStateChild>{props.children}</SplitterStateChild>
    </Root>
  );
}
