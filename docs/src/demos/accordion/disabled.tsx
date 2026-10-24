import type { JSX } from '@solidjs/web';
import {
  Accordion,
  AccordionButton,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
} from 'terracotta/accordion';

export default function DisabledAccordion(): JSX.Element {
  return (
    <div class="stack">
      <Accordion<string> class="accordion" defaultValue="one" toggleable>
        <AccordionItem class="accordion-item" value="one">
          <AccordionHeader class="accordion-header">
            <AccordionButton class="accordion-button">
              Available
              <span class="accordion-marker" aria-hidden="true">
                ▸
              </span>
            </AccordionButton>
          </AccordionHeader>
          <AccordionPanel class="accordion-panel">An ordinary section.</AccordionPanel>
        </AccordionItem>

        <AccordionItem class="accordion-item" value="two" disabled>
          <AccordionHeader class="accordion-header">
            <AccordionButton class="accordion-button">
              Unavailable on your plan
              <span class="accordion-marker" aria-hidden="true">
                ▸
              </span>
            </AccordionButton>
          </AccordionHeader>
          <AccordionPanel class="accordion-panel">You will never see this.</AccordionPanel>
        </AccordionItem>
      </Accordion>
      <p class="hint">Arrow-key navigation skips the disabled header rather than stopping on it.</p>
    </div>
  );
}
