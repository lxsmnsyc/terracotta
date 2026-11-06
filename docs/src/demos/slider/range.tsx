import type { JSX } from '@solidjs/web';
import { Slider, SliderLabel, SliderThumb, SliderTrack } from 'terracotta/slider';

/**
 * An array value gives one thumb per value. The thumbs cannot pass each other,
 * and each has a name of its own.
 */
export default function RangeSlider(): JSX.Element {
  return (
    <div class="stack">
      <Slider class="slider" defaultValue={[200, 650]} max={1000} step={10} largeStep={10}>
        {(state) => (
          <>
            <div class="slider-header">
              <SliderLabel class="slider-label">Price</SliderLabel>
              <span class="hint">
                ${state.values()[0]} to ${state.values()[1]}
              </span>
            </div>
            <SliderTrack class="slider-track">
              <span
                class="slider-range"
                style={{
                  'inset-inline-start': `${state.percent(0)}%`,
                  'inline-size': `${state.percent(1) - state.percent(0)}%`,
                }}
              />
              <SliderThumb
                class="slider-thumb"
                index={0}
                aria-label="Minimum price"
                style={{ 'inset-inline-start': `${state.percent(0)}%` }}
              />
              <SliderThumb
                class="slider-thumb"
                index={1}
                aria-label="Maximum price"
                style={{ 'inset-inline-start': `${state.percent(1)}%` }}
              />
            </SliderTrack>
          </>
        )}
      </Slider>
    </div>
  );
}
