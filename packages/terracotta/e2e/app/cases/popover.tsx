import type { JSX } from '@solidjs/web';
import { Button } from 'terracotta/button';
import { Popover, PopoverButton, PopoverPanel } from 'terracotta/popover';

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
