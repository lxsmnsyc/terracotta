import type { JSX } from '@solidjs/web';
import { Disclosure, DisclosureButton, DisclosurePanel } from 'terracotta/disclosure';

export default function RenderPropDisclosure(): JSX.Element {
  return (
    <div class="stack">
      <Disclosure class="disclosure" defaultOpen={false}>
        {({ isOpen }) => (
          <>
            <DisclosureButton class="disclosure-button">
              {isOpen() ? 'Hide' : 'Show'} the release notes
              <span class="disclosure-chevron" aria-hidden="true">
                ▸
              </span>
            </DisclosureButton>
            <DisclosurePanel class="disclosure-panel">
              The label is derived from the state, not tracked separately. No extra signal, no
              handler, no chance of the two drifting apart.
            </DisclosurePanel>
          </>
        )}
      </Disclosure>
    </div>
  );
}
