import type { JSX } from '@solidjs/web';
import { Disclosure, DisclosureButton, DisclosurePanel } from 'terracotta/disclosure';

export default function CloseFromPanel(): JSX.Element {
  return (
    <div class="stack">
      <Disclosure class="disclosure" defaultOpen={false}>
        <DisclosureButton class="disclosure-button">
          Filters
          <span class="disclosure-chevron" aria-hidden="true">
            ▸
          </span>
        </DisclosureButton>
        <DisclosurePanel class="disclosure-panel">
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
        </DisclosurePanel>
      </Disclosure>
    </div>
  );
}
