import {
  TailwindContextMenu,
  TailwindContextMenuBoundary,
  TailwindContextMenuPanel,
  TailwindTransition,
  TailwindMenu,
  TailwindMenuItem,
} from 'solid-headless';
import { createSignal, JSX } from 'solid-js';

function classNames(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

function Separator() {
  return (
    <div class="flex items-center" aria-hidden="true">
      <div class="w-full border-t border-gray-200" />
    </div>
  );
}

export default function App(): JSX.Element {
  const [x, setX] = createSignal(0);
  const [y, setY] = createSignal(0);
  return (
    <div class="w-full flex items-center justify-center">
      <TailwindContextMenu class="relative">
        {({ isOpen }) => (
          <>
            <TailwindContextMenuBoundary
              class={classNames(
                isOpen() && 'text-opacity-90',
                'text-white group border border-dashed border-white p-32 rounded-md inline-flex items-center text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'
              )}
              onContextMenu={(e: MouseEvent) => {
                if (e.currentTarget) {
                  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                  setX(e.clientX - rect.left);
                  setY(e.clientY - rect.top);
                }
              }}
            >
              <span>Right-click here</span>
            </TailwindContextMenuBoundary>
            <TailwindTransition
              show={isOpen()}
              class="absolute inset-0 w-0 h-0"
              enter="transition duration-200"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <TailwindContextMenuPanel
                unmount={false}
                class="z-10 transition duration-200"
                style={{
                  transform: `translateX(${x()}px) translateY(${y()}px)`,
                }}
              >
                <TailwindMenu class="overflow-hidden w-64 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white flex flex-col space-y-1 p-1">
                  <TailwindMenuItem as="button" class="text-sm p-1 text-left rounded hover:bg-violet-600 hover:text-white focus:outline-none focus:bg-violet-600 focus:text-white">
                    Open Link in New Tab
                  </TailwindMenuItem>
                  <TailwindMenuItem as="button" class="text-sm p-1 text-left rounded hover:bg-violet-600 hover:text-white focus:outline-none focus:bg-violet-600 focus:text-white">
                    Open Link in New Window
                  </TailwindMenuItem>
                  <TailwindMenuItem as="button" class="text-sm p-1 text-left rounded hover:bg-violet-600 hover:text-white focus:outline-none focus:bg-violet-600 focus:text-white">
                    Open Link in New Incognito Window
                  </TailwindMenuItem>
                  <Separator />
                  <TailwindMenuItem as="button" class="text-sm p-1 text-left rounded hover:bg-violet-600 hover:text-white focus:outline-none focus:bg-violet-600 focus:text-white">
                    Save Link As...
                  </TailwindMenuItem>
                  <TailwindMenuItem as="button" class="text-sm p-1 text-left rounded hover:bg-violet-600 hover:text-white focus:outline-none focus:bg-violet-600 focus:text-white">
                    Copy Link Address
                  </TailwindMenuItem>
                  <Separator />
                  <TailwindMenuItem as="button" class="text-sm p-1 text-left rounded hover:bg-violet-600 hover:text-white focus:outline-none focus:bg-violet-600 focus:text-white">
                    Inspect
                  </TailwindMenuItem>
                </TailwindMenu>
              </TailwindContextMenuPanel>
            </TailwindTransition>
          </>
        )}
      </TailwindContextMenu>
    </div>
  );
}
