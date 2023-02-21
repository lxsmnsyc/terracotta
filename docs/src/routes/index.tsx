import { JSX } from 'solid-js';
import { ColorSchemeProvider } from 'solid-headless';
import BashSnippet from '../components/BashSnippet';
import MainShell from '../components/MainShell';
import ComponentCard from '../components/ComponentCard';
import WindowPreview, { WindowPreviewBaseProps } from '../components/WindowPreview';
import META from '../page-data';
import { LoadResult, PageProps, useRouter } from '../internal/router';

const PREVIEWS: WindowPreviewBaseProps[] = Object.keys(META)
  .map((item) => ({ src: `/preview/${item}`, canonical: `/component/${item}` }));

function HeroSection() {
  let selected = $signal(Math.floor(Math.random() * PREVIEWS.length));

  function goPrev() {
    selected = (selected === 0 ? PREVIEWS.length : selected) - 1;
  }

  function goNext() {
    selected = (selected + 1) % PREVIEWS.length;
  }

  return (
    <div class="flex flex-col space-y-4 space-x-0 md:space-y-0 md:flex-row md:space-x-8">
      <div class="flex-1 flex flex-col space-y-4">
        <h1 class="text-6xl md:text-8xl font-bold">Headless UI for SolidJS</h1>
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
  );
}

function ComponentsSection() {
  return (
    <div class="flex flex-col space-y-4">
      <h2 class="text-3xl font-bold">Components</h2>
      <div class="flex flex-wrap">
        <For each={Object.keys(META)}>
          {(key) => (
            <ComponentCard
              target={key}
              name={META[key].name}
            />
          )}
        </For>
      </div>
    </div>
  );
}

export const load = (): LoadResult<null> => ({
  props: null,
  meta: {
    title: 'solid-headless',
    description: 'Headless UI library for SolidJS',
  },
});

export default function Index(props: PageProps<null>): JSX.Element {
  const router = useRouter();
  return (
    <ColorSchemeProvider initialValue="system">
      <Show
        when={!router.pathname.startsWith('/preview')}
        fallback={<Suspense>{props.children}</Suspense>}
      >
        <MainShell>
          <Show when={!props.isLayout} fallback={<Suspense>{props.children}</Suspense>}>
            <HeroSection />
            <ComponentsSection />
          </Show>
        </MainShell>
      </Show>
    </ColorSchemeProvider>
  );
}
