import { Transition } from 'solid-headless';
import {
  JSX,
} from 'solid-js';

export default function ResizeTracker(): JSX.Element {
  let visible = $signal(false);
  let width = $signal(typeof window === 'undefined' ? 0 : window.innerWidth);
  let height = $signal(typeof window === 'undefined' ? 0 : window.innerHeight);

  $effect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined;

    const renderResize = () => {
      visible = true;

      if (timeout) {
        clearTimeout(timeout);
        timeout = undefined;
      }

      timeout = setTimeout(() => {
        visible = false;
      }, 1000);

      width = window.innerWidth;
      height = window.innerHeight;
    };

    window.addEventListener('resize', renderResize);

    $cleanup(() => {
      if (timeout) {
        clearTimeout(timeout);
      }
      window.removeEventListener('resize', renderResize);
    });
  });

  return (
    <Transition
      show={visible}
      class="fixed right-0 top-0 shadow-lg rounded-lg m-2 transition transform-gpu duration-200 bg-gray-900 pointer-events-none"
      enterFrom="opacity-0 scale-50"
      enterTo="opacity-100 scale-100"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-50"
    >
      <div class="px-2 py-1 text-xs text-white font-semibold">
        {`${width} x ${height}`}
      </div>
    </Transition>
  );
}
