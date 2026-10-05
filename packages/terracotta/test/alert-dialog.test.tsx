import { fireEvent, render, screen } from '@solidjs/testing-library';
import { createSignal, flush } from 'solid-js';
import { describe, expect, it, vi } from 'vitest';
import { activeElement, describedBy, labelledBy, pressKeyOnFocused, settle } from './aria';
import {
  AlertDialog,
  AlertDialogDescription,
  AlertDialogOverlay,
  AlertDialogPanel,
  AlertDialogTitle,
} from '../src/components/alert-dialog';
import { Button } from '../src/components/button';

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
  it('uses the alertdialog role, so it is announced on open', async () => {
    renderAlertDialog();
    await settle();

    // The distinction from `dialog` is the whole point of the component: an
    // alertdialog interrupts, a dialog does not.
    expect(screen.getByRole('alertdialog')).toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('is modal', async () => {
    renderAlertDialog();
    await settle();

    expect(screen.getByRole('alertdialog')).toHaveAttribute('aria-modal', 'true');
  });

  it('names and describes itself', async () => {
    renderAlertDialog();
    await settle();
    const dialog = screen.getByRole('alertdialog');

    expect(labelledBy(dialog)).toHaveTextContent('Payment failed');
    expect(describedBy(dialog)).toHaveTextContent('Try another card');
  });

  it('stays out of the accessibility tree while closed', async () => {
    renderAlertDialog({ open: false });
    await settle();

    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
  });

  it('moves focus into the panel when opened', async () => {
    renderAlertDialog();
    await settle();

    expect(await activeElement()).toBe(screen.getByRole('button', { name: 'Dismiss' }));
  });

  it('keeps Tab inside the panel', async () => {
    renderAlertDialog();
    await settle();
    const dismiss = screen.getByRole('button', { name: 'Dismiss' });
    const retry = screen.getByRole('button', { name: 'Retry' });

    pressKeyOnFocused('Tab');
    expect(await activeElement()).toBe(retry);

    pressKeyOnFocused('Tab');
    expect(await activeElement()).toBe(dismiss);
  });

  it('walks backwards with Shift+Tab', async () => {
    renderAlertDialog();
    await settle();
    const retry = screen.getByRole('button', { name: 'Retry' });

    pressKeyOnFocused('Tab', { shiftKey: true });

    expect(await activeElement()).toBe(retry);
  });

  it('closes on Escape', async () => {
    const onClose = vi.fn<() => void>();
    renderAlertDialog({ onClose });
    await settle();

    pressKeyOnFocused('Escape');

    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closes when the overlay is clicked', async () => {
    renderAlertDialog();
    await settle();

    fireEvent.click(screen.getByTestId('overlay'));

    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
  });

  it('stays open for a click inside the panel', async () => {
    renderAlertDialog();
    await settle();

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

  it('returns focus to the trigger when it closes', async () => {
    const [open, setOpen] = createSignal(false);
    render(() => (
      <>
        <button
          type="button"
          onClick={() => {
            setOpen(true);
          }}
        >
          Pay
        </button>
        <AlertDialog
          isOpen={open()}
          onClose={() => {
            setOpen(false);
          }}
        >
          <AlertDialogPanel>
            <AlertDialogTitle>Payment failed</AlertDialogTitle>
            <Button>Dismiss</Button>
          </AlertDialogPanel>
        </AlertDialog>
      </>
    ));
    const trigger = screen.getByRole('button', { name: 'Pay' });
    trigger.focus();
    trigger.click();
    expect(await activeElement()).toBe(screen.getByRole('button', { name: 'Dismiss' }));

    pressKeyOnFocused('Escape');

    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
    expect(await activeElement()).toBe(trigger);
  });

  it('omits aria-labelledby and aria-describedby without a title or description', async () => {
    render(() => (
      <AlertDialog defaultOpen aria-label="Payment failed">
        <AlertDialogPanel>
          <Button>Dismiss</Button>
        </AlertDialogPanel>
      </AlertDialog>
    ));
    await settle();
    const dialog = screen.getByRole('alertdialog', { name: 'Payment failed' });

    expect(dialog).not.toHaveAttribute('aria-labelledby');
    expect(dialog).not.toHaveAttribute('aria-describedby');
  });

  it('lets the consumer override the attributes it sets', async () => {
    render(() => (
      <>
        <span id="external">External name</span>
        <AlertDialog defaultOpen aria-labelledby="external">
          <AlertDialogPanel>
            <AlertDialogTitle>Payment failed</AlertDialogTitle>
          </AlertDialogPanel>
        </AlertDialog>
      </>
    ));
    await settle();

    expect(screen.getByRole('alertdialog', { name: 'External name' })).toBeInTheDocument();
  });

  it('does not expose aria-disabled or disabled while disabled', async () => {
    render(() => (
      <AlertDialog defaultOpen disabled>
        <AlertDialogPanel>
          <AlertDialogTitle>Payment failed</AlertDialogTitle>
        </AlertDialogPanel>
      </AlertDialog>
    ));
    await settle();
    const dialog = screen.getByRole('alertdialog');

    expect(dialog).not.toHaveAttribute('aria-disabled');
    expect(dialog).not.toHaveAttribute('disabled');
    expect(dialog).toHaveAttribute('tc-disabled');
  });

  it('focuses the panel when nothing inside can take focus, so Escape works', async () => {
    const onClose = vi.fn<() => void>();
    render(() => (
      <AlertDialog defaultOpen onClose={onClose}>
        <AlertDialogPanel data-testid="panel">
          <AlertDialogTitle>Payment failed</AlertDialogTitle>
        </AlertDialogPanel>
      </AlertDialog>
    ));
    await settle();
    const panel = screen.getByTestId('panel');

    expect(await activeElement()).toBe(panel);
    expect(panel).toHaveAttribute('tabindex', '-1');

    pressKeyOnFocused('Escape');

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('hides a closed dialog kept mounted with `unmount={false}`', async () => {
    render(() => (
      <AlertDialog data-testid="dialog" defaultOpen={false} unmount={false}>
        <AlertDialogPanel>
          <AlertDialogTitle>Payment failed</AlertDialogTitle>
        </AlertDialogPanel>
      </AlertDialog>
    ));
    await settle();
    const dialog = screen.getByTestId('dialog');

    expect(dialog).not.toHaveAttribute('aria-modal');
    expect(dialog).toHaveAttribute('aria-hidden', 'true');
    expect(dialog).toHaveAttribute('inert');
  });

  it('makes the content outside inert while open, and restores it', async () => {
    const [open, setOpen] = createSignal(true);
    render(() => (
      <>
        <div data-testid="outside">Outside</div>
        <AlertDialog
          isOpen={open()}
          onClose={() => {
            setOpen(false);
          }}
        >
          <AlertDialogPanel>
            <AlertDialogTitle>Payment failed</AlertDialogTitle>
          </AlertDialogPanel>
        </AlertDialog>
      </>
    ));
    await settle();
    const outside = screen.getByTestId('outside');
    expect(outside).toHaveAttribute('inert');

    setOpen(false);
    flush();

    expect(outside).not.toHaveAttribute('inert');
  });

  it('requires a surrounding AlertDialog', () => {
    expect(() => render(() => <AlertDialogPanel>Orphan</AlertDialogPanel>)).toThrow(
      /must be used inside an? <AlertDialog>/,
    );
  });
});
