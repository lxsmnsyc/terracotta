import { fireEvent, render, screen } from '@solidjs/testing-library';
import { flush } from 'solid-js';
import { describe, expect, it, vi } from 'vitest';
import { activeElement, describedBy, labelledBy, pressKeyOnFocused, settle } from './aria';
import { Button } from '../src/components/button';
import {
  CommandBar,
  CommandBarDescription,
  CommandBarOverlay,
  CommandBarPanel,
  CommandBarTitle,
} from '../src/components/command-bar';

function renderCommandBar(
  props: { open?: boolean; disabled?: boolean; onClose?: () => void } = {},
): ReturnType<typeof render> {
  return render(() => (
    <>
      <Button>Page content</Button>
      <CommandBar
        defaultOpen={props.open ?? false}
        disabled={props.disabled}
        onClose={props.onClose}
      >
        <CommandBarOverlay data-testid="overlay" />
        <CommandBarPanel data-testid="panel">
          <CommandBarTitle>Command palette</CommandBarTitle>
          <CommandBarDescription>Search for a command</CommandBarDescription>
          <Button>Open file</Button>
          <Button>Close file</Button>
        </CommandBarPanel>
      </CommandBar>
    </>
  ));
}

/** The shortcut listener sits on `window`, not on any rendered element. */
function pressShortcut(init: KeyboardEventInit): KeyboardEvent {
  const event = new KeyboardEvent('keydown', { bubbles: true, cancelable: true, ...init });
  window.dispatchEvent(event);
  flush();
  return event;
}

describe('CommandBar accessibility', () => {
  it('stays out of the accessibility tree while closed', async () => {
    renderCommandBar();
    await settle();

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('exposes a modal dialog once open', async () => {
    renderCommandBar({ open: true });
    await settle();

    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
  });

  it('names and describes the dialog', async () => {
    renderCommandBar({ open: true });
    await settle();
    const dialog = screen.getByRole('dialog');

    expect(labelledBy(dialog)).toHaveTextContent('Command palette');
    expect(describedBy(dialog)).toHaveTextContent('Search for a command');
  });

  it('opens on Ctrl+K', async () => {
    renderCommandBar();
    await settle();

    pressShortcut({ key: 'k', ctrlKey: true });

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('opens on Cmd+K', async () => {
    renderCommandBar();
    await settle();

    pressShortcut({ key: 'k', metaKey: true });

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('claims the shortcut so the browser does not act on it', async () => {
    renderCommandBar();
    await settle();

    expect(pressShortcut({ key: 'k', ctrlKey: true }).defaultPrevented).toBe(true);
  });

  it('ignores a bare k', async () => {
    renderCommandBar();
    await settle();

    pressShortcut({ key: 'k' });

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('ignores the shortcut once something else has handled it', async () => {
    renderCommandBar();
    await settle();
    const event = new KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true,
      key: 'k',
      ctrlKey: true,
    });
    event.preventDefault();

    window.dispatchEvent(event);
    flush();

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('does not open while disabled', async () => {
    renderCommandBar({ disabled: true });
    await settle();

    pressShortcut({ key: 'k', ctrlKey: true });

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('moves focus into the panel when opened', async () => {
    renderCommandBar({ open: true });
    await settle();

    expect(await activeElement()).toBe(screen.getByRole('button', { name: 'Open file' }));
  });

  it('closes on Escape', async () => {
    const onClose = vi.fn<() => void>();
    renderCommandBar({ open: true, onClose });
    await settle();

    pressKeyOnFocused('Escape');

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(onClose).toHaveBeenCalled();
  });

  it('keeps Tab inside the panel', async () => {
    renderCommandBar({ open: true });
    await settle();
    const open = screen.getByRole('button', { name: 'Open file' });
    const close = screen.getByRole('button', { name: 'Close file' });

    pressKeyOnFocused('Tab');
    expect(await activeElement()).toBe(close);

    pressKeyOnFocused('Tab');
    expect(await activeElement()).toBe(open);
  });

  it('closes when the overlay is clicked', async () => {
    renderCommandBar({ open: true });
    await settle();

    fireEvent.click(screen.getByTestId('overlay'));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('returns focus to where it was when it closes', async () => {
    renderCommandBar();
    await settle();
    const trigger = screen.getByRole('button', { name: 'Page content' });
    trigger.focus();

    pressShortcut({ key: 'k', ctrlKey: true });
    expect(await activeElement()).not.toBe(trigger);

    pressKeyOnFocused('Escape');

    expect(await activeElement()).toBe(trigger);
  });

  it('requires a surrounding CommandBar', () => {
    expect(() => render(() => <CommandBarPanel>Orphan</CommandBarPanel>)).toThrow(
      /must be used inside a <CommandBar>/,
    );
  });
});
