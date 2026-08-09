import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library';
import { describe, expect, it, vi } from 'vitest';
import { Menu, MenuItem } from '../src';

const ITEMS = ['Cut', 'Copy', 'Paste'];

function renderMenu(props: { disabled?: string[] } = {}) {
  return render(() => (
    <Menu>
      {ITEMS.map(item => (
        <MenuItem disabled={props.disabled?.includes(item)}>{item}</MenuItem>
      ))}
    </Menu>
  ));
}

function getItem(name: string): HTMLElement {
  return screen.getByRole('menuitem', { name });
}

describe('Menu accessibility', () => {
  it('uses the menu / menuitem role pair', () => {
    renderMenu();

    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getAllByRole('menuitem')).toHaveLength(ITEMS.length);
  });

  it('keeps menu items out of the tab order', () => {
    renderMenu();

    for (const item of ITEMS) {
      expect(getItem(item)).toHaveAttribute('tabindex', '-1');
    }
  });

  it('moves focus with the arrow keys', () => {
    renderMenu();
    getItem('Cut').focus();

    fireEvent.keyDown(document.activeElement as HTMLElement, {
      key: 'ArrowDown',
    });
    expect(document.activeElement).toBe(getItem('Copy'));

    fireEvent.keyDown(document.activeElement as HTMLElement, {
      key: 'ArrowUp',
    });
    expect(document.activeElement).toBe(getItem('Cut'));
  });

  it('jumps to the first and last item with Home and End', () => {
    renderMenu();
    getItem('Copy').focus();

    fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'End' });
    expect(document.activeElement).toBe(getItem('Paste'));

    fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'Home' });
    expect(document.activeElement).toBe(getItem('Cut'));
  });

  it('supports type-ahead by first character', async () => {
    renderMenu();
    getItem('Cut').focus();

    fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'p' });

    // Type-ahead is debounced so that multi-character searches work.
    await waitFor(() => {
      expect(document.activeElement).toBe(getItem('Paste'));
    });
  });

  it('marks disabled items and skips them while navigating', () => {
    renderMenu({ disabled: ['Copy'] });
    const disabled = getItem('Copy');

    expect(disabled).toHaveAttribute('aria-disabled', 'true');

    getItem('Cut').focus();
    fireEvent.keyDown(document.activeElement as HTMLElement, {
      key: 'ArrowDown',
    });

    expect(document.activeElement).toBe(getItem('Paste'));
  });

  it('activates an item with Enter through the button behaviour', () => {
    const onClick = vi.fn();
    render(() => (
      <Menu>
        <MenuItem onClick={onClick}>Cut</MenuItem>
      </Menu>
    ));

    fireEvent.keyDown(getItem('Cut'), { key: 'Enter' });

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
