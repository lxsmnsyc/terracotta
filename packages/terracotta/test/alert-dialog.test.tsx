import { fireEvent, render, screen } from '@solidjs/testing-library';
import { describe, expect, it, vi } from 'vitest';
import { describedBy, labelledBy, pressKeyOnFocused } from './aria';
import {
  AlertDialog,
  AlertDialogDescription,
  AlertDialogOverlay,
  AlertDialogPanel,
  AlertDialogTitle,
  Button,
} from '../src';

function renderAlertDialog(
  props: { open?: boolean; onClose?: () => void } = {},
): ReturnType<typeof render> {
  return render(() => (
    <AlertDialog defaultOpen={props.open ?? true} onClose={props.onClose}>
      <AlertDialogOverlay data-testid="overlay" />
      <AlertDialogPanel>
        <AlertDialogTitle>Payment failed</AlertDialogTitle>
        <AlertDialogDescription>Try another card</AlertDialogDescription>
        <Button>Dismiss</Button>
        <Button>Retry</Button>
      </AlertDialogPanel>
    </AlertDialog>
  ));
}

describe('AlertDialog accessibility', () => {
  it('uses the alertdialog role, so it is announced on open', () => {
    renderAlertDialog();

    // The distinction from `dialog` is the whole point of the component: an
    // alertdialog interrupts, a dialog does not.
    expect(screen.getByRole('alertdialog')).toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('is modal', () => {
    renderAlertDialog();

    expect(screen.getByRole('alertdialog')).toHaveAttribute('aria-modal', 'true');
  });

  it('names and describes itself', () => {
    renderAlertDialog();
    const dialog = screen.getByRole('alertdialog');

    expect(labelledBy(dialog)).toHaveTextContent('Payment failed');
    expect(describedBy(dialog)).toHaveTextContent('Try another card');
  });

  it('stays out of the accessibility tree while closed', () => {
    renderAlertDialog({ open: false });

    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
  });

  it('moves focus into the panel when opened', () => {
    renderAlertDialog();

    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Dismiss' }));
  });

  it('keeps Tab inside the panel', () => {
    renderAlertDialog();
    const dismiss = screen.getByRole('button', { name: 'Dismiss' });
    const retry = screen.getByRole('button', { name: 'Retry' });

    pressKeyOnFocused('Tab');
    expect(document.activeElement).toBe(retry);

    pressKeyOnFocused('Tab');
    expect(document.activeElement).toBe(dismiss);
  });

  it('walks backwards with Shift+Tab', () => {
    renderAlertDialog();
    const retry = screen.getByRole('button', { name: 'Retry' });

    pressKeyOnFocused('Tab', { shiftKey: true });

    expect(document.activeElement).toBe(retry);
  });

  it('closes on Escape', () => {
    const onClose = vi.fn<() => void>();
    renderAlertDialog({ onClose });

    pressKeyOnFocused('Escape');

    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closes when the overlay is clicked', () => {
    renderAlertDialog();

    fireEvent.click(screen.getByTestId('overlay'));

    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
  });

  it('stays open for a click inside the panel', () => {
    renderAlertDialog();

    fireEvent.click(screen.getByRole('button', { name: 'Retry' }));

    expect(screen.getByRole('alertdialog')).toBeInTheDocument();
  });

  it('keeps the panel mounted when `unmount` is false', () => {
    render(() => (
      <AlertDialog defaultOpen={false} unmount={false}>
        <AlertDialogPanel>
          <AlertDialogTitle>Payment failed</AlertDialogTitle>
          <Button>Dismiss</Button>
        </AlertDialogPanel>
      </AlertDialog>
    ));

    expect(screen.getByText('Payment failed')).toBeInTheDocument();
  });

  it('requires a surrounding AlertDialog', () => {
    expect(() => render(() => <AlertDialogPanel>Orphan</AlertDialogPanel>)).toThrow(
      /must be used inside an? <AlertDialog>/,
    );
  });
});
