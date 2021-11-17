import { JSX } from 'solid-js';
import BashSnippet from '../components/BashSnippet';
import MainShell from '../components/MainShell';
import WindowPreview, { WindowPreviewBaseProps } from '../components/WindowPreview';

const PREVIEWS: WindowPreviewBaseProps[] = [
  { src: '/preview/dialog', canonical: '/component/dialog' },
  { src: '/preview/toaster', canonical: '/component/toaster' },
];

export default function Index(): JSX.Element {
  let selected = $signal(Math.floor(Math.random() * PREVIEWS.length));

  function goPrev() {
    selected = (selected === 0 ? PREVIEWS.length : selected) - 1;
  }

  function goNext() {
    selected = (selected + 1) % PREVIEWS.length;
  }

  return (
    <MainShell>
      <div class="flex flex-col space-y-4 space-x-0 md:space-y-0 md:flex-row md:space-x-4">
        <div class="flex-1 flex flex-col space-y-4">
          <span class="text-6xl md:text-8xl font-bold">Headless UI for SolidJS</span>
          <p class="text-xl">Unstyled, accessible, composable components</p>
          <div class="flex flex-col space-y-2">
            <BashSnippet code="npm i solid-headless" />
            <BashSnippet code="yarn add solid-headless" />
            <BashSnippet code="pnpm add solid-headless" />
          </div>
        </div>
        <div class="flex-1 flex items-center justify-center">
          <WindowPreview onPrev={goPrev} onNext={goNext} {...PREVIEWS[selected]} />
        </div>
      </div>
    </MainShell>
  );
}
