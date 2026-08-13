import type { JSX } from 'solid-js';
import { createSignal } from 'solid-js';
import {
  Button,
  Dialog,
  DialogDescription,
  DialogOverlay,
  DialogPanel,
  DialogTitle,
} from 'terracotta';

export default function DialogCase(): JSX.Element {
  const [open, setOpen] = createSignal(false);

  return (
    <div>
      <button
        type="button"
        data-testid="before"
        onClick={() => {
          setOpen(true);
        }}
      >
        Open dialog
      </button>
      <button type="button" data-testid="after">
        Outside button
      </button>
      <Dialog
        isOpen={open()}
        onClose={() => {
          setOpen(false);
        }}
      >
        {/* The library ships no styles, so the overlay needs a box of its own
            before a click can land on it. */}
        <DialogOverlay
          data-testid="overlay"
          style={{
            position: 'fixed',
            inset: '0',
            background: 'rgba(0, 0, 0, 0.4)',
          }}
        />
        <DialogPanel data-testid="panel">
          <DialogTitle>Delete file</DialogTitle>
          <DialogDescription>This action cannot be undone</DialogDescription>
          <Button data-testid="cancel">Cancel</Button>
          <input data-testid="reason" type="text" placeholder="Reason" />
          <Button
            data-testid="confirm"
            onClick={() => {
              setOpen(false);
            }}
          >
            Confirm
          </Button>
        </DialogPanel>
      </Dialog>
    </div>
  );
}
