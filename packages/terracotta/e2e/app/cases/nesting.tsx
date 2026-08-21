import type { JSX } from 'solid-js';
import { createSignal } from 'solid-js';
import {
  Button,
  Dialog,
  DialogOverlay,
  DialogPanel,
  DialogTitle,
  Popover,
  PopoverButton,
  PopoverPanel,
} from 'terracotta';

// A popup inside a dialog: both trap `Tab` and both close on `Escape`, so this
// case exists to drive the two of them with a real keyboard.
export default function NestingCase(): JSX.Element {
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
      <Dialog
        isOpen={open()}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogOverlay
          data-testid="overlay"
          style={{ position: 'fixed', inset: '0', background: 'rgba(0, 0, 0, 0.4)' }}
        />
        <DialogPanel
          data-testid="panel"
          style={{ position: 'relative', background: '#ffffff', padding: '1rem' }}
        >
          <DialogTitle>Share file</DialogTitle>
          <Popover defaultOpen={false}>
            <PopoverButton data-testid="popover-button">Permissions</PopoverButton>
            <PopoverPanel data-testid="popover-panel">
              <Button data-testid="viewer">Viewer</Button>
              <Button data-testid="editor">Editor</Button>
            </PopoverPanel>
          </Popover>
          <Button data-testid="done">Done</Button>
        </DialogPanel>
      </Dialog>
    </div>
  );
}
