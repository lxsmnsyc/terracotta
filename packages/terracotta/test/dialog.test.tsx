import { fireEvent, render, screen } from '@solidjs/testing-library';
import { Portal } from '@solidjs/web';
import { createSignal, flush, Show } from 'solid-js';
import { describe, expect, it, vi } from 'vitest';
import { activeElement, describedBy, labelledBy, pressKeyOnFocused, settle } from './aria';
import { Button } from '../src/components/button';
import {
  Dialog,
  DialogDescription,
  DialogOverlay,
  DialogPanel,
  DialogTitle,
} from '../src/components/dialog';

/** Whether the element sits inside an `inert` subtree, itself included. */
function isInert(element: Element): boolean {
  return element.closest('[inert]') !== null;
}

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

  it('restores focus to the trigger when it closes', async () => {
    const [open, setOpen] = createSignal(false);
    render(() => (
      <>
        <button
          type="button"
          onClick={() => {
            setOpen(true);
          }}
        >
          Open
        </button>
        <Dialog
          isOpen={open()}
          onClose={() => {
            setOpen(false);
          }}
        >
          <DialogPanel>
            <DialogTitle>Delete file</DialogTitle>
            <Button>Cancel</Button>
          </DialogPanel>
        </Dialog>
      </>
    ));
    const trigger = screen.getByRole('button', { name: 'Open' });
    trigger.focus();
    trigger.click();

    expect(await activeElement()).toBe(screen.getByRole('button', { name: 'Cancel' }));

    pressKeyOnFocused('Escape');

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(await activeElement()).toBe(trigger);
  });

  it('does not expose aria-disabled or disabled while disabled', async () => {
    render(() => (
      <Dialog defaultOpen disabled>
        <DialogPanel>
          <DialogTitle>Delete file</DialogTitle>
        </DialogPanel>
      </Dialog>
    ));
    await settle();
    const dialog = screen.getByRole('dialog');

    expect(dialog).not.toHaveAttribute('aria-disabled');
    expect(dialog).not.toHaveAttribute('disabled');
    expect(dialog).toHaveAttribute('tc-disabled');
  });
});

describe('Dialog accessible name', () => {
  it('omits aria-labelledby and aria-describedby without a title or description', async () => {
    render(() => (
      <Dialog defaultOpen aria-label="Settings">
        <DialogPanel>
          <Button>Close</Button>
        </DialogPanel>
      </Dialog>
    ));
    await settle();
    const dialog = screen.getByRole('dialog', { name: 'Settings' });

    expect(dialog).not.toHaveAttribute('aria-labelledby');
    expect(dialog).not.toHaveAttribute('aria-describedby');
  });

  it('follows the title as it mounts and unmounts', async () => {
    const [shown, setShown] = createSignal(false);
    render(() => (
      <Dialog defaultOpen>
        <DialogPanel>
          <Show when={shown()}>
            <DialogTitle>Delete file</DialogTitle>
          </Show>
          <Button>Close</Button>
        </DialogPanel>
      </Dialog>
    ));
    await settle();
    const dialog = screen.getByRole('dialog');
    expect(dialog).not.toHaveAttribute('aria-labelledby');

    setShown(true);
    flush();
    expect(labelledBy(dialog)).toHaveTextContent('Delete file');

    setShown(false);
    flush();
    expect(dialog).not.toHaveAttribute('aria-labelledby');
  });

  it('points at a title that sets its own id', async () => {
    render(() => (
      <Dialog defaultOpen>
        <DialogPanel>
          <DialogTitle id="custom-title">Delete file</DialogTitle>
          <DialogDescription id="custom-description">Gone for good</DialogDescription>
        </DialogPanel>
      </Dialog>
    ));
    await settle();
    const dialog = screen.getByRole('dialog');

    expect(dialog).toHaveAttribute('aria-labelledby', 'custom-title');
    expect(dialog).toHaveAttribute('aria-describedby', 'custom-description');
  });

  it('lets the consumer override aria-labelledby', async () => {
    render(() => (
      <>
        <span id="external">External name</span>
        <Dialog defaultOpen aria-labelledby="external">
          <DialogPanel>
            <DialogTitle>Delete file</DialogTitle>
          </DialogPanel>
        </Dialog>
      </>
    ));
    await settle();

    expect(screen.getByRole('dialog', { name: 'External name' })).toBeInTheDocument();
  });
});

describe('DialogPanel without focusable content', () => {
  function renderStatic(): void {
    render(() => (
      <Dialog defaultOpen unmount={false}>
        <DialogPanel data-testid="panel">
          <DialogTitle>Saved</DialogTitle>
          <p>Your changes are saved.</p>
        </DialogPanel>
      </Dialog>
    ));
  }

  it('focuses the panel itself', async () => {
    renderStatic();
    await settle();
    const panel = screen.getByTestId('panel');

    expect(await activeElement()).toBe(panel);
    expect(panel).toHaveAttribute('tabindex', '-1');
  });

  it('still closes on Escape and drops the tabindex it added', async () => {
    renderStatic();
    await settle();
    const panel = screen.getByTestId('panel');

    pressKeyOnFocused('Escape');

    expect(panel).not.toHaveAttribute('tc-expanded');
    expect(panel).not.toHaveAttribute('tabindex');
  });

  it('keeps focus on the panel for Tab', async () => {
    renderStatic();
    await settle();
    const panel = screen.getByTestId('panel');

    pressKeyOnFocused('Tab');

    expect(await activeElement()).toBe(panel);
  });

  it('keeps a tabindex the consumer set', async () => {
    render(() => (
      <Dialog defaultOpen unmount={false}>
        <DialogPanel data-testid="panel" tabindex="0">
          <p>Nothing to press</p>
        </DialogPanel>
      </Dialog>
    ));
    await settle();
    const panel = screen.getByTestId('panel');
    expect(await activeElement()).toBe(panel);

    pressKeyOnFocused('Escape');

    expect(panel).toHaveAttribute('tabindex', '0');
  });
});

describe('Dialog kept mounted while closed', () => {
  function renderMounted(): ReturnType<typeof createSignal<boolean>> {
    const signal = createSignal(false);
    render(() => (
      <Dialog
        data-testid="dialog"
        isOpen={signal[0]()}
        onClose={() => {
          signal[1](false);
        }}
        unmount={false}
      >
        <DialogPanel>
          <DialogTitle>Delete file</DialogTitle>
          <Button>Cancel</Button>
        </DialogPanel>
      </Dialog>
    ));
    return signal;
  }

  it('hides a closed dialog from assistive technology', async () => {
    renderMounted();
    await settle();
    const dialog = screen.getByTestId('dialog');

    expect(dialog).not.toHaveAttribute('aria-modal');
    expect(dialog).toHaveAttribute('aria-hidden', 'true');
    expect(dialog).toHaveAttribute('inert');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('exposes it again once open', async () => {
    const [, setOpen] = renderMounted();
    await settle();

    setOpen(true);
    await settle();
    const dialog = screen.getByRole('dialog');

    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).not.toHaveAttribute('aria-hidden');
    expect(dialog).not.toHaveAttribute('inert');
  });
});

describe('Dialog background', () => {
  it('makes the content outside the dialog inert while open', async () => {
    const [open, setOpen] = createSignal(true);
    render(() => (
      <main data-testid="page">
        <div data-testid="before">Before</div>
        <section>
          <div data-testid="sibling">Sibling</div>
          <Dialog
            isOpen={open()}
            onClose={() => {
              setOpen(false);
            }}
          >
            <DialogPanel>
              <DialogTitle>Delete file</DialogTitle>
              <Button>Cancel</Button>
            </DialogPanel>
          </Dialog>
        </section>
        <div data-testid="after">After</div>
      </main>
    ));
    await settle();

    expect(isInert(screen.getByTestId('before'))).toBe(true);
    expect(isInert(screen.getByTestId('sibling'))).toBe(true);
    expect(isInert(screen.getByTestId('after'))).toBe(true);
    // Elements on the path to the dialog stay usable.
    expect(isInert(screen.getByTestId('page'))).toBe(false);
    expect(isInert(screen.getByRole('dialog'))).toBe(false);

    setOpen(false);
    flush();

    expect(isInert(screen.getByTestId('before'))).toBe(false);
    expect(isInert(screen.getByTestId('sibling'))).toBe(false);
    expect(isInert(screen.getByTestId('after'))).toBe(false);
  });

  it('leaves content that was already inert, and live regions, alone', async () => {
    const [open, setOpen] = createSignal(true);
    render(() => (
      <>
        <div data-testid="inert" inert>
          Inert
        </div>
        <div data-testid="live" role="status" />
        <Dialog
          isOpen={open()}
          onClose={() => {
            setOpen(false);
          }}
        >
          <DialogPanel>
            <DialogTitle>Delete file</DialogTitle>
          </DialogPanel>
        </Dialog>
      </>
    ));
    await settle();

    expect(isInert(screen.getByTestId('live'))).toBe(false);

    setOpen(false);
    flush();

    expect(screen.getByTestId('inert')).toHaveAttribute('inert');
  });

  it('keeps a live region inside a portaled-away app root usable', async () => {
    render(() => (
      <>
        <div data-testid="content">Content</div>
        <div data-testid="toaster" role="status" />
        <Portal>
          <Dialog defaultOpen>
            <DialogPanel>
              <DialogTitle>Delete file</DialogTitle>
            </DialogPanel>
          </Dialog>
        </Portal>
      </>
    ));
    await settle();

    expect(isInert(screen.getByTestId('content'))).toBe(true);
    expect(isInert(screen.getByTestId('toaster'))).toBe(false);
  });

  it('restores the page when the dialog unmounts while open', async () => {
    const [shown, setShown] = createSignal(true);
    render(() => (
      <>
        <div data-testid="outside">Outside</div>
        <Show when={shown()}>
          <Dialog defaultOpen>
            <DialogPanel>
              <DialogTitle>Delete file</DialogTitle>
            </DialogPanel>
          </Dialog>
        </Show>
      </>
    ));
    await settle();
    expect(isInert(screen.getByTestId('outside'))).toBe(true);

    setShown(false);
    flush();

    expect(isInert(screen.getByTestId('outside'))).toBe(false);
  });

  function renderStacked(): { setInner: (value: boolean) => void } {
    const [outer, setOuter] = createSignal(true);
    const [inner, setInner] = createSignal(false);
    render(() => (
      <>
        <div data-testid="page">Page</div>
        <Portal>
          <Dialog
            data-testid="outer"
            isOpen={outer()}
            onClose={() => {
              setOuter(false);
            }}
          >
            <DialogPanel>
              <DialogTitle>Outer</DialogTitle>
              <Button data-testid="outer-button">Outer button</Button>
              {/* Nested in the outer panel in the markup. */}
              <Dialog
                data-testid="nested"
                isOpen={inner()}
                onClose={() => {
                  setInner(false);
                }}
              >
                <DialogPanel>
                  <DialogTitle>Nested</DialogTitle>
                  <Button>Nested button</Button>
                </DialogPanel>
              </Dialog>
            </DialogPanel>
          </Dialog>
        </Portal>
      </>
    ));
    return {
      setInner(value) {
        setInner(value);
      },
    };
  }

  it('makes the outer dialog inert under a nested one, and restores it', async () => {
    const { setInner } = renderStacked();
    await settle();
    const page = screen.getByTestId('page');
    const outerButton = screen.getByTestId('outer-button');

    expect(isInert(page)).toBe(true);
    expect(isInert(outerButton)).toBe(false);

    setInner(true);
    await settle();

    expect(isInert(outerButton)).toBe(true);
    expect(isInert(page)).toBe(true);

    setInner(false);
    await settle();

    expect(isInert(outerButton)).toBe(false);
    // The outer dialog is still open, so the page stays inert.
    expect(isInert(page)).toBe(true);
  });

  it('keeps the page inert until the last stacked dialog closes', async () => {
    const [first, setFirst] = createSignal(true);
    const [second, setSecond] = createSignal(true);
    render(() => (
      <>
        <div data-testid="page">Page</div>
        <Portal>
          <Dialog
            data-testid="first"
            isOpen={first()}
            onClose={() => {
              setFirst(false);
            }}
          >
            <DialogPanel>
              <DialogTitle>First</DialogTitle>
            </DialogPanel>
          </Dialog>
        </Portal>
        <Portal>
          <Dialog
            data-testid="second"
            isOpen={second()}
            onClose={() => {
              setSecond(false);
            }}
          >
            <DialogPanel>
              <DialogTitle>Second</DialogTitle>
            </DialogPanel>
          </Dialog>
        </Portal>
      </>
    ));
    await settle();
    const page = screen.getByTestId('page');
    expect(isInert(page)).toBe(true);

    // The first one closes before the second, the reverse of opening order.
    setFirst(false);
    await settle();
    expect(isInert(page)).toBe(true);

    setSecond(false);
    await settle();
    expect(isInert(page)).toBe(false);
  });
});
