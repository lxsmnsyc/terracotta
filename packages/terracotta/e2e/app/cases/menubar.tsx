import type { JSX } from '@solidjs/web';
import { createSignal } from 'solid-js';
import { Menubar, MenuItem } from 'terracotta/menu';

const ITEMS = ['File', 'Edit', 'View', 'Help'];

export default function MenubarCase(): JSX.Element {
  const [activated, setActivated] = createSignal('');

  return (
    <div>
      <button type="button">Before</button>
      <Menubar aria-label="Main">
        {ITEMS.map((item) => (
          <MenuItem
            disabled={item === 'View'}
            onClick={() => {
              setActivated(item);
            }}
          >
            {item}
          </MenuItem>
        ))}
      </Menubar>
      <button type="button">After</button>
      <div data-testid="activated">{activated()}</div>
    </div>
  );
}
