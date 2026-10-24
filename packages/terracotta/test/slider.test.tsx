import { fireEvent, render, screen } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { describe, expect, it, vi } from 'vitest';
import { Slider, SliderLabel, SliderThumb, SliderTrack } from '../src/components/slider';
import { pressKeyOnFocused } from './aria';

type Options = {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  vertical?: boolean;
  onChange?: (value: number) => void;
  getValueText?: (value: number) => string;
  name?: string;
};

function renderSlider(options: Options = {}): void {
  render(() => (
    <Slider
      defaultValue={options.value ?? 50}
      min={options.min}
      max={options.max}
      step={options.step}
      disabled={options.disabled}
      vertical={options.vertical}
      onChange={options.onChange}
      getValueText={options.getValueText}
      name={options.name}
    >
      <SliderLabel>Volume</SliderLabel>
      <SliderTrack data-testid="track">
        <SliderThumb />
      </SliderTrack>
    </Slider>
  ));
}

function getThumb(): HTMLElement {
  return screen.getByRole('slider', { name: 'Volume' });
}

describe('Slider accessibility', () => {
  it('puts the slider role and value range on the thumb', () => {
    renderSlider({ value: 30 });

    expect(getThumb()).toHaveAttribute('aria-valuenow', '30');
    expect(getThumb()).toHaveAttribute('aria-valuemin', '0');
    expect(getThumb()).toHaveAttribute('aria-valuemax', '100');
    expect(getThumb()).toHaveAttribute('tabindex', '0');
    expect(getThumb()).not.toHaveAttribute('aria-orientation');
  });

  it('is named by its label', () => {
    renderSlider();

    expect(getThumb()).toHaveAttribute('aria-labelledby', screen.getByText('Volume').id);
  });

  it('leaves out aria-labelledby without a label', () => {
    render(() => (
      <Slider defaultValue={5}>
        <SliderTrack>
          <SliderThumb aria-label="Zoom" />
        </SliderTrack>
      </Slider>
    ));

    expect(screen.getByRole('slider', { name: 'Zoom' })).not.toHaveAttribute('aria-labelledby');
  });

  it('describes the value with aria-valuetext', () => {
    renderSlider({ value: 20, getValueText: (value) => `${value} percent` });

    expect(getThumb()).toHaveAttribute('aria-valuetext', '20 percent');
  });

  it('reports a vertical orientation', () => {
    renderSlider({ vertical: true });

    expect(getThumb()).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('is disabled with aria-disabled and out of the tab sequence', () => {
    renderSlider({ disabled: true });

    expect(getThumb()).toHaveAttribute('aria-disabled', 'true');
    expect(getThumb()).toHaveAttribute('tabindex', '-1');
  });
});

describe('Slider keyboard', () => {
  it.each([
    ['ArrowRight', 51],
    ['ArrowUp', 51],
    ['ArrowLeft', 49],
    ['ArrowDown', 49],
    ['PageUp', 60],
    ['PageDown', 40],
    ['Home', 0],
    ['End', 100],
  ])('handles %s', (key, expected) => {
    renderSlider();
    getThumb().focus();

    pressKeyOnFocused(key);

    expect(getThumb()).toHaveAttribute('aria-valuenow', String(expected));
  });

  it('stops at the ends of the range', () => {
    renderSlider({ value: 100 });
    getThumb().focus();

    pressKeyOnFocused('ArrowRight');

    expect(getThumb()).toHaveAttribute('aria-valuenow', '100');
  });

  it('moves by the step without drifting', () => {
    renderSlider({ value: 0.2, min: 0, max: 1, step: 0.1 });
    getThumb().focus();

    pressKeyOnFocused('ArrowRight');

    expect(getThumb()).toHaveAttribute('aria-valuenow', '0.3');
  });

  it('keeps the decimals of a fractional minimum', () => {
    renderSlider({ value: 0.25, min: 0.25, max: 2, step: 0.5 });
    getThumb().focus();

    expect(getThumb()).toHaveAttribute('aria-valuenow', '0.25');

    pressKeyOnFocused('ArrowRight');

    expect(getThumb()).toHaveAttribute('aria-valuenow', '0.75');
  });

  it('keeps the decimals of a step written with an exponent', () => {
    renderSlider({ value: 0, min: 0, max: 1, step: 1e-7 });
    getThumb().focus();

    pressKeyOnFocused('ArrowRight');

    expect(getThumb()).toHaveAttribute('aria-valuenow', '1e-7');
  });

  it('reaches the maximum with End when it is not on the step grid', () => {
    renderSlider({ value: 0, min: 0, max: 10, step: 3 });
    getThumb().focus();

    pressKeyOnFocused('End');

    expect(getThumb()).toHaveAttribute('aria-valuenow', '10');
  });

  it('does not move while disabled', () => {
    renderSlider({ disabled: true });
    getThumb().focus();

    pressKeyOnFocused('ArrowRight');

    expect(getThumb()).toHaveAttribute('aria-valuenow', '50');
  });
});

describe('Slider state', () => {
  it('snaps the starting value to the step and range', () => {
    renderSlider({ value: 47, step: 5, max: 40 });

    expect(getThumb()).toHaveAttribute('aria-valuenow', '40');
  });

  it('reports changes through onChange', () => {
    const onChange = vi.fn<(value: number) => void>();
    renderSlider({ onChange });
    getThumb().focus();

    pressKeyOnFocused('ArrowRight');

    expect(onChange).toHaveBeenCalledWith(51);
  });

  it('follows value when controlled', async () => {
    const [value, setValue] = createSignal(10);
    render(() => (
      <Slider
        value={value()}
        onChange={(next) => {
          setValue(next);
        }}
      >
        <SliderTrack>
          <SliderThumb aria-label="Zoom" />
        </SliderTrack>
      </Slider>
    ));
    const thumb = screen.getByRole('slider', { name: 'Zoom' });
    thumb.focus();

    pressKeyOnFocused('ArrowRight');
    await Promise.resolve();

    expect(value()).toBe(11);
    expect(thumb).toHaveAttribute('aria-valuenow', '11');
  });

  it('submits its value with a form', () => {
    renderSlider({ value: 25, name: 'volume' });

    const input = document.querySelector<HTMLInputElement>('input[name="volume"]');
    expect(input?.type).toBe('hidden');
    expect(input?.value).toBe('25');
  });

  it('sets the value from a press on the track and focuses the thumb', () => {
    renderSlider();
    const track = screen.getByTestId('track');
    vi.spyOn(track, 'getBoundingClientRect').mockReturnValue(
      DOMRect.fromRect({ x: 0, y: 0, width: 200, height: 10 }),
    );

    fireEvent.pointerDown(track, { button: 0, pointerId: 1, clientX: 150, clientY: 5 });

    expect(getThumb()).toHaveAttribute('aria-valuenow', '75');
    expect(document.activeElement).toBe(getThumb());

    fireEvent.pointerMove(track, { pointerId: 1, clientX: 20, clientY: 5 });
    expect(getThumb()).toHaveAttribute('aria-valuenow', '10');

    fireEvent.pointerUp(track, { pointerId: 1 });
    fireEvent.pointerMove(track, { pointerId: 1, clientX: 180, clientY: 5 });
    expect(getThumb()).toHaveAttribute('aria-valuenow', '10');
  });

  it('passes its state to a render prop', () => {
    render(() => (
      <Slider defaultValue={40}>
        {(state) => (
          <SliderTrack>
            <SliderThumb aria-label="Zoom">{`${state.percent()}%`}</SliderThumb>
          </SliderTrack>
        )}
      </Slider>
    ));

    expect(screen.getByRole('slider', { name: 'Zoom' })).toHaveTextContent('40%');
  });
});
