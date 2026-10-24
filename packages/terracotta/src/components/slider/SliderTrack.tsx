import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { createEffect, omit } from 'solid-js';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import { mergeFunc } from '../../utils/merge-func';
import { createDisabledState } from '../../utils/state-props';
import useEventListener from '../../utils/use-event-listener';
import type { SliderStateRenderProps } from './SliderContext';
import { SliderStateChild, useSliderContext } from './SliderContext';
import { SLIDER_TRACK_TAG } from './tags';

export type SliderTrackProps<T extends ValidComponent = 'div'> = HeadlessPropsWithRef<
  T,
  SliderStateRenderProps
>;

/**
 * The bar the thumb moves along. Pressing it sets the value under the pointer
 * and moves focus to the thumb, and dragging keeps setting it. Put the
 * `SliderThumb` inside it, so dragging the thumb works the same way.
 *
 * With several thumbs, a press moves the thumb nearest the pointer.
 *
 * Renders a `<div>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/slider.md}
 */
export function SliderTrack<T extends ValidComponent = 'div'>(
  props: SliderTrackProps<T>,
): JSX.Element {
  const context = useSliderContext('SliderTrack');
  const state = context.state;

  const [internalRef, setInternalRef] = createForwardRef(props);

  createEffect(internalRef, (current) => {
    if (current instanceof HTMLElement) {
      const track = current;
      let pointer: number | undefined;
      let active = 0;

      function valueFromPointer(e: PointerEvent): number {
        const rect = track.getBoundingClientRect();
        let ratio: number;
        if (context.isVertical()) {
          // Vertical sliders grow upwards.
          ratio = rect.height === 0 ? 0 : (rect.bottom - e.clientY) / rect.height;
        } else {
          ratio = rect.width === 0 ? 0 : (e.clientX - rect.left) / rect.width;
          if (getComputedStyle(track).direction === 'rtl') {
            ratio = 1 - ratio;
          }
        }
        ratio = Math.min(1, Math.max(0, ratio));
        return state.min() + ratio * (state.max() - state.min());
      }

      // The thumb nearest the value. When thumbs share a value, `towards`
      // settles which of them moves.
      function nearest(value: number): number {
        const values = state.values();
        let best = 0;
        for (let i = 1; i < values.length; i += 1) {
          const distance = Math.abs(values[i] - value);
          const bestDistance = Math.abs(values[best] - value);
          if (distance < bestDistance || (distance === bestDistance && value > values[i])) {
            best = i;
          }
        }
        return best;
      }

      // Thumbs that share a value block each other: the lower one cannot pass
      // the upper one. So among the thumbs at the active thumb's value, the
      // pointer moves the last one when it goes up and the first one when it
      // goes down. A press exactly on the shared value moves none of them, and
      // the first movement after it decides.
      function towards(value: number): void {
        const values = state.values();
        const current = values[active];
        let next = active;
        if (value > current) {
          while (next + 1 < values.length && values[next + 1] === current) {
            next += 1;
          }
        } else if (value < current) {
          while (next > 0 && values[next - 1] === current) {
            next -= 1;
          }
        }
        if (next !== active) {
          active = next;
          context.focusThumb(active);
        }
      }

      return mergeFunc(
        useEventListener(current, 'pointerdown', (e) => {
          if (state.disabled() || e.button !== 0) {
            return;
          }
          // Keeps the press from selecting text or moving focus to the track.
          e.preventDefault();
          pointer = e.pointerId;
          const value = valueFromPointer(e);
          active = nearest(value);
          towards(value);
          // jsdom has no pointer capture.
          if ('setPointerCapture' in current) {
            current.setPointerCapture(e.pointerId);
          }
          state.setThumbValue(active, value);
          context.focusThumb(active);
        }),
        useEventListener(current, 'pointermove', (e) => {
          if (pointer === e.pointerId) {
            const value = valueFromPointer(e);
            towards(value);
            state.setThumbValue(active, value);
          }
        }),
        useEventListener(current, 'pointerup', (e) => {
          if (pointer === e.pointerId) {
            pointer = undefined;
            if ('releasePointerCapture' in current) {
              current.releasePointerCapture(e.pointerId);
            }
          }
        }),
        useEventListener(current, 'pointercancel', () => {
          pointer = undefined;
        }),
      );
    }
    return undefined;
  });

  const disabledState = createDisabledState(() => state.disabled());
  const rest = omit(props, 'as', 'children', 'ref');
  const Root = dynamic(() => props.as || 'div');
  return (
    <Root {...SLIDER_TRACK_TAG} ref={setInternalRef} {...disabledState} {...rest}>
      <SliderStateChild>{props.children}</SliderStateChild>
    </Root>
  );
}
