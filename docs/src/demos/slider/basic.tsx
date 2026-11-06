import type { JSX } from '@solidjs/web';
import { Slider, SliderLabel, SliderThumb, SliderTrack } from 'terracotta/slider';

/**
 * The thumb is placed from `percent()`, read through the render prop. The
 * library moves the value; the page decides where that is on screen.
 */
export default function BasicSlider(): JSX.Element {
  return (
    <div class="stack">
      <Slider class="slider" defaultValue={40}>
        {(state) => (
          <>
            <div class="slider-header">
              <SliderLabel class="slider-label">Volume</SliderLabel>
              <span class="hint">{state.value()}</span>
            </div>
            <SliderTrack class="slider-track">
              <span class="slider-range" style={{ 'inline-size': `${state.percent()}%` }} />
              <SliderThumb
                class="slider-thumb"
                style={{ 'inset-inline-start': `${state.percent()}%` }}
              />
            </SliderTrack>
          </>
        )}
      </Slider>
      <Slider
        class="slider"
        defaultValue={20}
        min={10}
        max={30}
        step={0.5}
        largeStep={4}
        getValueText={(value) => `${value} degrees Celsius`}
      >
        {(state) => (
          <>
            <div class="slider-header">
              <SliderLabel class="slider-label">Temperature</SliderLabel>
              <span class="hint">{state.value()} °C</span>
            </div>
            <SliderTrack class="slider-track">
              <span class="slider-range" style={{ 'inline-size': `${state.percent()}%` }} />
              <SliderThumb
                class="slider-thumb"
                style={{ 'inset-inline-start': `${state.percent()}%` }}
              />
            </SliderTrack>
          </>
        )}
      </Slider>
    </div>
  );
}
