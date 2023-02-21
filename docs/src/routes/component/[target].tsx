import { createMemo, JSX } from 'solid-js';
import ClientOnly from '../../components/ClientOnly';
import CodeSnippet from '../../components/CodeSnippet';
import DemoPreview from '../../components/DemoPreview';
import HighlighterProvider from '../../components/HighlighterProvider';
import PropsTable from '../../components/PropsTable';
import { LoadResult, RouterParams, useRouter } from '../../internal/router';
import META from '../../page-data';
import { DocumentInfo, HeaderInfo } from '../../page-data/meta';

interface DocumentParams extends RouterParams {
  target: string;
}

const MetaPageContext = $createContext<{ info: DocumentInfo, name: string }>();

function MetaPageHeader() {
  const ctx = $useContext(MetaPageContext);
  return (
    <Show when={ctx?.info.header} keyed>
      {(result: HeaderInfo) => (
        <div class="flex flex-col space-y-4">
          <h1 class="text-4xl font-bold">
            {result.title}
          </h1>
          <p class="">
            {result.description}
          </p>
        </div>
      )}
    </Show>
  );
}

function MetaPageDemo() {
  const ctx = $useContext(MetaPageContext);
  return createMemo(() => {
    if (ctx?.name && ctx.info.demo) {
      return (
        <div class="w-full h-[75vh]">
          <DemoPreview src={`/preview/${ctx.name}`} code={ctx.info.demo} />
        </div>
      );
    }
    return null;
  });
}

function MetaPageStructure() {
  const ctx = $useContext(MetaPageContext);

  let snippetLoading = $signal(true);

  function onSnippetLoad() {
    snippetLoading = false;
  }

  return (
    <Show when={ctx?.info.structure} keyed>
      {(result) => (
        <div class="flex flex-col space-y-4">
          <h2 class="text-3xl font-bold">
            Structure
          </h2>
          <p>
            {result.description}
          </p>
          <div class={`rounded-lg border overflow-hidden border-gray-900 dark:border-gray-50 ${snippetLoading ? 'opacity-0' : 'opacity-100'}`}>
            <ClientOnly>
              <CodeSnippet code={result.code} onLoad={onSnippetLoad} />
            </ClientOnly>
          </div>
        </div>
      )}
    </Show>
  );
}

function MetaPageAPIComponents() {
  const ctx = $useContext(MetaPageContext);

  return (
    <Show when={ctx?.info.api?.components} keyed>
      {(result) => (
        <For each={result}>
          {(item) => (
            <div class="flex flex-col space-y-2">
              <h3 class="text-2xl font-bold">
                {item.name}
              </h3>
              <p>{item.description}</p>
              <PropsTable props={item.props} />
            </div>
          )}
        </For>
      )}
    </Show>
  );
}

function MetaPageAPIExtras() {
  const ctx = $useContext(MetaPageContext);

  return (
    <Show when={ctx?.info.api?.extras} keyed>
      {(result) => (
        <For each={result}>
          {(item) => (
            <div class="flex flex-col space-y-2">
              <ClientOnly>
                <CodeSnippet code={item.code} />
              </ClientOnly>
              <p>{item.description}</p>
            </div>
          )}
        </For>
      )}
    </Show>
  );
}

function MetaPageAPIs() {
  const ctx = $useContext(MetaPageContext);

  return (
    <Show when={ctx?.info.api}>
      <div class="flex flex-col space-y-4">
        <h2 class="text-3xl font-bold">
          API
        </h2>
        <MetaPageAPIComponents />
        <MetaPageAPIExtras />
      </div>
    </Show>
  );
}

interface MetaPageProps {
  name: string;
  data: () => Promise<{ default: DocumentInfo }>;
}

function MetaPage(props: MetaPageProps): JSX.Element {
  const [data] = $resource(props.data);
  return (
    <Suspense>
      <Show when={data()} keyed>
        {(result) => (
          <MetaPageContext.Provider value={{ info: result.default, name: props.name }}>
            <MetaPageHeader />
            <MetaPageDemo />
            <MetaPageStructure />
            <MetaPageAPIs />
          </MetaPageContext.Provider>
        )}
      </Show>
    </Suspense>
  );
}

export const load = (_: Request, params: DocumentParams): LoadResult<null> => ({
  props: null,
  meta: {
    title: `${params.target} | solid-headless`,
    description: `${params.target}`,
  },
});

export default function DocumentPage(): JSX.Element {
  const router = useRouter<DocumentParams>();

  return (
    <Show when={router.params.target in META}>
      <HighlighterProvider>
        <MetaPage
          name={router.params.target}
          data={META[router.params.target].render}
        />
      </HighlighterProvider>
    </Show>
  );
}
