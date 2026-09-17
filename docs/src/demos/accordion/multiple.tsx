import type { JSX } from '@solidjs/web';
import { For, createSignal } from 'solid-js';
import {
  Accordion,
  AccordionButton,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
} from 'terracotta/accordion';

const SECTIONS = [
  { value: 'account', title: 'Account', body: 'Name, email address and password.' },
  { value: 'billing', title: 'Billing', body: 'Payment method and invoices.' },
  { value: 'team', title: 'Team', body: 'Members, roles and invitations.' },
];

export default function MultipleAccordion(): JSX.Element {
  const [open, setOpen] = createSignal<string[]>(['account', 'team']);

  return (
    <div class="stack">
      <Accordion<string> class="accordion" multiple value={open()} onChange={setOpen}>
        <For each={SECTIONS}>
          {(section) => (
            <AccordionItem class="accordion-item" value={section.value}>
              <AccordionHeader class="accordion-header">
                <AccordionButton class="accordion-button">
                  {section.title}
                  <span class="accordion-marker" aria-hidden="true">
                    ▸
                  </span>
                </AccordionButton>
              </AccordionHeader>
              <AccordionPanel class="accordion-panel">{section.body}</AccordionPanel>
            </AccordionItem>
          )}
        </For>
      </Accordion>
      <p class="hint">Open: {open().join(', ') || 'nothing'}</p>
    </div>
  );
}
