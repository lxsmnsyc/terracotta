import { JSX } from 'solid-js';
import ResizeTracker from './ResizeTracker';

export interface PreviewShellProps {
  children: JSX.Element;
}

export default function PreviewShell(props: PreviewShellProps): JSX.Element {
  return (
    <>
      <div class="w-screen h-screen flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-gray-900">
        {props.children}
      </div>
      <ResizeTracker />
    </>
  );
}
