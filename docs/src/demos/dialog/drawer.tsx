import type { JSX } from '@solidjs/web';
import { createSignal } from 'solid-js';
import { Dialog, DialogOverlay, DialogPanel, DialogTitle } from 'terracotta/dialog';

/**
 * Nothing about the component changes for a drawer. The panel is the same
 * focus-trapped element; only its CSS puts it against the edge.
 */
export default function DrawerDialog(): JSX.Element {
  const [open, setOpen] = createSignal(false);

  return (
    <div class="stack stage-tall">
      <button type="button" class="button" onClick={() => setOpen(true)}>
        Open the drawer
      </button>

      <Dialog class="dialog" isOpen={open()} onChange={setOpen}>
        <DialogOverlay class="dialog-overlay" />
        <DialogPanel class="drawer-panel">
          <DialogTitle class="dialog-title">Filters</DialogTitle>
          <p class="hint">Anything can live in here; it is an ordinary element.</p>
          <button type="button" class="button" onClick={() => setOpen(false)}>
            Done
          </button>
        </DialogPanel>
      </Dialog>
    </div>
  );
}
