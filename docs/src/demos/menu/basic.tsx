import type { JSX } from '@solidjs/web';
import { createSignal } from 'solid-js';
import { Menubar, MenuItem } from 'terracotta/menu';

/**
 * A list of actions that stays on screen is a `Menubar`: one tab stop, with
 * the arrow keys moving between items.
 */
export default function BasicMenu(): JSX.Element {
  const [chosen, setChosen] = createSignal<string>();

  return (
    <div class="stack">
      <Menubar class="menu" horizontal={false} aria-label="File actions">
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
      </Menubar>
      <p class="hint">
        {chosen() ? `Chose: ${chosen()}` : 'Tab in, then arrow keys move; typing jumps to a matching item.'}
      </p>
    </div>
  );
}
