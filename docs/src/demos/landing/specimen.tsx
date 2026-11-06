import type { JSX } from '@solidjs/web';
import { For, Show, createSignal } from 'solid-js';
import { Checkbox, CheckboxIndicator, CheckboxLabel } from 'terracotta/checkbox';
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from 'terracotta/radio-group';
import { Slider, SliderLabel, SliderThumb, SliderTrack } from 'terracotta/slider';
import { Switch } from 'terracotta/switch';

const CHANNELS = ['latest', 'next', 'canary'];

/**
 * The landing page's hero specimen. Four widgets in one card, so a theme
 * change shows on several kinds of control at once. It uses only the shared
 * demo vocabulary, like every other demo.
 */
export default function Specimen(): JSX.Element {
  const [channel, setChannel] = createSignal('next');

  return (
    <div class="stack">
      <Switch class="switch" defaultChecked>
        <span class="switch-track" aria-hidden="true">
          <span class="switch-knob" />
        </span>
        <span>Ship prereleases</span>
      </Switch>

      <RadioGroup<string>
        class="radiogroup"
        value={channel()}
        onChange={(next) => next && setChannel(next)}
      >
        <RadioGroupLabel class="radiogroup-label">Channel</RadioGroupLabel>
        <For each={CHANNELS}>
          {(option) => (
            <RadioGroupOption class="radio-row" value={option}>
              <span class="radio-dot" aria-hidden="true" />
              <RadioGroupLabel class="radio-row-label">{option}</RadioGroupLabel>
            </RadioGroupOption>
          )}
        </For>
      </RadioGroup>

      <Slider class="slider" defaultValue={64}>
        {(state) => (
          <>
            <div class="slider-header">
              <SliderLabel class="slider-label">Rollout</SliderLabel>
              <span class="hint">{state.value()}%</span>
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

      <Checkbox class="checkbox" defaultChecked>
        <CheckboxIndicator class="checkbox-box">
          {(state) => (
            <Show when={state.checked()}>
              <span aria-hidden="true">✓</span>
            </Show>
          )}
        </CheckboxIndicator>
        <CheckboxLabel class="checkbox-label">Notify the team</CheckboxLabel>
      </Checkbox>
    </div>
  );
}
