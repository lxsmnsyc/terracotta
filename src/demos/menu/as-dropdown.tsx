import type { JSX } from '@solidjs/web';
import { Popover, PopoverButton, PopoverPanel } from 'terracotta/popover';
import { Menu, MenuItem } from 'terracotta/menu';

/**
 * `Menu` is only the list. Pair it with a `Popover` when it needs a trigger:
 * the popover owns opening and focus return, the menu owns navigation.
 */
export default function MenuAsDropdown(): JSX.Element {
  return (
    <div class="stack stage-tall">
      <Popover class="popover" defaultOpen={false}>
        <PopoverButton class="button">
          Actions
          <span class="popover-caret" aria-hidden="true">
            ▾
          </span>
        </PopoverButton>
        <PopoverPanel class="popover-panel popover-panel-flush">
          {({ close }) => (
            <Menu class="menu">
              <MenuItem class="menu-item" onClick={close}>
                Duplicate
              </MenuItem>
              <MenuItem class="menu-item" onClick={close}>
                Rename
              </MenuItem>
              <MenuItem class="menu-item menu-item-danger" onClick={close}>
                Delete
              </MenuItem>
            </Menu>
          )}
        </PopoverPanel>
      </Popover>
    </div>
  );
}
