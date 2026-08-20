import { fireEvent, render, screen } from '@solidjs/testing-library';
import { describe, expect, it, vi } from 'vitest';
import { describedBy, labelledBy } from './aria';
import { Button, Dialog, DialogDescription, DialogOverlay, DialogPanel, DialogTitle } from '../src';

function renderDialog(
  props: { open?: boolean; onClose?: () => void } = {},
): ReturnType<typeof render> {
  return render(() => (
    <Dialog defaultOpen={props.open ?? true} onClose={props.onClose}>
      <DialogOverlay data-testid="overlay" />
      <DialogPanel>
        <DialogTitle>Delete file</DialogTitle>
        <DialogDescription>This cannot be undone</DialogDescription>
        <Button>Cancel</Button>
        <Button>Confirm</Button>
      </DialogPanel>
    </Dialog>
  ));
}

describe('Dialog accessibility', () => {
  it('exposes a modal dialog', () => {
    renderDialog();
    const dialog = screen.getByRole('dialog');

    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });

  it('names and describes the dialog', () => {
    renderDialog();
    const dialog = screen.getByRole('dialog');

    expect(labelledBy(dialog)).toHaveTextContent('Delete file');
    expect(describedBy(dialog)).toHaveTextContent('This cannot be undone');
  });

  it('stays out of the accessibility tree while closed', () => {
    renderDialog({ open: false });

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('moves focus into the panel when opened', () => {
    renderDialog();

    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Cancel' }));
  });

  it('keeps Tab inside the panel', () => {
    renderDialog();
    const cancel = screen.getByRole('button', { name: 'Cancel' });
    const confirm = screen.getByRole('button', { name: 'Confirm' });

    fireEvent.keyDown(cancel, { key: 'Tab' });
    expect(document.activeElement).toBe(confirm);

    // Wrapping around from the last focusable element returns to the first.
    fireEvent.keyDown(confirm, { key: 'Tab' });
    expect(document.activeElement).toBe(cancel);
  });

  it('walks backwards with Shift+Tab', () => {
    renderDialog();
    const cancel = screen.getByRole('button', { name: 'Cancel' });
    const confirm = screen.getByRole('button', { name: 'Confirm' });

    fireEvent.keyDown(cancel, { key: 'Tab', shiftKey: true });

    expect(document.activeElement).toBe(confirm);
  });

  it('closes on Escape', () => {
    const onClose = vi.fn();
    renderDialog({
      onClose: () => {
        onClose();
      },
    });

    fireEvent.keyDown(screen.getByRole('button', { name: 'Cancel' }), {
      key: 'Escape',
    });

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes when the overlay is clicked', () => {
    renderDialog();

    screen.getByTestId('overlay').click();

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('restores focus to the previously focused element on close', () => {
    const trigger = document.createElement('button');
    document.body.appendChild(trigger);
    trigger.focus();

    const { unmount } = render(() => (
      <Dialog defaultOpen={false}>
        <DialogPanel>
          <DialogTitle>Delete file</DialogTitle>
          <Button>Cancel</Button>
        </DialogPanel>
      </Dialog>
    ));

    expect(document.activeElement).toBe(trigger);

    unmount();
    trigger.remove();
  });
});
