import { fireEvent, render, screen } from '@solidjs/testing-library';
import { describe, expect, it, vi } from 'vitest';
import { describedBy, labelledBy, pressKeyOnFocused } from './aria';
import {
  Button,
  CommandBar,
  CommandBarDescription,
  CommandBarOverlay,
  CommandBarPanel,
  CommandBarTitle,
} from '../src';

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
  return event;
}

describe('CommandBar accessibility', () => {
  it('stays out of the accessibility tree while closed', () => {
    renderCommandBar();

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('exposes a modal dialog once open', () => {
    renderCommandBar({ open: true });

    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
  });

  it('names and describes the dialog', () => {
    renderCommandBar({ open: true });
    const dialog = screen.getByRole('dialog');

    expect(labelledBy(dialog)).toHaveTextContent('Command palette');
    expect(describedBy(dialog)).toHaveTextContent('Search for a command');
  });

  it('opens on Ctrl+K', () => {
    renderCommandBar();

    pressShortcut({ key: 'k', ctrlKey: true });

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('opens on Cmd+K', () => {
    renderCommandBar();

    pressShortcut({ key: 'k', metaKey: true });

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('claims the shortcut so the browser does not act on it', () => {
    renderCommandBar();

    expect(pressShortcut({ key: 'k', ctrlKey: true }).defaultPrevented).toBe(true);
  });

  it('ignores a bare k', () => {
    renderCommandBar();

    pressShortcut({ key: 'k' });

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('ignores the shortcut once something else has handled it', () => {
    renderCommandBar();
    const event = new KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true,
      key: 'k',
      ctrlKey: true,
    });
    event.preventDefault();

    window.dispatchEvent(event);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('does not open while disabled', () => {
    renderCommandBar({ disabled: true });

    pressShortcut({ key: 'k', ctrlKey: true });

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('moves focus into the panel when opened', () => {
    renderCommandBar({ open: true });

    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Open file' }));
  });

  it('closes on Escape', () => {
    const onClose = vi.fn<() => void>();
    renderCommandBar({ open: true, onClose });

    pressKeyOnFocused('Escape');

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(onClose).toHaveBeenCalled();
  });

  it('keeps Tab inside the panel', () => {
    renderCommandBar({ open: true });
    const open = screen.getByRole('button', { name: 'Open file' });
    const close = screen.getByRole('button', { name: 'Close file' });

    pressKeyOnFocused('Tab');
    expect(document.activeElement).toBe(close);

    pressKeyOnFocused('Tab');
    expect(document.activeElement).toBe(open);
  });

  it('closes when the overlay is clicked', () => {
    renderCommandBar({ open: true });

    fireEvent.click(screen.getByTestId('overlay'));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('returns focus to where it was when it closes', () => {
    renderCommandBar();
    const trigger = screen.getByRole('button', { name: 'Page content' });
    trigger.focus();

    pressShortcut({ key: 'k', ctrlKey: true });
    expect(document.activeElement).not.toBe(trigger);

    pressKeyOnFocused('Escape');

    expect(document.activeElement).toBe(trigger);
  });

  it('requires a surrounding CommandBar', () => {
    expect(() => render(() => <CommandBarPanel>Orphan</CommandBarPanel>)).toThrow(
      /must be used inside a <CommandBar>/,
    );
  });
});
