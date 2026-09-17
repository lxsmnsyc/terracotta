import type { JSX } from '@solidjs/web';
import { Popover, PopoverButton, PopoverPanel } from 'terracotta/popover';

export default function BasicPopover(): JSX.Element {
  return (
    <div class="stack stage-tall">
      <Popover class="popover" defaultOpen={false}>
        <PopoverButton class="button">
          Notifications
          <span class="popover-caret" aria-hidden="true">
            ▾
          </span>
        </PopoverButton>
        <PopoverPanel class="popover-panel">
          <p>Nothing new since Tuesday.</p>
        </PopoverPanel>
      </Popover>
      <p class="hint">
        <kbd>Escape</kbd> closes it and returns focus to the button, and so does clicking away.
      </p>
    </div>
  );
}
