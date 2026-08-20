import { fireEvent, render, screen } from '@solidjs/testing-library';
import { describe, expect, it, vi } from 'vitest';
import { pressKeyOnFocused } from './aria';
import {
  Button,
  ContextMenu,
  ContextMenuBoundary,
  ContextMenuOverlay,
  ContextMenuPanel,
} from '../src';

function renderContextMenu(
  props: { open?: boolean; disabled?: boolean; onClose?: () => void } = {},
): ReturnType<typeof render> {
  return render(() => (
    <ContextMenu
      defaultOpen={props.open ?? false}
      disabled={props.disabled}
      onClose={props.onClose}
    >
      <ContextMenuBoundary>Right-click here</ContextMenuBoundary>
      <ContextMenuOverlay data-testid="overlay" />
      <ContextMenuPanel data-testid="panel">
        <Button>Cut</Button>
        <Button>Copy</Button>
      </ContextMenuPanel>
    </ContextMenu>
  ));
}

function getBoundary(): HTMLElement {
  return screen.getByText('Right-click here');
}

describe('ContextMenu accessibility', () => {
  it('marks the boundary as collapsed while closed', () => {
    renderContextMenu();

    expect(getBoundary()).toHaveAttribute('aria-expanded', 'false');
  });

  it('keeps the panel out of the accessibility tree while closed', () => {
    renderContextMenu();

    expect(screen.queryByTestId('panel')).not.toBeInTheDocument();
  });

  it('omits `aria-controls` while closed instead of pointing at a missing id', () => {
    renderContextMenu();

    expect(getBoundary()).not.toHaveAttribute('aria-controls');
  });

  it('links the boundary to the panel once open', () => {
    renderContextMenu({ open: true });

    expect(getBoundary()).toHaveAttribute('aria-controls', screen.getByTestId('panel').id);
    expect(getBoundary()).toHaveAttribute('aria-expanded', 'true');
  });

  it('opens on right-click', () => {
    renderContextMenu();

    fireEvent.contextMenu(getBoundary());

    expect(screen.getByTestId('panel')).toBeInTheDocument();
    expect(getBoundary()).toHaveAttribute('aria-expanded', 'true');
  });

  it('suppresses the browser menu when it opens its own', () => {
    renderContextMenu();
    const event = new MouseEvent('contextmenu', { bubbles: true, cancelable: true });

    getBoundary().dispatchEvent(event);

    expect(event.defaultPrevented).toBe(true);
  });

  it('leaves the browser menu alone while disabled', () => {
    renderContextMenu({ disabled: true });
    const event = new MouseEvent('contextmenu', { bubbles: true, cancelable: true });

    getBoundary().dispatchEvent(event);

    expect(event.defaultPrevented).toBe(false);
    expect(screen.queryByTestId('panel')).not.toBeInTheDocument();
  });

  it('marks the boundary as disabled for assistive technology', () => {
    renderContextMenu({ disabled: true });

    expect(getBoundary()).toHaveAttribute('aria-disabled', 'true');
  });

  it('moves focus into the panel when opened', () => {
    renderContextMenu({ open: true });

    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Cut' }));
  });

  it('closes on Escape', () => {
    const onClose = vi.fn<() => void>();
    renderContextMenu({ open: true, onClose });

    pressKeyOnFocused('Escape');

    expect(screen.queryByTestId('panel')).not.toBeInTheDocument();
    expect(onClose).toHaveBeenCalled();
  });

  it('keeps Tab inside the panel', () => {
    renderContextMenu({ open: true });
    const cut = screen.getByRole('button', { name: 'Cut' });
    const copy = screen.getByRole('button', { name: 'Copy' });

    // The panel handles Tab itself, so focus wraps rather than leaving.
    fireEvent.keyDown(screen.getByTestId('panel'), { key: 'Tab' });
    expect(document.activeElement).toBe(copy);

    fireEvent.keyDown(screen.getByTestId('panel'), { key: 'Tab' });
    expect(document.activeElement).toBe(cut);
  });

  it('walks backwards on Shift+Tab', () => {
    renderContextMenu({ open: true });
    const copy = screen.getByRole('button', { name: 'Copy' });

    fireEvent.keyDown(screen.getByTestId('panel'), { key: 'Tab', shiftKey: true });

    expect(document.activeElement).toBe(copy);
  });

  it('closes when the overlay is clicked', () => {
    renderContextMenu({ open: true });

    fireEvent.click(screen.getByTestId('overlay'));

    expect(screen.queryByTestId('panel')).not.toBeInTheDocument();
  });

  it('keeps the overlay mounted while closed, and reports the state', () => {
    renderContextMenu();

    // Only the panel unmounts. `tc-expanded` is present on the overlay only
    // while open, so `[tc-expanded]` is the hook for showing it.
    expect(screen.getByTestId('overlay')).not.toHaveAttribute('tc-expanded');
  });

  it('closes on a click outside the panel', () => {
    render(() => (
      <>
        <Button>Outside</Button>
        <ContextMenu defaultOpen>
          <ContextMenuBoundary>Right-click here</ContextMenuBoundary>
          <ContextMenuPanel data-testid="panel">
            <Button>Cut</Button>
          </ContextMenuPanel>
        </ContextMenu>
      </>
    ));

    fireEvent.click(screen.getByRole('button', { name: 'Outside' }));

    expect(screen.queryByTestId('panel')).not.toBeInTheDocument();
  });

  it('stays open for a click inside the panel', () => {
    renderContextMenu({ open: true });

    fireEvent.click(screen.getByRole('button', { name: 'Cut' }));

    expect(screen.getByTestId('panel')).toBeInTheDocument();
  });

  it('requires a surrounding ContextMenu', () => {
    expect(() => render(() => <ContextMenuPanel>Orphan</ContextMenuPanel>)).toThrow(
      /must be used inside a <ContextMenu>/,
    );
  });
});
