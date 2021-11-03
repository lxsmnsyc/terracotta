import {
  CommandBar,
  CommandBarPanel,
  CommandBarTitle,
  CommandBarOverlay,
  Transition,
  TransitionChild,
} from 'solid-headless';
import { createSignal, JSX } from 'solid-js';

export default function App(): JSX.Element {
  const [isOpen, setIsOpen] = createSignal(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div class="fixed inset-0 flex items-center justify-center">
        <span class="text-white text-sm bg-blue-900 bg-opacity-50 p-4 rounded-lg">
          {'Press '}
          <span class="font-mono px-2 py-1 border border-white m-1 rounded">⌘ + K</span>
          {' or '}
          <span class="font-mono px-2 py-1 border border-white m-1 rounded">Ctrl + K</span>
          !
        </span>
      </div>

      <CommandBar
        isOpen
        class="fixed inset-0 z-10 overflow-y-auto"
        onOpen={openModal}
        onClose={closeModal}
      >
        <Transition appear show={isOpen()} class="min-h-screen px-4 flex items-center justify-center">
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <CommandBarOverlay className="fixed inset-0 bg-gray-900 bg-opacity-50" />
          </TransitionChild>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <CommandBarPanel class="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <CommandBarTitle
                as="h3"
                class="text-xl font-medium leading-6 text-gray-900"
              >
                Search
              </CommandBarTitle>
              <div class="mt-2">
                <input
                  type="text"
                  placeholder="What's on your mind?"
                  class="p-4 text-2xl rounded-lg w-full"
                />
              </div>

              <div class="mt-2 flex flex-col space-y-1">
                <div class="p-2 bg-blue-600 bg-opacity-200 rounded-lg text-white">
                  What is your favorite color?
                </div>
                <div class="p-2 bg-blue-600 bg-opacity-200 rounded-lg text-white">
                  What is the capital of Assyria?
                </div>
                <div class="p-2 bg-blue-600 bg-opacity-200 rounded-lg text-white">
                  What is the air-speed velocity of an unladen swallow?
                </div>
              </div>
            </CommandBarPanel>
          </TransitionChild>
        </Transition>
      </CommandBar>
    </>
  );
}
