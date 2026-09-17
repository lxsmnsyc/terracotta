import type { JSX } from '@solidjs/web';
import { createSignal } from 'solid-js';
import { Disclosure, DisclosureButton, DisclosurePanel } from 'terracotta/disclosure';

export default function DisabledDisclosure(): JSX.Element {
  const [hasContent, setHasContent] = createSignal(false);

  return (
    <div class="stack">
      <Disclosure class="disclosure" defaultOpen={false} disabled={!hasContent()}>
        <DisclosureButton class="disclosure-button">
          Attachments
          <span class="disclosure-chevron" aria-hidden="true">
            ▸
          </span>
        </DisclosureButton>
        <DisclosurePanel class="disclosure-panel">Two files, 1.4 MB.</DisclosurePanel>
      </Disclosure>

      <button type="button" class="button" onClick={() => setHasContent((value) => !value)}>
        {hasContent() ? 'Remove the attachments' : 'Add attachments'}
      </button>
      <p class="hint">
        While disabled the root carries <code>tc-disabled</code>, and clicking the button does
        nothing.
      </p>
    </div>
  );
}
