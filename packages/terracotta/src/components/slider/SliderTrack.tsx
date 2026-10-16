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

      function setFromPointer(e: PointerEvent): void {
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
        state.setValue(state.min() + ratio * (state.max() - state.min()));
      }

      return mergeFunc(
        useEventListener(current, 'pointerdown', (e) => {
          if (state.disabled() || e.button !== 0) {
            return;
          }
          // Keeps the press from selecting text or moving focus to the track.
          e.preventDefault();
          pointer = e.pointerId;
          // jsdom has no pointer capture.
          if ('setPointerCapture' in current) {
            current.setPointerCapture(e.pointerId);
          }
          setFromPointer(e);
          context.focusThumb();
        }),
        useEventListener(current, 'pointermove', (e) => {
          if (pointer === e.pointerId) {
            setFromPointer(e);
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
