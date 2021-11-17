import { JSX } from 'solid-js';
import DarkModeToggle from './DarkModeToggle';
import Github from './Github';
import Home from './Home';
import { ThemeAdapter } from './ThemeAdapter';

export interface MainShellProps {
  children: JSX.Element;
}

export default function MainShell(props: MainShellProps): JSX.Element {
  return (
    <ThemeAdapter>
      <div class="min-h-screen flex flex-col font-mono p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
        <div class="sticky top-4 z-50">
          <div class="bg-gray-900 dark:bg-gray-50 dynamic-shadow rounded-lg flex items-center">
            <div class="flex-1 flex items-center justify-between m-2">
              <div class="flex">
                <Home />
              </div>
              <div class="flex space-x-2">
                <DarkModeToggle />
                <Github />
              </div>
            </div>
          </div>
        </div>
        <main class="text-gray-900 dark:text-gray-50 flex flex-col p-4 md:p-8 space-y-8">
          {props.children}
        </main>
      </div>
    </ThemeAdapter>
  );
}
