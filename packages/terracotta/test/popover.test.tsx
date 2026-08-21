import { fireEvent, render, screen } from '@solidjs/testing-library';
import { activeElement, settle } from './aria';
import { describe, expect, it } from 'vitest';
import { Button } from '../src/components/button';
import { Popover, PopoverButton, PopoverOverlay, PopoverPanel } from '../src/components/popover';

function renderPopover(
  props: { open?: boolean; disabled?: boolean } = {},
): ReturnType<typeof render> {
  return render(() => (
    <Popover defaultOpen={props.open ?? false} disabled={props.disabled}>
      <PopoverButton>Options</PopoverButton>
      <PopoverPanel data-testid="panel">
        <Button>Rename</Button>
        <Button>Duplicate</Button>
      </PopoverPanel>
    </Popover>
  ));
}

describe('Popover accessibility', () => {
  it('marks the trigger as collapsed while closed', async () => {
    renderPopover();
    await settle();

    expect(screen.getByRole('button', { name: 'Options' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });

  it('does not render the panel while closed', async () => {
    renderPopover();
    await settle();

    expect(screen.queryByRole('button', { name: 'Rename' })).not.toBeInTheDocument();
  });

  it('omits `aria-controls` while closed instead of pointing at a missing id', async () => {
    renderPopover();
    await settle();

    expect(screen.getByRole('button', { name: 'Options' })).not.toHaveAttribute('aria-controls');
  });

  it('marks the trigger as expanded and links it to the panel once open', async () => {
    renderPopover({ open: true });
    await settle();
    const button = screen.getByRole('button', { name: 'Options' });
    const panel = screen.getByTestId('panel');

    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(button).toHaveAttribute('aria-controls', panel.id);
  });

  it('moves focus into the panel when opened', async () => {
    renderPopover({ open: true });
    await settle();

    expect(await activeElement()).toBe(screen.getByRole('button', { name: 'Rename' }));
  });

  it('keeps Tab inside the panel', async () => {
    renderPopover({ open: true });
    await settle();
    const rename = screen.getByRole('button', { name: 'Rename' });
    const duplicate = screen.getByRole('button', { name: 'Duplicate' });

    fireEvent.keyDown(rename, { key: 'Tab' });

    expect(await activeElement()).toBe(duplicate);
  });

  it('closes on Escape', async () => {
    renderPopover({ open: true });
    await settle();

    fireEvent.keyDown(screen.getByRole('button', { name: 'Rename' }), {
      key: 'Escape',
    });

    expect(screen.getByRole('button', { name: 'Options' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });

  it('opens on click', async () => {
    renderPopover();
    await settle();
    const button = screen.getByRole('button', { name: 'Options' });

    button.click();

    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('does not open while disabled', async () => {
    renderPopover({ disabled: true });
    await settle();
    const button = screen.getByRole('button', { name: 'Options' });

    expect(button).toHaveAttribute('aria-disabled', 'true');
    expect(button).toHaveAttribute('tabindex', '-1');

    button.click();

    expect(button).toHaveAttribute('aria-expanded', 'false');
  });
});

describe('PopoverOverlay', () => {
  it('closes the popover when clicked', () => {
    render(() => (
      <Popover defaultOpen>
        <PopoverButton>Options</PopoverButton>
        <PopoverOverlay data-testid="overlay" />
        <PopoverPanel data-testid="panel">
          <Button>Rename</Button>
        </PopoverPanel>
      </Popover>
    ));

    fireEvent.click(screen.getByTestId('overlay'));

    expect(screen.queryByTestId('panel')).not.toBeInTheDocument();
  });

  it('carries `tc-expanded` while the popover is open', () => {
    render(() => (
      <Popover defaultOpen>
        <PopoverButton>Options</PopoverButton>
        <PopoverOverlay data-testid="overlay" />
        <PopoverPanel data-testid="panel">
          <Button>Rename</Button>
        </PopoverPanel>
      </Popover>
    ));

    expect(screen.getByTestId('overlay')).toHaveAttribute('tc-expanded');
  });

  it('stays mounted while the popover is closed, and reports the state', () => {
    render(() => (
      <Popover defaultOpen={false}>
        <PopoverButton>Options</PopoverButton>
        <PopoverOverlay data-testid="overlay" />
        <PopoverPanel data-testid="panel">
          <Button>Rename</Button>
        </PopoverPanel>
      </Popover>
    ));

    // Unlike the panel, the overlay is never unmounted. `tc-expanded` is
    // present only while open, so `[tc-expanded]` is the hook for showing it.
    // An overlay left visible while closed would swallow clicks on the page.
    expect(screen.getByTestId('overlay')).not.toHaveAttribute('tc-expanded');
  });

  it('requires a surrounding Popover', () => {
    expect(() => render(() => <PopoverOverlay />)).toThrow(/must be used inside a <Popover>/);
  });
});
