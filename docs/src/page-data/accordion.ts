import { DocumentInfo } from './meta';
import DEMO_CODE from '../examples/accordion?raw';

const structure = `<Accordion>
  <AccordionItem>
    <AccordionHeader>
      <AccordionButton />
    </AccordionHeader>
    <AccordionPanel />
  </AccordionItem>
</Accordion>
`;

const ACCORDION: DocumentInfo = {
  header: {
    title: 'Accordion',
    description: 'An accordion is a vertically stacked set of interactive headings that each contain a title, content snippet, or thumbnail representing a section of content. The headings function as controls that enable users to reveal or hide their associated sections of content. Accordions are commonly used to reduce the need to scroll when presenting multiple sections of content on a single page.',
  },
  demo: DEMO_CODE,
  structure: {
    description: 'The Accordion component adheres to a strict structure and organization of its member components.',
    code: structure,
  },
  api: {
    components: [
      {
        name: 'Accordion',
        description: 'The root component. Manages the state of the Dialog structure.',
        props: [],
      },
      {
        name: 'AccordionItem',
        description: 'Serves as the visual obstruction for the Dialog which usually covers the inert window.',
        props: [],
      },
      {
        name: 'AccordionHeader',
        description: 'Container of the Dialog window.',
        props: [],
      },
      {
        name: 'AccordionButton',
        description: 'Title of the Dialog window.',
        props: [],
      },
      {
        name: 'AccordionPanel',
        description: 'Description of the Dialog window.',
        props: [],
      },
    ],
  },
};

export default ACCORDION;
