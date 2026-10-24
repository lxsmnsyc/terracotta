import type { JSX } from '@solidjs/web';
import { createSignal } from 'solid-js';
import {
  AlertDialog,
  AlertDialogDescription,
  AlertDialogOverlay,
  AlertDialogPanel,
  AlertDialogTitle,
} from 'terracotta/alert-dialog';

export default function DestructiveAlertDialog(): JSX.Element {
  const [open, setOpen] = createSignal(false);
  const [deleted, setDeleted] = createSignal(false);

  return (
    <div class="stack stage-tall">
      <button type="button" class="button button-danger" onClick={() => setOpen(true)}>
        Delete the project
      </button>
      <p class="hint">{deleted() ? 'Deleted.' : 'Nothing has been deleted.'}</p>

      <AlertDialog class="dialog" isOpen={open()} onChange={setOpen}>
        <AlertDialogOverlay class="dialog-overlay" />
        <AlertDialogPanel class="dialog-panel">
          <AlertDialogTitle class="dialog-title">Delete this project?</AlertDialogTitle>
          <AlertDialogDescription class="dialog-description">
            Every document in it goes too. This cannot be undone.
          </AlertDialogDescription>
          <div class="dialog-actions">
            <button type="button" class="button" onClick={() => setOpen(false)}>
              Keep it
            </button>
            <button
              type="button"
              class="button button-danger"
              onClick={() => {
                setDeleted(true);
                setOpen(false);
              }}
            >
              Delete
            </button>
          </div>
        </AlertDialogPanel>
      </AlertDialog>
    </div>
  );
}
