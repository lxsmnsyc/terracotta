import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library';
import { describe, expect, it, vi } from 'vitest';
import { activeElement, pressKeyOnFocused } from './aria';
import { Menu, MenuChild, MenuItem } from '../src/components/menu';

const ITEMS = ['Cut', 'Copy', 'Paste'];

function renderMenu(props: { disabled?: string[] } = {}): ReturnType<typeof render> {
  return render(() => (
    <Menu>
      {ITEMS.map((item) => (
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

  it('moves focus with the arrow keys', async () => {
    renderMenu();
    getItem('Cut').focus();

    pressKeyOnFocused('ArrowDown');
    expect(await activeElement()).toBe(getItem('Copy'));

    pressKeyOnFocused('ArrowUp');
    expect(await activeElement()).toBe(getItem('Cut'));
  });

  it('jumps to the first and last item with Home and End', async () => {
    renderMenu();
    getItem('Copy').focus();

    pressKeyOnFocused('End');
    expect(await activeElement()).toBe(getItem('Paste'));

    pressKeyOnFocused('Home');
    expect(await activeElement()).toBe(getItem('Cut'));
  });

  it('supports type-ahead by first character', async () => {
    renderMenu();
    getItem('Cut').focus();

    pressKeyOnFocused('p');

    // Type-ahead is debounced so that multi-character searches work.
    await waitFor(async () => {
      expect(await activeElement()).toBe(getItem('Paste'));
    });
  });

  it('marks disabled items and skips them while navigating', async () => {
    renderMenu({ disabled: ['Copy'] });
    const disabled = getItem('Copy');

    expect(disabled).toHaveAttribute('aria-disabled', 'true');

    getItem('Cut').focus();
    pressKeyOnFocused('ArrowDown');

    expect(await activeElement()).toBe(getItem('Paste'));
  });

  it('activates an item with Enter through the button behaviour', () => {
    const onClick = vi.fn();
    render(() => (
      <Menu>
        <MenuItem
          onClick={() => {
            onClick();
          }}
        >
          Cut
        </MenuItem>
      </Menu>
    ));

    fireEvent.keyDown(getItem('Cut'), { key: 'Enter' });

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('MenuChild', () => {
  it('passes a disabled accessor to its render prop', () => {
    render(() => (
      <Menu>
        <MenuItem>
          <MenuChild disabled>
            {(state) => <span>{state.disabled() ? 'off' : 'on'}</span>}
          </MenuChild>
        </MenuItem>
      </Menu>
    ));

    expect(screen.getByText('off')).toBeInTheDocument();
  });

  it('reports its own disabled prop, not the surrounding item one', () => {
    render(() => (
      <Menu>
        <MenuItem disabled>
          <MenuChild>{(state) => <span>{state.disabled() ? 'off' : 'on'}</span>}</MenuChild>
        </MenuItem>
      </Menu>
    ));

    // The item is disabled, the child is not, and MenuChild answers for itself.
    expect(screen.getByText('on')).toBeInTheDocument();
  });

  it('renders plain children unchanged and adds no element of its own', () => {
    render(() => (
      <Menu>
        <MenuItem>
          <MenuChild>Cut</MenuChild>
        </MenuItem>
      </Menu>
    ));
    const item = screen.getByRole('menuitem', { name: 'Cut' });

    expect(item.children).toHaveLength(0);
    expect(item).toHaveTextContent('Cut');
  });
});
