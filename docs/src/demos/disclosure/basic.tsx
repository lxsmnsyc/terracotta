import type { JSX } from '@solidjs/web';
import { Disclosure, DisclosureButton, DisclosurePanel } from 'terracotta/disclosure';

export default function BasicDisclosure(): JSX.Element {
  return (
    <div class="stack">
      <Disclosure class="disclosure" defaultOpen={false}>
        <DisclosureButton class="disclosure-button">
          What is a headless component?
          <span class="disclosure-chevron" aria-hidden="true">
            ▸
          </span>
        </DisclosureButton>
        <DisclosurePanel class="disclosure-panel">
          One that ships behaviour and accessibility, but no styles. Everything you can see here
          comes from the theme you picked in the header.
        </DisclosurePanel>
      </Disclosure>

      <Disclosure class="disclosure" defaultOpen={false}>
        <DisclosureButton class="disclosure-button">
          Does it manage focus?
          <span class="disclosure-chevron" aria-hidden="true">
            ▸
          </span>
        </DisclosureButton>
        <DisclosurePanel class="disclosure-panel">
          Only as far as a disclosure should: the button is focusable, the panel is reachable with
          Tab while open, and nothing is trapped.
        </DisclosurePanel>
      </Disclosure>
    </div>
  );
}
