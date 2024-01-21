import {
  Toast,
  Toaster,
  Transition,
  ToasterStore,
  useToaster,
} from 'terracotta';
import type { JSX } from 'solid-js';
import { createSignal, For, createEffect, onCleanup } from 'solid-js';

const notifications = new ToasterStore<string>();

interface ToastProps {
  id: string;
  message: string;
}

function CloseIcon(
  props: JSX.IntrinsicElements['svg'] & { title: string },
): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <title>{props.title}</title>
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

function CustomToast(props: ToastProps): JSX.Element {
  const [isOpen, setIsOpen] = createSignal(true);

  function dismiss(): void {
    setIsOpen(false);
  }

  return (
    <Transition
      show={isOpen()}
      class="relative transition rounded-lg p-4 bg-opacity-25 bg-rose-900"
      enter="ease-out duration-300"
      enterFrom="opacity-0 scale-50"
      enterTo="opacity-100 scale-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-50"
      afterLeave={(): void => {
        notifications.remove(props.id);
      }}
    >
      <Toast class="flex justify-between items-center">
        <span class="flex-1 text-sm font-semibold text-white">
          {props.message}
        </span>
        <button
          type="button"
          class="flex-none w-6 h-6 p-1 text-white bg-opacity-25 bg-rose-900 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          onClick={dismiss}
        >
          <CloseIcon title="Close" />
        </button>
      </Toast>
    </Transition>
  );
}

export default function App(): JSX.Element {
  const notifs = useToaster(notifications);

  function createToast(): void {
    notifications.create(
      `This toast is created on ${new Date().toTimeString()}`,
    );
  }

  const [isOpen, setIsOpen] = createSignal(false);

  function closeNotifs(): void {
    setIsOpen(false);
  }

  function clearNotifs(): void {
    notifications.clear();
  }

  createEffect(() => {
    if (notifs().length > 0) {
      setIsOpen(true);
    }

    const timeout = setTimeout(() => {
      closeNotifs();
    }, 5000);

    onCleanup(() => {
      clearTimeout(timeout);
    });
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
      <Toaster class="absolute fixed-0 left-0 bottom-0 m-4">
        <Transition
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
          <div class="flex flex-col w-80 max-h-96 overflow-hidden rounded-xl shadow-xl bg-opacity-25 bg-rose-900 p-4 space-y-2">
            <div class="flex-none flex items-center justify-between">
              <span class="text-xl font-bold text-white">Notifications</span>
              <button
                type="button"
                onClick={closeNotifs}
                class="w-6 h-6 p-1 text-white bg-opacity-25 bg-rose-900 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              >
                <CloseIcon title="Close" />
              </button>
            </div>
            <div class="flex-1 flex flex-col-reverse space-y-reverse space-y-1 overflow-y-auto rounded-lg">
              <For
                each={notifs().slice(0).reverse()}
                fallback={
                  <div class="bg-rose-900 bg-opacity-20 flex items-center justify-center text-bold text-white p-4">
                    There are no notifications.
                  </div>
                }
              >
                {(item): JSX.Element => (
                  <CustomToast id={item.id} message={item.data} />
                )}
              </For>
            </div>
          </div>
        </Transition>
      </Toaster>
    </>
  );
}
