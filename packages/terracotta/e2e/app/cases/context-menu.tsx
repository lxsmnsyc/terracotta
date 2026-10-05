import type { JSX } from '@solidjs/web';
import { createSignal } from 'solid-js';
import { ContextMenu, ContextMenuBoundary, ContextMenuPanel } from 'terracotta/context-menu';
import { Menu, MenuItem } from 'terracotta/menu';

const ITEMS = ['Cut', 'Copy', 'Paste'];

export default function ContextMenuCase(): JSX.Element {
  const [activated, setActivated] = createSignal('');

  return (
    <div>
      <button type="button" data-testid="before">
        Before
      </button>
      <ContextMenu defaultOpen={false}>
        <ContextMenuBoundary
          tabindex={0}
          data-testid="boundary"
          style={{ width: '200px', height: '100px', border: '1px solid' }}
        >
          Right-click here
        </ContextMenuBoundary>
        <ContextMenuPanel data-testid="panel">
          <Menu>
            {ITEMS.map((item) => (
              <MenuItem
                disabled={item === 'Paste'}
                onClick={() => {
                  setActivated(item);
                }}
              >
                {item}
              </MenuItem>
            ))}
          </Menu>
        </ContextMenuPanel>
      </ContextMenu>
      <button type="button" data-testid="after">
        After
      </button>
      <div data-testid="activated">{activated()}</div>
    </div>
  );
}
