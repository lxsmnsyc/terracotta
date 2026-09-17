import type { JSX } from '@solidjs/web';
import { createSignal } from 'solid-js';
import {
  Dialog,
  DialogDescription,
  DialogOverlay,
  DialogPanel,
  DialogTitle,
} from 'terracotta/dialog';

export default function BasicDialog(): JSX.Element {
  const [open, setOpen] = createSignal(false);

  return (
    <div class="stack stage-tall">
      <button type="button" class="button" onClick={() => setOpen(true)}>
        Open the dialog
      </button>
      <p class="hint">
        Focus moves into the panel and is trapped there. <kbd>Escape</kbd> and a click on the
        backdrop both close it, and focus returns to the button.
      </p>

      <Dialog class="dialog" isOpen={open()} onChange={setOpen}>
        <DialogOverlay class="dialog-overlay" />
        <DialogPanel class="dialog-panel">
          <DialogTitle class="dialog-title">Rename project</DialogTitle>
          <DialogDescription class="dialog-description">
            This changes the name everywhere it appears.
          </DialogDescription>
          <input class="field" type="text" value="Terracotta docs" />
          <div class="dialog-actions">
            <button type="button" class="button" onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button type="button" class="button button-primary" onClick={() => setOpen(false)}>
              Rename
            </button>
          </div>
        </DialogPanel>
      </Dialog>
    </div>
  );
}
