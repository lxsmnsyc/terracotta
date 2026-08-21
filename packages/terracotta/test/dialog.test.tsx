import { fireEvent, render, screen } from '@solidjs/testing-library';
import { describe, expect, it, vi } from 'vitest';
import { activeElement, describedBy, labelledBy, settle } from './aria';
import { Button } from '../src/components/button';
import {
  Dialog,
  DialogDescription,
  DialogOverlay,
  DialogPanel,
  DialogTitle,
} from '../src/components/dialog';

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
  it('exposes a modal dialog', async () => {
    renderDialog();
    await settle();
    const dialog = screen.getByRole('dialog');

    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });

  it('names and describes the dialog', async () => {
    renderDialog();
    await settle();
    const dialog = screen.getByRole('dialog');

    expect(labelledBy(dialog)).toHaveTextContent('Delete file');
    expect(describedBy(dialog)).toHaveTextContent('This cannot be undone');
  });

  it('stays out of the accessibility tree while closed', async () => {
    renderDialog({ open: false });
    await settle();

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('moves focus into the panel when opened', async () => {
    renderDialog();
    await settle();

    expect(await activeElement()).toBe(screen.getByRole('button', { name: 'Cancel' }));
  });

  it('keeps Tab inside the panel', async () => {
    renderDialog();
    await settle();
    const cancel = screen.getByRole('button', { name: 'Cancel' });
    const confirm = screen.getByRole('button', { name: 'Confirm' });

    fireEvent.keyDown(cancel, { key: 'Tab' });
    expect(await activeElement()).toBe(confirm);

    // Wrapping around from the last focusable element returns to the first.
    fireEvent.keyDown(confirm, { key: 'Tab' });
    expect(await activeElement()).toBe(cancel);
  });

  it('walks backwards with Shift+Tab', async () => {
    renderDialog();
    await settle();
    const cancel = screen.getByRole('button', { name: 'Cancel' });
    const confirm = screen.getByRole('button', { name: 'Confirm' });

    fireEvent.keyDown(cancel, { key: 'Tab', shiftKey: true });

    expect(await activeElement()).toBe(confirm);
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

  it('closes when the overlay is clicked', async () => {
    renderDialog();
    await settle();

    screen.getByTestId('overlay').click();

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('restores focus to the previously focused element on close', async () => {
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

    expect(await activeElement()).toBe(trigger);

    unmount();
    trigger.remove();
  });
});
