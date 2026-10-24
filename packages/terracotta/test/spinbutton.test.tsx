import { fireEvent, render, screen } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { describe, expect, it, vi } from 'vitest';
import {
  Spinbutton,
  SpinbuttonDecrement,
  SpinbuttonIncrement,
  SpinbuttonInput,
  SpinbuttonLabel,
} from '../src/components/spinbutton';
import { pressKeyOnFocused } from './aria';

type Options = {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  onChange?: (value: number) => void;
  getValueText?: (value: number) => string;
};

function renderSpinbutton(options: Options = {}): void {
  render(() => (
    <Spinbutton
      defaultValue={options.value ?? 2}
      min={'min' in options ? options.min : 0}
      max={'max' in options ? options.max : 10}
      step={options.step}
      disabled={options.disabled}
      onChange={options.onChange}
      getValueText={options.getValueText}
    >
      <SpinbuttonLabel>Adults</SpinbuttonLabel>
      <SpinbuttonDecrement aria-label="Decrease" />
      <SpinbuttonInput />
      <SpinbuttonIncrement aria-label="Increase" />
    </Spinbutton>
  ));
}

function asInput(element: HTMLElement): HTMLInputElement {
  if (!(element instanceof HTMLInputElement)) {
    throw new Error('Expected an input');
  }
  return element;
}

function getField(): HTMLInputElement {
  return asInput(screen.getByRole('spinbutton', { name: 'Adults' }));
}

function type(text: string): void {
  const field = getField();
  field.value = text;
  fireEvent.input(field);
}

describe('Spinbutton accessibility', () => {
  it('puts the spinbutton role and value range on the field', () => {
    renderSpinbutton();

    expect(getField()).toHaveAttribute('aria-valuenow', '2');
    expect(getField()).toHaveAttribute('aria-valuemin', '0');
    expect(getField()).toHaveAttribute('aria-valuemax', '10');
    expect(getField()).toHaveValue('2');
  });

  it('leaves out the limits it does not have', () => {
    renderSpinbutton({ min: undefined, max: undefined });

    expect(getField()).not.toHaveAttribute('aria-valuemin');
    expect(getField()).not.toHaveAttribute('aria-valuemax');
  });

  it('is named by its label', () => {
    renderSpinbutton();

    expect(getField()).toHaveAttribute('aria-labelledby', screen.getByText('Adults').id);
  });

  it('keeps the buttons out of the tab sequence and points them at the field', () => {
    renderSpinbutton();
    const increase = screen.getByRole('button', { name: 'Increase' });

    expect(increase).toHaveAttribute('tabindex', '-1');
    expect(increase).toHaveAttribute('aria-controls', getField().id);
  });

  it('describes the value with aria-valuetext', () => {
    renderSpinbutton({ getValueText: (value) => `${value} adults` });

    expect(getField()).toHaveAttribute('aria-valuetext', '2 adults');
  });

  it('marks text out of range as invalid', () => {
    renderSpinbutton();

    type('42');

    expect(getField()).toHaveAttribute('aria-invalid', 'true');
  });
});

describe('Spinbutton keyboard', () => {
  it.each([
    ['ArrowUp', 3],
    ['ArrowDown', 1],
    ['PageUp', 10],
    ['PageDown', 0],
    ['Home', 0],
    ['End', 10],
  ])('handles %s', (key, expected) => {
    renderSpinbutton();
    getField().focus();

    pressKeyOnFocused(key);

    expect(getField()).toHaveAttribute('aria-valuenow', String(expected));
    expect(getField()).toHaveValue(String(expected));
  });

  it('leaves Home and End to the caret without limits', () => {
    renderSpinbutton({ min: undefined, max: undefined });
    getField().focus();

    pressKeyOnFocused('Home');

    expect(getField()).toHaveAttribute('aria-valuenow', '2');
  });

  it('steps without drifting', () => {
    renderSpinbutton({ value: 0.2, step: 0.1 });
    getField().focus();

    pressKeyOnFocused('ArrowUp');

    expect(getField()).toHaveValue('0.3');
  });

  it('keeps the decimals of a fractional minimum', () => {
    renderSpinbutton({ value: 0.25, min: 0.25, max: 2, step: 0.5 });
    getField().focus();

    expect(getField()).toHaveAttribute('aria-valuenow', '0.25');

    pressKeyOnFocused('ArrowUp');

    expect(getField()).toHaveAttribute('aria-valuenow', '0.75');
  });

  it('reaches the maximum with End when it is not on the step grid', () => {
    renderSpinbutton({ value: 0, min: 0, max: 10, step: 3 });
    getField().focus();

    pressKeyOnFocused('End');

    expect(getField()).toHaveAttribute('aria-valuenow', '10');
  });
});

describe('Spinbutton typing', () => {
  it('sets the value from typed text that is in range', () => {
    const onChange = vi.fn<(value: number) => void>();
    renderSpinbutton({ onChange });

    type('7');

    expect(onChange).toHaveBeenCalledWith(7);
    expect(getField()).toHaveAttribute('aria-valuenow', '7');
  });

  it('waits for the commit to snap text that is off the step', () => {
    const onChange = vi.fn<(value: number) => void>();
    renderSpinbutton({ value: 0, max: 100, step: 5, onChange });
    getField().focus();

    type('3');

    expect(onChange).not.toHaveBeenCalled();
    expect(getField()).toHaveAttribute('aria-valuenow', '0');

    type('35');

    expect(onChange).toHaveBeenLastCalledWith(35);

    type('32');
    getField().blur();

    expect(getField()).toHaveValue('30');
    expect(onChange).toHaveBeenLastCalledWith(30);
  });

  it('clamps out-of-range text on blur', () => {
    renderSpinbutton();
    getField().focus();

    type('42');
    getField().blur();

    expect(getField()).toHaveValue('10');
    expect(getField()).not.toHaveAttribute('aria-invalid');
  });

  it('drops text that is not a number on blur', () => {
    renderSpinbutton();
    getField().focus();

    type('abc');
    getField().blur();

    expect(getField()).toHaveValue('2');
  });

  it('commits typed text before stepping', () => {
    renderSpinbutton();
    getField().focus();

    type('20');
    pressKeyOnFocused('ArrowDown');

    expect(getField()).toHaveValue('9');
  });
});

describe('Spinbutton buttons', () => {
  it('step the value and leave focus in the field', () => {
    renderSpinbutton();
    getField().focus();

    fireEvent.click(screen.getByRole('button', { name: 'Increase' }));

    expect(getField()).toHaveValue('3');
    expect(document.activeElement).toBe(getField());
  });

  it('are disabled at the limits', () => {
    renderSpinbutton({ value: 10 });

    expect(screen.getByRole('button', { name: 'Increase' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Decrease' })).toBeEnabled();
  });
});

describe('Spinbutton state', () => {
  it('follows value when controlled', async () => {
    const [value, setValue] = createSignal(4);
    render(() => (
      <Spinbutton
        value={value()}
        onChange={(next) => {
          setValue(next);
        }}
      >
        <SpinbuttonInput aria-label="Children" />
      </Spinbutton>
    ));
    const field = screen.getByRole('spinbutton', { name: 'Children' });
    field.focus();

    pressKeyOnFocused('ArrowUp');
    await Promise.resolve();

    expect(value()).toBe(5);
    expect(field).toHaveValue('5');
  });

  it('keeps a controlled value in range', () => {
    render(() => (
      <Spinbutton value={50} min={0} max={10}>
        <SpinbuttonInput aria-label="Children" />
      </Spinbutton>
    ));

    expect(screen.getByRole('spinbutton', { name: 'Children' })).toHaveAttribute(
      'aria-valuenow',
      '10',
    );
  });

  it('does not change while disabled', () => {
    renderSpinbutton({ disabled: true });

    expect(getField()).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Increase' })).toBeDisabled();
  });

  it('formats and parses the text', () => {
    render(() => (
      <Spinbutton
        defaultValue={5}
        formatValue={(value) => `${value} kg`}
        parseValue={(text) => Number.parseFloat(text)}
      >
        <SpinbuttonInput aria-label="Weight" />
      </Spinbutton>
    ));
    const field = screen.getByRole('spinbutton', { name: 'Weight' });

    expect(field).toHaveValue('5 kg');

    asInput(field).value = '8 kg';
    fireEvent.input(field);
    field.blur();

    expect(field).toHaveValue('8 kg');
  });
});
