import { DocumentInfo } from '../meta';
import DEMO_CODE from '../../examples/dialog?raw';

const structure = `<Dialog>
  <DialogOverlay />
  <DialogPanel>
    <DialogTitle />
    <DialogDescription />
  </DialogPanel>
</Dialog>
`;

const DIALOG: DocumentInfo = {
  header: {
    title: 'Dialog',
    description: 'A dialog is a window overlaid on either the primary window or another dialog window. Windows under a modal dialog are inert. That is, users cannot interact with content outside an active dialog window. Inert content outside an active dialog is typically visually obscured or dimmed so it is difficult to discern, and in some implementations, attempts to interact with the inert content cause the dialog to close.',
  },
  demo: DEMO_CODE,
  structure: {
    description: 'The Dialog component adheres to a strict structure and organization of its member components.',
    code: structure,
  },
  api: {
    components: [
      {
        name: 'Dialog',
        description: 'The root component. Manages the state of the Dialog structure.',
        props: [
          {
            name: 'as',
            type: 'string | Component',
            description: 'The component to be used for rendering.',
            default: '"div"',
          },
          {
            name: 'isOpen',
            type: 'boolean | undefined',
            description: 'Turns the Dialog into a stateless component and controls the visual state of the Dialog. Must be used with onChange, onClose or onOpen event listeners when defined.',
            default: 'undefined',
          },
          {
            name: 'defaultOpen',
            type: 'boolean | undefined',
            description: 'Defines the initial state of the Dialog. Does nothing when isOpen is defined.',
            default: 'undefined',
          },
          {
            name: 'disabled',
            type: 'boolean | undefined',
            description: "Disables the Dialog's visual state from further changes.",
            default: 'undefined',
          },
        ],
      },
      {
        name: 'DialogOverlay',
        description: 'Serves as the visual obstruction for the Dialog which usually covers the inert window.',
        props: [],
      },
      {
        name: 'DialogPanel',
        description: 'Container of the Dialog window.',
        props: [],
      },
      {
        name: 'DialogTitle',
        description: 'Title of the Dialog window.',
        props: [],
      },
      {
        name: 'DialogDescription',
        description: 'Description of the Dialog window.',
        props: [],
      },
    ],
  },
};

export default DIALOG;
