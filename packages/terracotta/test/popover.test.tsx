import { fireEvent, render, screen } from '@solidjs/testing-library';
import { describe, expect, it } from 'vitest';
import { Button, Popover, PopoverButton, PopoverPanel } from '../src';

function renderPopover(props: { open?: boolean; disabled?: boolean } = {}) {
  return render(() => (
    <Popover defaultOpen={props.open ?? false} disabled={props.disabled}>
      <PopoverButton>Options</PopoverButton>
      <PopoverPanel>
        <Button>Rename</Button>
        <Button>Duplicate</Button>
      </PopoverPanel>
    </Popover>
  ));
}

describe('Popover accessibility', () => {
  it('marks the trigger as collapsed while closed', () => {
    renderPopover();

    expect(screen.getByRole('button', { name: 'Options' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });

  it('does not render the panel while closed', () => {
    renderPopover();

    expect(
      screen.queryByRole('button', { name: 'Rename' }),
    ).not.toBeInTheDocument();
  });

  it('omits `aria-controls` while closed instead of pointing at a missing id', () => {
    renderPopover();

    expect(screen.getByRole('button', { name: 'Options' })).not.toHaveAttribute(
      'aria-controls',
    );
  });

  it('marks the trigger as expanded and links it to the panel once open', () => {
    renderPopover({ open: true });
    const button = screen.getByRole('button', { name: 'Options' });
    const panel = screen.getByRole('button', { name: 'Rename' })
      .parentElement as HTMLElement;

    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(button).toHaveAttribute('aria-controls', panel.id);
  });

  it('moves focus into the panel when opened', () => {
    renderPopover({ open: true });

    expect(document.activeElement).toBe(
      screen.getByRole('button', { name: 'Rename' }),
    );
  });

  it('keeps Tab inside the panel', () => {
    renderPopover({ open: true });
    const rename = screen.getByRole('button', { name: 'Rename' });
    const duplicate = screen.getByRole('button', { name: 'Duplicate' });

    fireEvent.keyDown(rename, { key: 'Tab' });

    expect(document.activeElement).toBe(duplicate);
  });

  it('closes on Escape', () => {
    renderPopover({ open: true });

    fireEvent.keyDown(screen.getByRole('button', { name: 'Rename' }), {
      key: 'Escape',
    });

    expect(screen.getByRole('button', { name: 'Options' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });

  it('opens on click', () => {
    renderPopover();
    const button = screen.getByRole('button', { name: 'Options' });

    button.click();

    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('does not open while disabled', () => {
    renderPopover({ disabled: true });
    const button = screen.getByRole('button', { name: 'Options' });

    expect(button).toHaveAttribute('aria-disabled', 'true');
    expect(button).toHaveAttribute('tabindex', '-1');

    button.click();

    expect(button).toHaveAttribute('aria-expanded', 'false');
  });
});
