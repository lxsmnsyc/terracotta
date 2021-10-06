import { Transition } from 'solid-headless';
import {
  createEffect,
  createSignal,
  JSX,
  onCleanup,
} from 'solid-js';

export default function ResizeTracker(): JSX.Element {
  const [visible, setVisible] = createSignal(false);
  const [width, setWidth] = createSignal(window.innerWidth);
  const [height, setHeight] = createSignal(window.innerHeight);

  createEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined;

    function renderResize() {
      setVisible(true);

      if (timeout) {
        clearTimeout(timeout);
        timeout = undefined;
      }

      timeout = setTimeout(() => {
        setVisible(false);
      }, 1000);

      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }

    window.addEventListener('resize', renderResize);

    onCleanup(() => {
      if (timeout) {
        clearTimeout(timeout);
      }
      window.removeEventListener('resize', renderResize);
    });
  });

  return (
    <Transition
      show={visible()}
      class="fixed right-0 top-0 shadow-lg rounded-lg m-2 transition transform-gpu duration-200 bg-gray-900 pointer-events-none"
      enterFrom="opacity-0 scale-50"
      enterTo="opacity-100 scale-100"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-50"
    >
      <div class="px-2 py-1 text-xs text-white font-semibold">
        {`${width()} x ${height()}`}
      </div>
    </Transition>
  );
}
