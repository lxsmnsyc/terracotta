import { render, screen } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { describe, expect, it } from 'vitest';
import { Meter, MeterLabel } from '../src/components/meter';
import { settle } from './aria';

describe('Meter accessibility', () => {
  it('uses the meter role with its range', () => {
    render(() => <Meter value={40} aria-label="Battery" />);
    const meter = screen.getByRole('meter', { name: 'Battery' });

    expect(meter).toHaveAttribute('aria-valuenow', '40');
    expect(meter).toHaveAttribute('aria-valuemin', '0');
    expect(meter).toHaveAttribute('aria-valuemax', '100');
  });

  it('is named by its label', async () => {
    render(() => (
      <Meter value={3} min={0} max={5}>
        <MeterLabel>Signal</MeterLabel>
      </Meter>
    ));
    await settle();

    expect(screen.getByRole('meter', { name: 'Signal' })).toHaveAttribute('aria-valuemax', '5');
  });

  it('is named by a label given its own id', async () => {
    render(() => (
      <Meter value={3} min={0} max={5}>
        <MeterLabel id="signal-label">Signal</MeterLabel>
      </Meter>
    ));
    await settle();

    const meter = screen.getByRole('meter', { name: 'Signal' });
    expect(meter).toHaveAttribute('aria-labelledby', 'signal-label');
  });

  it('describes the value with aria-valuetext', () => {
    render(() => (
      <Meter value={50} aria-label="Battery" getValueText={(value) => `${value}%, 6 hours left`} />
    ));

    expect(screen.getByRole('meter')).toHaveAttribute('aria-valuetext', '50%, 6 hours left');
  });

  it('keeps the value in range', () => {
    render(() => <Meter value={140} aria-label="Battery" />);

    expect(screen.getByRole('meter')).toHaveAttribute('aria-valuenow', '100');
  });

  it('keeps max above min', () => {
    render(() => <Meter value={5} min={10} max={10} aria-label="Level" />);

    expect(screen.getByRole('meter')).toHaveAttribute('aria-valuemax', '11');
  });

  it('follows the value and passes percent to a render prop', async () => {
    const [value, setValue] = createSignal(20);
    render(() => (
      <Meter value={value()} min={0} max={200} aria-label="Storage">
        {(state) => <span data-testid="fill" style={{ 'inline-size': `${state.percent()}%` }} />}
      </Meter>
    ));

    expect(screen.getByTestId('fill')).toHaveStyle({ 'inline-size': '10%' });

    setValue(100);
    await settle();

    expect(screen.getByRole('meter')).toHaveAttribute('aria-valuenow', '100');
    expect(screen.getByTestId('fill')).toHaveStyle({ 'inline-size': '50%' });
  });
});
