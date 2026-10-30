import type { JSX } from '@solidjs/web';
import {
  ContextMenu,
  ContextMenuBoundary,
  ContextMenuOverlay,
  ContextMenuPanel,
} from 'terracotta/context-menu';
import { Menu, MenuItem } from 'terracotta/menu';

export default function BasicContextMenu(): JSX.Element {
  return (
    <div class="stack stage-tall">
      <ContextMenu class="contextmenu" defaultOpen={false}>
        <ContextMenuBoundary class="contextmenu-boundary">
          Right-click anywhere in this box
        </ContextMenuBoundary>
        <ContextMenuOverlay class="contextmenu-overlay" />
        <ContextMenuPanel class="contextmenu-panel">
          {({ close }) => (
            <Menu class="menu">
              <MenuItem class="menu-item" onClick={close}>
                Cut
              </MenuItem>
              <MenuItem class="menu-item" onClick={close}>
                Copy
              </MenuItem>
              <MenuItem class="menu-item" onClick={close}>
                Paste
              </MenuItem>
            </Menu>
          )}
        </ContextMenuPanel>
      </ContextMenu>
    </div>
  );
}
