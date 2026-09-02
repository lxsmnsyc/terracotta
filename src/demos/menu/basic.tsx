import type { JSX } from '@solidjs/web';
import { createSignal } from 'solid-js';
import { Menu, MenuItem } from 'terracotta/menu';

export default function BasicMenu(): JSX.Element {
  const [chosen, setChosen] = createSignal<string>();

  return (
    <div class="stack">
      <Menu class="menu">
        <MenuItem class="menu-item" onClick={() => setChosen('Duplicate')}>
          Duplicate
        </MenuItem>
        <MenuItem class="menu-item" onClick={() => setChosen('Rename')}>
          Rename
        </MenuItem>
        <MenuItem class="menu-item" disabled>
          Move to…
        </MenuItem>
        <MenuItem class="menu-item menu-item-danger" onClick={() => setChosen('Delete')}>
          Delete
        </MenuItem>
      </Menu>
      <p class="hint">
        {chosen() ? `Chose: ${chosen()}` : 'Arrow keys move; typing jumps to a matching item.'}
      </p>
    </div>
  );
}
