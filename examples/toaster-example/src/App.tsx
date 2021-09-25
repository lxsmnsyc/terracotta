import {
  TailwindToast,
  TailwindToaster,
  TailwindTransition,
  Toaster,
  useToaster,
} from 'solid-headless';
import { createSignal, JSX, For, createEffect, onCleanup } from 'solid-js';

const notifications = new Toaster<string>();

interface ToastProps {
  id: string;
  message: string;
}

function CloseIcon(props: JSX.IntrinsicElements['svg']): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

function Toast(props: ToastProps): JSX.Element {
  const [isOpen, setIsOpen] = createSignal(true);

  function dismiss() {
    setIsOpen(false);
  }

  return (
    <TailwindTransition
      show={isOpen()}
      class="relative transition rounded-lg p-4 bg-opacity-25 bg-indigo-900"
      enter="ease-out duration-300"
      enterFrom="opacity-0 scale-50"
      enterTo="opacity-100 scale-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-50"
      afterLeave={() => {
        notifications.remove(props.id);
      }}
    >
      <TailwindToast class="flex justify-between items-center">
        <span class="text-sm font-semibold text-white">{props.message}</span>
        <button type="button" class="w-6 h-6 p-1 text-white bg-opacity-25 bg-indigo-900 rounded-full" onClick={dismiss}>
          <CloseIcon />
        </button>
      </TailwindToast>
    </TailwindTransition>
  );
}

export default function App(): JSX.Element {
  const notifs = useToaster(notifications);

  function createToast() {
    notifications.create(`This toast is created on ${new Date().toDateString()}`);
  }

  const [isOpen, setIsOpen] = createSignal(false);

  function closeNotifs() {
    setIsOpen(false);
  }

  function clearNotifs() {
    notifications.clear();
  }

  createEffect(() => {
    if (notifs().length > 0) {
      setIsOpen(true);

      const timeout = setTimeout(() => {
        closeNotifs();
      }, 5000);

      onCleanup(() => {
        clearTimeout(timeout);
      });
    }
  });

  return (
    <>
      <div class="fixed inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={createToast}
          class="px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Create toast
        </button>
        <button
          type="button"
          onClick={closeNotifs}
          class="px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Clear toasts
        </button>
      </div>
      <TailwindToaster class="absolute fixed-0 left-0 bottom-0 m-4">
        <TailwindTransition
          show={isOpen()}
          class="relative transition"
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-50 translate-y-full"
          enterTo="opacity-100 scale-100 translate-y-0"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100 translate-y-0"
          leaveTo="opacity-0 scale-50  translate-y-full"
          afterLeave={clearNotifs}
        >
          <div class="flex flex-col w-96 max-h-96 overflow-hidden rounded-xl shadow-xl bg-opacity-25 bg-indigo-900 p-4 space-y-2">
            <div class="flex-none flex items-center justify-between">
              <span class="text-xl font-bold text-white">Notifications</span>
              <button type="button" onClick={closeNotifs} class="w-6 h-6 p-1 text-white bg-opacity-25 bg-indigo-900 rounded-full">
                <CloseIcon />
              </button>
            </div>
            <div class="flex-1 flex flex-col space-y-1 overflow-y-scroll rounded-lg">
              <For each={notifs().slice(0).reverse()}>
                {(item) => (
                  <Toast id={item.id} message={item.data} />
                )}
              </For>
            </div>
          </div>
        </TailwindTransition>
      </TailwindToaster>
    </>
  );
}
