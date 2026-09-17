import { fireEvent, render, screen } from '@solidjs/testing-library';
import { flush } from 'solid-js';
import { describe, expect, it, vi } from 'vitest';
import { activeElement, pressKeyOnFocused, settle } from './aria';
import { Button } from '../src/components/button';
import {
  ContextMenu,
  ContextMenuBoundary,
  ContextMenuOverlay,
  ContextMenuPanel,
} from '../src/components/context-menu';

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
  it('marks the boundary as collapsed while closed', async () => {
    renderContextMenu();
    await settle();

    expect(getBoundary()).toHaveAttribute('aria-expanded', 'false');
  });

  it('keeps the panel out of the accessibility tree while closed', async () => {
    renderContextMenu();
    await settle();

    expect(screen.queryByTestId('panel')).not.toBeInTheDocument();
  });

  it('omits `aria-controls` while closed instead of pointing at a missing id', async () => {
    renderContextMenu();
    await settle();

    expect(getBoundary()).not.toHaveAttribute('aria-controls');
  });

  it('links the boundary to the panel once open', async () => {
    renderContextMenu({ open: true });
    await settle();

    expect(getBoundary()).toHaveAttribute('aria-controls', screen.getByTestId('panel').id);
    expect(getBoundary()).toHaveAttribute('aria-expanded', 'true');
  });

  it('opens on right-click', async () => {
    renderContextMenu();
    await settle();

    fireEvent.contextMenu(getBoundary());

    expect(screen.getByTestId('panel')).toBeInTheDocument();
    expect(getBoundary()).toHaveAttribute('aria-expanded', 'true');
  });

  it('suppresses the browser menu when it opens its own', async () => {
    renderContextMenu();
    await settle();
    const event = new MouseEvent('contextmenu', { bubbles: true, cancelable: true });

    getBoundary().dispatchEvent(event);
    flush();

    expect(event.defaultPrevented).toBe(true);
  });

  it('leaves the browser menu alone while disabled', async () => {
    renderContextMenu({ disabled: true });
    await settle();
    const event = new MouseEvent('contextmenu', { bubbles: true, cancelable: true });

    getBoundary().dispatchEvent(event);
    flush();

    expect(event.defaultPrevented).toBe(false);
    expect(screen.queryByTestId('panel')).not.toBeInTheDocument();
  });

  it('marks the boundary as disabled for assistive technology', async () => {
    renderContextMenu({ disabled: true });
    await settle();

    expect(getBoundary()).toHaveAttribute('aria-disabled', 'true');
  });

  it('moves focus into the panel when opened', async () => {
    renderContextMenu({ open: true });
    await settle();

    expect(await activeElement()).toBe(screen.getByRole('button', { name: 'Cut' }));
  });

  it('closes on Escape', async () => {
    const onClose = vi.fn<() => void>();
    renderContextMenu({ open: true, onClose });
    await settle();

    pressKeyOnFocused('Escape');

    expect(screen.queryByTestId('panel')).not.toBeInTheDocument();
    expect(onClose).toHaveBeenCalled();
  });

  it('keeps Tab inside the panel', async () => {
    renderContextMenu({ open: true });
    await settle();
    const cut = screen.getByRole('button', { name: 'Cut' });
    const copy = screen.getByRole('button', { name: 'Copy' });

    // The panel handles Tab itself, so focus wraps rather than leaving.
    fireEvent.keyDown(screen.getByTestId('panel'), { key: 'Tab' });
    expect(await activeElement()).toBe(copy);

    fireEvent.keyDown(screen.getByTestId('panel'), { key: 'Tab' });
    expect(await activeElement()).toBe(cut);
  });

  it('walks backwards on Shift+Tab', async () => {
    renderContextMenu({ open: true });
    await settle();
    const copy = screen.getByRole('button', { name: 'Copy' });

    fireEvent.keyDown(screen.getByTestId('panel'), { key: 'Tab', shiftKey: true });

    expect(await activeElement()).toBe(copy);
  });

  it('closes when the overlay is clicked', async () => {
    renderContextMenu({ open: true });
    await settle();

    fireEvent.click(screen.getByTestId('overlay'));

    expect(screen.queryByTestId('panel')).not.toBeInTheDocument();
  });

  it('keeps the overlay mounted while closed, and reports the state', async () => {
    renderContextMenu();
    await settle();

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

  it('stays open for a click inside the panel', async () => {
    renderContextMenu({ open: true });
    await settle();

    fireEvent.click(screen.getByRole('button', { name: 'Cut' }));

    expect(screen.getByTestId('panel')).toBeInTheDocument();
  });

  it('requires a surrounding ContextMenu', () => {
    expect(() => render(() => <ContextMenuPanel>Orphan</ContextMenuPanel>)).toThrow(
      /must be used inside a <ContextMenu>/,
    );
  });
});
