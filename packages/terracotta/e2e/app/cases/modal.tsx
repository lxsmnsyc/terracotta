import type { JSX } from '@solidjs/web';
import { Portal } from '@solidjs/web';
import { createSignal, Show } from 'solid-js';
import { AlertDialog, AlertDialogPanel, AlertDialogTitle } from 'terracotta/alert-dialog';
import { Button } from 'terracotta/button';
import { CommandBar, CommandBarPanel, CommandBarTitle } from 'terracotta/command-bar';
import { Dialog, DialogPanel, DialogTitle } from 'terracotta/dialog';

const PANEL = { position: 'relative', background: '#ffffff', padding: '1rem' } as const;

// The modals on one page: each opens from its own button and portals out of
// the page, so the page around it turns inert while it is open.
export default function ModalCase(): JSX.Element {
  const [plain, setPlain] = createSignal(false);
  const [alert, setAlert] = createSignal(false);
  const [command, setCommand] = createSignal(false);
  const [outer, setOuter] = createSignal(false);
  const [inner, setInner] = createSignal(false);
  const [mounted, setMounted] = createSignal(false);

  return (
    <div>
      <button
        type="button"
        data-testid="open-plain"
        onClick={() => {
          setPlain(true);
        }}
      >
        Open notice
      </button>
      <button
        type="button"
        data-testid="open-alert"
        onClick={() => {
          setAlert(true);
        }}
      >
        Open alert
      </button>
      <button
        type="button"
        data-testid="open-command"
        onClick={() => {
          setCommand(true);
        }}
      >
        Open command bar
      </button>
      <button
        type="button"
        data-testid="open-outer"
        onClick={() => {
          setOuter(true);
        }}
      >
        Open stacked
      </button>

      <button
        type="button"
        data-testid="open-mounted"
        onClick={() => {
          setMounted(true);
        }}
      >
        Mount dialog
      </button>

      {/* Removed from the page while open, instead of being closed. */}
      <Show when={mounted()}>
        <Portal>
          <Dialog defaultOpen>
            <DialogPanel style={PANEL}>
              <DialogTitle>Mounted</DialogTitle>
              <Button
                data-testid="unmount"
                onClick={() => {
                  setMounted(false);
                }}
              >
                Remove
              </Button>
            </DialogPanel>
          </Dialog>
        </Portal>
      </Show>

      <Portal>
        {/* Nothing inside this panel can take focus. */}
        <Dialog
          isOpen={plain()}
          onClose={() => {
            setPlain(false);
          }}
        >
          <DialogPanel data-testid="plain-panel" style={PANEL}>
            <DialogTitle>Saved</DialogTitle>
            <p>Your changes are saved.</p>
          </DialogPanel>
        </Dialog>
      </Portal>

      <Portal>
        <AlertDialog
          isOpen={alert()}
          onClose={() => {
            setAlert(false);
          }}
        >
          <AlertDialogPanel style={PANEL}>
            <AlertDialogTitle>Payment failed</AlertDialogTitle>
            <Button
              data-testid="alert-dismiss"
              onClick={() => {
                setAlert(false);
              }}
            >
              Dismiss
            </Button>
          </AlertDialogPanel>
        </AlertDialog>
      </Portal>

      <Portal>
        <CommandBar
          isOpen={command()}
          onClose={() => {
            setCommand(false);
          }}
        >
          <CommandBarPanel style={PANEL}>
            <CommandBarTitle>Commands</CommandBarTitle>
            <Button data-testid="command-first">Open file</Button>
          </CommandBarPanel>
        </CommandBar>
      </Portal>

      <Portal>
        <Dialog
          isOpen={outer()}
          onClose={() => {
            setOuter(false);
          }}
        >
          <DialogPanel style={PANEL}>
            <DialogTitle>Outer</DialogTitle>
            <Button
              data-testid="open-inner"
              onClick={() => {
                setInner(true);
              }}
            >
              Open inner
            </Button>
          </DialogPanel>
        </Dialog>
      </Portal>

      <Portal>
        <Dialog
          isOpen={inner()}
          onClose={() => {
            setInner(false);
          }}
        >
          <DialogPanel style={PANEL}>
            <DialogTitle>Inner</DialogTitle>
            <Button data-testid="inner-button">Inner button</Button>
          </DialogPanel>
        </Dialog>
      </Portal>
    </div>
  );
}
