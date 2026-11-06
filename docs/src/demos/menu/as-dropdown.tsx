import type { JSX } from '@solidjs/web';
import { Popover, PopoverButton, PopoverPanel } from 'terracotta/popover';
import { Menu, MenuItem } from 'terracotta/menu';

/**
 * `Menu` is only the list. Pair it with a `Popover` when it needs a trigger.
 * The popover owns opening, focus and closing. The menu owns navigation.
 */
export default function MenuAsDropdown(): JSX.Element {
  return (
    <div class="stack stage-tall">
      <Popover class="popover" defaultOpen={false}>
        <PopoverButton class="button" aria-haspopup="menu">
          Actions
          <span class="popover-caret" aria-hidden="true">
            ▾
          </span>
        </PopoverButton>
        <PopoverPanel class="popover-panel popover-panel-flush">
          <Menu class="menu">
            <MenuItem class="menu-item">Duplicate</MenuItem>
            <MenuItem class="menu-item">Rename</MenuItem>
            <MenuItem class="menu-item menu-item-danger">Delete</MenuItem>
          </Menu>
        </PopoverPanel>
      </Popover>
    </div>
  );
}
