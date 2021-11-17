import { JSX } from 'solid-js';
import CodeSnippet from '../../components/CodeSnippet';
import DemoPreview from '../../components/DemoPreview';
import MainShell from '../../components/MainShell';
import code from '../../examples/toaster?raw';

const structure = `<Dialog>
  <DialogOverlay />
  <DialogPanel>
    <DialogTitle />
    <DialogDescription />
  </DialogPanel>
</Dialog>
`;

export default function ToasterPage(): JSX.Element {
  let snippetLoading = $signal(true);

  function onSnippetLoad() {
    snippetLoading = false;
  }

  return (
    <MainShell>
      <div class="flex flex-col space-y-4">
        <h1 class="text-4xl font-bold">
          Toaster
        </h1>
        <p class="">A dialog is a window overlaid on either the primary window or another dialog window. Windows under a modal dialog are inert. That is, users cannot interact with content outside an active dialog window. Inert content outside an active dialog is typically visually obscured or dimmed so it is difficult to discern, and in some implementations, attempts to interact with the inert content cause the dialog to close.</p>
      </div>
      <div class="w-full h-[75vh]">
        <DemoPreview src="/preview/toaster" code={code} />
      </div>
      <div class="flex flex-col space-y-4">
        <h2 class="text-3xl font-bold">
          Accessibility
        </h2>
        <div class="flex flex-col space-y-2">
          <h3 class="text-2xl font-bold">
            Focus Management
          </h3>
        </div>
        <div class="flex flex-col space-y-2">
          <h3 class="text-2xl font-bold">
            Keyboard Interaction
          </h3>
        </div>
      </div>
      <div class="flex flex-col space-y-4">
        <h2 class="text-3xl font-bold">
          Structure
        </h2>
        <p>
          The Dialog component adheres to a strict structure and
          organization of its member components.
        </p>
        <div class={`rounded-lg border overflow-hidden border-gray-900 dark:border-gray-50 ${snippetLoading ? 'opacity-0' : 'opacity-100'}`}>
          <CodeSnippet code={structure} onLoad={onSnippetLoad} />
        </div>
      </div>
      <div class="flex flex-col space-y-4">
        <h2 class="text-3xl font-bold">
          API
        </h2>
        <div class="flex flex-col space-y-2">
          <h3 class="text-2xl font-bold">
            Dialog
          </h3>
        </div>
        <div class="flex flex-col space-y-2">
          <h3 class="text-2xl font-bold">
            DialogPanel
          </h3>
        </div>
        <div class="flex flex-col space-y-2">
          <h3 class="text-2xl font-bold">
            DialogOverlay
          </h3>
        </div>
        <div class="flex flex-col space-y-2">
          <h3 class="text-2xl font-bold">
            DialogTitle
          </h3>
        </div>
        <div class="flex flex-col space-y-2">
          <h3 class="text-2xl font-bold">
            DialogDescription
          </h3>
        </div>
      </div>
    </MainShell>
  );
}
