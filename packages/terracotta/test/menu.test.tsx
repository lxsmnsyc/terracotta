import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library';
import { describe, expect, it, vi } from 'vitest';
import { activeElement, pressKeyOnFocused, settle } from './aria';
import { Menu, Menubar, MenuChild, MenuItem } from '../src/components/menu';
import { Popover, PopoverButton, PopoverPanel } from '../src/components/popover';

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

describe('Menu type-ahead', () => {
  function renderLetters(): void {
    render(() => (
      <Menu>
        <MenuItem>Cut</MenuItem>
        <MenuItem>Copy</MenuItem>
        <MenuItem>Paste</MenuItem>
        <MenuItem>Crop</MenuItem>
      </Menu>
    ));
  }

  it('starts the search after the focused item', async () => {
    renderLetters();
    getItem('Cut').focus();

    pressKeyOnFocused('c');

    await waitFor(async () => {
      expect(await activeElement()).toBe(getItem('Copy'));
    });
  });

  it('wraps around to the first item', async () => {
    renderLetters();
    getItem('Crop').focus();

    pressKeyOnFocused('c');

    await waitFor(async () => {
      expect(await activeElement()).toBe(getItem('Cut'));
    });
  });

  it('ignores keys pressed with Ctrl, Meta or Alt', async () => {
    renderLetters();
    getItem('Cut').focus();

    fireEvent.keyDown(getItem('Cut'), { key: 'p', ctrlKey: true });
    fireEvent.keyDown(getItem('Cut'), { key: 'p', metaKey: true });
    fireEvent.keyDown(getItem('Cut'), { key: 'p', altKey: true });

    await new Promise<void>((resolve) => {
      setTimeout(resolve, 400);
    });
    expect(await activeElement()).toBe(getItem('Cut'));
  });
});

describe('Disabled menu items', () => {
  it('cannot be activated with Enter, Space or a click', () => {
    const onClick = vi.fn();
    render(() => (
      <Menu>
        <MenuItem
          disabled
          onClick={() => {
            onClick();
          }}
        >
          Cut
        </MenuItem>
      </Menu>
    ));
    const item = getItem('Cut');

    fireEvent.keyDown(item, { key: 'Enter' });
    fireEvent.keyDown(item, { key: ' ' });
    fireEvent.keyUp(item, { key: ' ' });
    fireEvent.click(item);

    expect(onClick).not.toHaveBeenCalled();
  });
});

describe('Menubar', () => {
  function renderMenubar(props: { disabled?: string[]; horizontal?: boolean } = {}): void {
    render(() => (
      <Menubar aria-label="Main" horizontal={props.horizontal}>
        {ITEMS.map((item) => (
          <MenuItem disabled={props.disabled?.includes(item)}>{item}</MenuItem>
        ))}
      </Menubar>
    ));
  }

  it('uses the menubar role with an orientation', () => {
    renderMenubar();

    expect(screen.getByRole('menubar')).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('can be vertical', () => {
    renderMenubar({ horizontal: false });

    expect(screen.getByRole('menubar')).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('gives the first enabled item the only tab stop', async () => {
    renderMenubar({ disabled: ['Cut'] });
    await settle();

    expect(getItem('Cut')).toHaveAttribute('tabindex', '-1');
    expect(getItem('Copy')).toHaveAttribute('tabindex', '0');
    expect(getItem('Paste')).toHaveAttribute('tabindex', '-1');
  });

  it('moves the tab stop to the focused item', async () => {
    renderMenubar();
    await settle();
    getItem('Cut').focus();

    pressKeyOnFocused('ArrowRight');
    await settle();

    expect(await activeElement()).toBe(getItem('Copy'));
    expect(getItem('Copy')).toHaveAttribute('tabindex', '0');
    expect(getItem('Cut')).toHaveAttribute('tabindex', '-1');
  });

  it('only takes the arrow keys of its orientation', async () => {
    renderMenubar();
    await settle();
    getItem('Cut').focus();

    pressKeyOnFocused('ArrowDown');

    expect(await activeElement()).toBe(getItem('Cut'));
  });

  it('keeps the items of a nested menu out of the tab sequence', async () => {
    render(() => (
      <Menubar aria-label="Main">
        <MenuItem>File</MenuItem>
        <Menu>
          <MenuItem>New</MenuItem>
        </Menu>
      </Menubar>
    ));
    await settle();

    expect(getItem('File')).toHaveAttribute('tabindex', '0');
    expect(getItem('New')).toHaveAttribute('tabindex', '-1');
  });
});

describe('Menu in a Popover', () => {
  function renderMenuButton(onClick?: () => void): void {
    render(() => (
      <Popover defaultOpen={false}>
        <PopoverButton aria-haspopup="menu">Actions</PopoverButton>
        <PopoverPanel>
          <Menu>
            {ITEMS.map((item) => (
              <MenuItem onClick={onClick}>{item}</MenuItem>
            ))}
          </Menu>
        </PopoverPanel>
      </Popover>
    ));
  }

  it('focuses the first item when it opens', async () => {
    renderMenuButton();
    fireEvent.click(screen.getByRole('button', { name: 'Actions' }));
    await settle();

    await waitFor(async () => {
      expect(await activeElement()).toBe(getItem('Cut'));
    });
  });

  it('opens on the last item with Up', async () => {
    renderMenuButton();
    screen.getByRole('button', { name: 'Actions' }).focus();
    pressKeyOnFocused('ArrowUp');
    await settle();

    await waitFor(async () => {
      expect(await activeElement()).toBe(getItem('Paste'));
    });
  });

  it('closes on Tab', async () => {
    renderMenuButton();
    fireEvent.click(screen.getByRole('button', { name: 'Actions' }));
    await settle();
    await waitFor(async () => {
      expect(await activeElement()).toBe(getItem('Cut'));
    });

    pressKeyOnFocused('Tab');
    await settle();

    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('closes when an item is activated', async () => {
    const onClick = vi.fn();
    renderMenuButton(onClick);
    fireEvent.click(screen.getByRole('button', { name: 'Actions' }));
    await settle();

    fireEvent.click(getItem('Copy'));
    await settle();

    expect(onClick).toHaveBeenCalledOnce();
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
});
