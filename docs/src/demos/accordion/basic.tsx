import type { JSX } from '@solidjs/web';
import { For } from 'solid-js';
import {
  Accordion,
  AccordionButton,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
} from 'terracotta/accordion';

const SECTIONS = [
  { value: 'shipping', title: 'Shipping', body: 'Ships in 2–3 working days, tracked.' },
  { value: 'returns', title: 'Returns', body: 'Thirty days, no questions, return postage paid.' },
  { value: 'warranty', title: 'Warranty', body: 'Two years against manufacturing defects.' },
];

export default function BasicAccordion(): JSX.Element {
  return (
    <div class="stack">
      <Accordion<string> class="accordion" defaultValue="shipping" toggleable>
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
      <p class="hint">Arrow keys move between headers; Home and End jump to the ends.</p>
    </div>
  );
}
