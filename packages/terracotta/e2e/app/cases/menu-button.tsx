import type { JSX } from '@solidjs/web';
import { createSignal } from 'solid-js';
import { Menu, MenuItem } from 'terracotta/menu';
import { Popover, PopoverButton, PopoverPanel } from 'terracotta/popover';

const ITEMS = ['Duplicate', 'Rename', 'Delete'];

export default function MenuButtonCase(): JSX.Element {
  const [activated, setActivated] = createSignal('');

  return (
    <div>
      <button type="button">Before</button>
      <Popover defaultOpen={false}>
        <PopoverButton aria-haspopup="menu">Actions</PopoverButton>
        <PopoverPanel>
          <Menu>
            {ITEMS.map((item) => (
              <MenuItem
                onClick={() => {
                  setActivated(item);
                }}
              >
                {item}
              </MenuItem>
            ))}
          </Menu>
        </PopoverPanel>
      </Popover>
      <button type="button">After</button>
      <div data-testid="activated">{activated()}</div>
    </div>
  );
}
