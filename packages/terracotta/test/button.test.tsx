import { fireEvent, render, screen } from '@solidjs/testing-library';
import { describe, expect, it, vi } from 'vitest';
import { Button } from '../src/components/button';

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
      <Button
        as="div"
        onClick={() => {
          onClick();
        }}
      >
        Save
      </Button>
    ));
    const button = screen.getByRole('button', { name: 'Save' });

    expect(button.tagName).toBe('DIV');
    expect(button).toHaveAttribute('tabindex', '0');

    fireEvent.keyDown(button, { key: 'Enter' });
    expect(onClick).toHaveBeenCalledTimes(1);

    // Space activates on release, as on a native button.
    fireEvent.keyDown(button, { key: ' ' });
    expect(onClick).toHaveBeenCalledTimes(1);
    fireEvent.keyUp(button, { key: ' ' });
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it('stops Space from scrolling the page', () => {
    render(() => <Button as="div">Save</Button>);
    const button = screen.getByRole('button', { name: 'Save' });
    const event = new KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: true });

    button.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(true);
  });

  it('does not activate a disabled non-button element', () => {
    const onClick = vi.fn();
    render(() => (
      <Button
        as="div"
        disabled
        onClick={() => {
          onClick();
        }}
      >
        Save
      </Button>
    ));
    const button = screen.getByRole('button', { name: 'Save' });

    fireEvent.keyDown(button, { key: 'Enter' });
    fireEvent.keyDown(button, { key: ' ' });
    fireEvent.keyUp(button, { key: ' ' });
    fireEvent.click(button);

    expect(onClick).not.toHaveBeenCalled();
  });

  it('blocks the default action of a disabled link', () => {
    render(() => (
      <Button as="a" href="#next" disabled>
        Next
      </Button>
    ));
    const event = new MouseEvent('click', { bubbles: true, cancelable: true });

    screen.getByRole('button', { name: 'Next' }).dispatchEvent(event);

    expect(event.defaultPrevented).toBe(true);
  });

  it('leaves Enter to a link, which already clicks on Enter', () => {
    const onClick = vi.fn();
    render(() => (
      <Button
        as="a"
        href="#next"
        onClick={(e: MouseEvent) => {
          e.preventDefault();
          onClick();
        }}
      >
        Next
      </Button>
    ));
    const link = screen.getByRole('button', { name: 'Next' });
    const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true });

    link.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(false);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('does not synthesize keyboard clicks on a native button', () => {
    // Native buttons already turn Enter/Space into clicks, so the library must
    // not add a second listener that would fire the handler twice.
    const onClick = vi.fn();
    render(() => (
      <Button
        onClick={() => {
          onClick();
        }}
      >
        Save
      </Button>
    ));

    fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter' });

    expect(onClick).not.toHaveBeenCalled();
  });
});
