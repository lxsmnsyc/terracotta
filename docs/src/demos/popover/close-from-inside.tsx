import type { JSX } from '@solidjs/web';
import { Popover, PopoverButton, PopoverPanel } from 'terracotta/popover';

export default function PopoverCloseFromInside(): JSX.Element {
  return (
    <div class="stack stage-tall">
      <Popover class="popover" defaultOpen={false}>
        <PopoverButton class="button">Filters</PopoverButton>
        <PopoverPanel class="popover-panel">
          {({ close }) => (
            <div class="stack">
              <label>
                <input type="checkbox" /> In stock only
              </label>
              <label>
                <input type="checkbox" /> Free delivery
              </label>
              <button type="button" class="button" onClick={close}>
                Apply
              </button>
            </div>
          )}
        </PopoverPanel>
      </Popover>
    </div>
  );
}
