import { render, screen } from '@solidjs/testing-library';
import { describe, expect, it } from 'vitest';
import { Toggle } from '../src';

describe('Toggle accessibility', () => {
  it('exposes the pressed state through `aria-pressed`', () => {
    render(() => <Toggle defaultPressed={false}>Bold</Toggle>);
    const toggle = screen.getByRole('button', { name: 'Bold' });

    expect(toggle).toHaveAttribute('aria-pressed', 'false');
  });

  it('flips `aria-pressed` when clicked', () => {
    render(() => <Toggle defaultPressed={false}>Bold</Toggle>);
    const toggle = screen.getByRole('button', { name: 'Bold' });

    toggle.click();

    expect(toggle).toHaveAttribute('aria-pressed', 'true');
    expect(toggle).toHaveAttribute('tc-pressed');
  });

  it('starts pressed when `defaultPressed` is true', () => {
    render(() => <Toggle defaultPressed={true}>Bold</Toggle>);

    expect(screen.getByRole('button', { name: 'Bold' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  it('does not change state while disabled', () => {
    render(() => (
      <Toggle defaultPressed={false} disabled={true}>
        Bold
      </Toggle>
    ));
    const toggle = screen.getByRole('button', { name: 'Bold' });

    expect(toggle).toHaveAttribute('aria-disabled', 'true');
    expect(toggle).toHaveAttribute('tabindex', '-1');

    toggle.click();

    expect(toggle).toHaveAttribute('aria-pressed', 'false');
  });

  it('reflects a controlled `pressed` prop', () => {
    render(() => <Toggle pressed={true}>Bold</Toggle>);

    expect(screen.getByRole('button', { name: 'Bold' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });
});
