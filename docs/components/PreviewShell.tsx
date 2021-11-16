import { JSX } from 'solid-js';
import ResizeTracker from './ResizeTracker';
import { ThemeAdapter } from './ThemeAdapter';

export interface PreviewShellProps {
  children: JSX.Element;
}

export default function PreviewShell(props: PreviewShellProps): JSX.Element {
  return (
    <ThemeAdapter>
      <div class="w-screen h-screen flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-gray-900">
        {props.children}
      </div>
      <ResizeTracker />
    </ThemeAdapter>
  );
}
