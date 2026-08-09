import { fireEvent, render, screen } from '@solidjs/testing-library';
import { describe, expect, it, vi } from 'vitest';
import { Button } from '../src';

describe('Button accessibility', () => {
  it('renders a native button with the `button` role', () => {
    render(() => <Button>Save</Button>);
    const button = screen.getByRole('button', { name: 'Save' });

    expect(button.tagName).toBe('BUTTON');
    expect(button).toHaveAttribute('tabindex', '0');
  });

  it('marks a disabled button as disabled for assistive technology', () => {
    render(() => <Button disabled={true}>Save</Button>);
    const button = screen.getByRole('button', { name: 'Save' });

    expect(button).toHaveAttribute('aria-disabled', 'true');
    expect(button).toHaveAttribute('tabindex', '-1');
    expect(button).toHaveAttribute('tc-disabled');
  });

  it('keeps a non-button element operable with Enter and Space', () => {
    const onClick = vi.fn();
    render(() => (
      <Button as="div" onClick={onClick}>
        Save
      </Button>
    ));
    const button = screen.getByRole('button', { name: 'Save' });

    expect(button.tagName).toBe('DIV');
    expect(button).toHaveAttribute('tabindex', '0');

    fireEvent.keyDown(button, { key: 'Enter' });
    fireEvent.keyDown(button, { key: ' ' });

    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it('does not synthesize keyboard clicks on a native button', () => {
    // Native buttons already turn Enter/Space into clicks, so the library must
    // not add a second listener that would fire the handler twice.
    const onClick = vi.fn();
    render(() => <Button onClick={onClick}>Save</Button>);

    fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter' });

    expect(onClick).not.toHaveBeenCalled();
  });
});
