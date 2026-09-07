import type { JSX } from '@solidjs/web';
import { createSignal } from 'solid-js';
import { Disclosure, DisclosureButton, DisclosurePanel } from 'terracotta/disclosure';

export default function ControlledDisclosure(): JSX.Element {
  const [open, setOpen] = createSignal(false);

  return (
    <div class="stack">
      <Disclosure class="disclosure" isOpen={open()} onChange={setOpen}>
        <DisclosureButton class="disclosure-button">
          Shipping details
          <span class="disclosure-chevron" aria-hidden="true">
            ▸
          </span>
        </DisclosureButton>
        <DisclosurePanel class="disclosure-panel">
          Nothing here moves until <code>setOpen</code> runs. The button below writes the same
          signal, so both stay in step.
        </DisclosurePanel>
      </Disclosure>

      <button type="button" class="button" onClick={() => setOpen((value) => !value)}>
        Toggle from outside
      </button>
      <p class="hint">State lives in the page: {open() ? 'open' : 'closed'}.</p>
    </div>
  );
}
