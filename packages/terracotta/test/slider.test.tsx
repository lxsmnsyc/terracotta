import { fireEvent, render, screen } from '@solidjs/testing-library';
import { createSignal, flush } from 'solid-js';
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

describe('Slider with several thumbs', () => {
  function renderRange(onChange?: (value: readonly number[]) => void): void {
    render(() => (
      <Slider defaultValue={[20, 80]} onChange={onChange} name="price">
        <SliderLabel>Price</SliderLabel>
        <SliderTrack data-testid="track">
          <SliderThumb index={0} aria-label="Minimum price" />
          <SliderThumb index={1} aria-label="Maximum price" />
        </SliderTrack>
      </Slider>
    ));
  }

  function getMin(): HTMLElement {
    return screen.getByRole('slider', { name: 'Minimum price' });
  }

  function getMax(): HTMLElement {
    return screen.getByRole('slider', { name: 'Maximum price' });
  }

  it('names the group with the label, and each thumb by itself', () => {
    renderRange();

    const group = screen.getByRole('group', { name: 'Price' });
    expect(group).toContainElement(getMin());
    expect(getMin()).not.toHaveAttribute('aria-labelledby');
  });

  it('limits each thumb by its neighbour', () => {
    renderRange();

    expect(getMin()).toHaveAttribute('aria-valuemin', '0');
    expect(getMin()).toHaveAttribute('aria-valuemax', '80');
    expect(getMax()).toHaveAttribute('aria-valuemin', '20');
    expect(getMax()).toHaveAttribute('aria-valuemax', '100');
  });

  it('updates the neighbour limits as a thumb moves', () => {
    renderRange();
    getMin().focus();

    pressKeyOnFocused('ArrowRight');

    expect(getMin()).toHaveAttribute('aria-valuenow', '21');
    expect(getMax()).toHaveAttribute('aria-valuemin', '21');
  });

  it('stops a thumb at its neighbour', () => {
    renderRange();
    getMin().focus();

    pressKeyOnFocused('End');

    expect(getMin()).toHaveAttribute('aria-valuenow', '80');

    pressKeyOnFocused('ArrowRight');

    expect(getMin()).toHaveAttribute('aria-valuenow', '80');
  });

  it('reports every value through onChange', () => {
    const onChange = vi.fn<(value: readonly number[]) => void>();
    renderRange(onChange);
    getMax().focus();

    pressKeyOnFocused('ArrowLeft');

    expect(onChange).toHaveBeenCalledWith([20, 79]);
  });

  it('moves the thumb nearest a press on the track', () => {
    renderRange();
    const track = screen.getByTestId('track');
    vi.spyOn(track, 'getBoundingClientRect').mockReturnValue(
      DOMRect.fromRect({ x: 0, y: 0, width: 100, height: 10 }),
    );

    fireEvent.pointerDown(track, { button: 0, pointerId: 1, clientX: 70, clientY: 5 });

    expect(getMax()).toHaveAttribute('aria-valuenow', '70');
    expect(getMin()).toHaveAttribute('aria-valuenow', '20');
    expect(document.activeElement).toBe(getMax());
  });

  it('focuses the thumb that holds an index after the indexes change', () => {
    const [swapped, setSwapped] = createSignal(false);
    render(() => (
      <Slider defaultValue={[20, 80]}>
        <SliderTrack data-testid="track">
          <SliderThumb index={swapped() ? 1 : 0} aria-label="A" />
          <SliderThumb index={swapped() ? 0 : 1} aria-label="B" />
        </SliderTrack>
      </Slider>
    ));
    const track = screen.getByTestId('track');
    vi.spyOn(track, 'getBoundingClientRect').mockReturnValue(
      DOMRect.fromRect({ x: 0, y: 0, width: 100, height: 10 }),
    );

    setSwapped(true);
    flush();
    fireEvent.pointerDown(track, { button: 0, pointerId: 1, clientX: 70, clientY: 5 });

    expect(document.activeElement).toBe(screen.getByRole('slider', { name: 'A' }));
  });

  function renderTied(): HTMLElement {
    render(() => (
      <Slider defaultValue={[50, 50]}>
        <SliderTrack data-testid="track">
          <SliderThumb index={0} aria-label="Low" />
          <SliderThumb index={1} aria-label="High" />
        </SliderTrack>
      </Slider>
    ));
    const track = screen.getByTestId('track');
    vi.spyOn(track, 'getBoundingClientRect').mockReturnValue(
      DOMRect.fromRect({ x: 0, y: 0, width: 100, height: 10 }),
    );
    return track;
  }

  it.each([
    ['up', 70, 'High', ['50', '70']],
    ['down', 30, 'Low', ['30', '50']],
  ])('pulls thumbs that share a value apart when dragged %s', (_, to, moved, expected) => {
    const track = renderTied();

    fireEvent.pointerDown(track, { button: 0, pointerId: 1, clientX: 50, clientY: 5 });
    fireEvent.pointerMove(track, { pointerId: 1, clientX: to, clientY: 5 });

    const values = ['Low', 'High'].map((name) =>
      screen.getByRole('slider', { name }).getAttribute('aria-valuenow'),
    );
    expect(values).toEqual(expected);
    expect(document.activeElement).toBe(screen.getByRole('slider', { name: moved }));
  });

  it('submits one input per thumb', () => {
    renderRange();

    const inputs = document.querySelectorAll<HTMLInputElement>('input[name="price"]');
    expect(Array.from(inputs, (input) => input.value)).toEqual(['20', '80']);
  });

  it('sorts a starting value given out of order', () => {
    render(() => (
      <Slider defaultValue={[60, 10]}>
        <SliderTrack>
          <SliderThumb index={0} aria-label="Low" />
          <SliderThumb index={1} aria-label="High" />
        </SliderTrack>
      </Slider>
    ));

    expect(screen.getByRole('slider', { name: 'Low' })).toHaveAttribute('aria-valuenow', '10');
    expect(screen.getByRole('slider', { name: 'High' })).toHaveAttribute('aria-valuenow', '60');
  });
});
