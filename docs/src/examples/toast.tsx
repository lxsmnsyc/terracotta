import {
  createEffect,
  createSignal,
  JSX,
  onCleanup,
  For,
} from 'solid-js';
import {
  Transition,
  useToaster,
  Toaster,
  Toast,
  ToasterStore,
} from 'solid-headless';

function classNames(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

const BUTTON = classNames(
  'rounded-md px-4 py-2 text-sm font-medium transition duration-150',
  'focus:outline-none focus-visible:ring focus-visible:ring-opacity-75',
  'focus-visible:ring-gray-900',
  'dark:focus-visible:ring-gray-50',
  // Background
  'bg-gray-900 hover:bg-gray-700 active:bg-gray-800',
  'dark:bg-gray-50 dark:hover:bg-gray-200 dark:active:bg-gray-100',
  // Foreground
  'text-gray-50 hover:text-gray-200 active:text-gray-100',
  'dark:text-gray-900 dark:hover:text-gray-700 dark:active:text-gray-800',
);

const notifications = new ToasterStore<string>();

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

function CustomToast(props: ToastProps): JSX.Element {
  const [isOpen, setIsOpen] = createSignal(true);

  function dismiss() {
    setIsOpen(false);
  }

  return (
    <Transition
      show={isOpen()}
      class="relative transition rounded-lg p-4 bg-gray-900 dark:bg-gray-50 border border-gray-900 dark:border-gray-50"
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
      <Toast class="flex justify-between items-center">
        <span class="flex-1 text-sm font-semibold text-gray-50 dark:text-gray-900">{props.message}</span>
        <button type="button" class="flex-none w-6 h-6 p-1 text-gray-50 dark:text-gray-900 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75" onClick={dismiss}>
          <CloseIcon />
        </button>
      </Toast>
    </Transition>
  );
}

export default function ToasterPreview(): JSX.Element {
  const notifs = useToaster(notifications);

  function createToast() {
    notifications.create(`This toast is created on ${new Date().toTimeString()}`);
  }

  const [isOpen, setIsOpen] = createSignal(false);
  const [persist, setPersist] = createSignal(true);

  function closeNotifs() {
    setIsOpen(false);
    setPersist(false);
  }

  function clearNotifs() {
    notifications.clear();
  }

  createEffect(() => {
    if (notifs().length > 0) {
      setIsOpen(true);
    }

    if (persist()) {
      return;
    }
    const timeout = setTimeout(() => {
      closeNotifs();
    }, 5000);

    onCleanup(() => {
      clearTimeout(timeout);
    });
  });

  createEffect(() => {
    setTimeout(() => {
      createToast();
    }, 1000);
  });

  return (
    <>
      <div class="flex items-center justify-center space-x-2">
        <button
          type="button"
          onClick={createToast}
          class={BUTTON}
        >
          Create toast
        </button>
        <button
          type="button"
          onClick={closeNotifs}
          class={BUTTON}
        >
          Clear toasts
        </button>
      </div>
      <Toaster class="absolute fixed-0 left-0 bottom-0">
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
          <div class="flex flex-col m-4 max-w-full max-h-[50vh] overflow-hidden rounded-xl shadow-xl bg-gray-50 dark:bg-gray-900 border border-gray-900 dark:border-gray-50 p-4 space-y-2">
            <div class="flex-none flex items-center justify-between">
              <span class="text-xl font-bold text-gray-900 dark:text-gray-50">Notifications</span>
              <button type="button" onClick={closeNotifs} class="w-6 h-6 p-1 text-gray-900 dark:text-gray-50 bg-gray-50 dark:bg-gray-900 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                <CloseIcon />
              </button>
            </div>
            <div class="flex-1 flex flex-col-reverse space-y-reverse space-y-1 overflow-y-scroll rounded-lg">
              <For
                each={notifs().slice(0).reverse()}
                fallback={(
                  <div class="bg-gray-900 dark:bg-gray-50 flex items-center justify-center text-bold text-gray-50 dark:text-gray-900 p-4">
                    There are no notifications.
                  </div>
                )}
              >
                {(item) => (
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
