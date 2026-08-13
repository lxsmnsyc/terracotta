import type { JSX } from 'solid-js';
import { Button, Popover, PopoverButton, PopoverPanel } from 'terracotta';

export default function PopoverCase(): JSX.Element {
  return (
    <div>
      <Popover defaultOpen={false}>
        <PopoverButton>Options</PopoverButton>
        <PopoverPanel data-testid="panel">
          <Button data-testid="rename">Rename</Button>
          <Button data-testid="duplicate">Duplicate</Button>
        </PopoverPanel>
      </Popover>
      <button type="button" data-testid="outside">
        Outside
      </button>
    </div>
  );
}
