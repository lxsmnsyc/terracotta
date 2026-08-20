import type { JSX } from 'solid-js';
import { createSignal } from 'solid-js';
import { Menu, MenuItem } from 'terracotta';

const ITEMS = ['Cut', 'Copy', 'Paste', 'Delete'];

export default function MenuCase(): JSX.Element {
  const [activated, setActivated] = createSignal('');

  return (
    <div>
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
      <div data-testid="activated">{activated()}</div>
    </div>
  );
}
