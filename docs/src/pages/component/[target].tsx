import { JSX } from 'solid-js';
import { RouterParams, useRouter } from 'solid-tiny-router';
import CodeSnippet from '../../components/CodeSnippet';
import DemoPreview from '../../components/DemoPreview';
import HighlighterProvider from '../../components/HighlighterProvider';
import MainShell from '../../components/MainShell';
import PropsTable from '../../components/PropsTable';
import META from '../../page-data';
import { DocumentInfo } from '../../page-data/meta';

interface DocumentParams extends RouterParams {
  target: string;
}

const MetaPageContext = $createContext<{ info: DocumentInfo, name: string }>();

function MetaPageHeader() {
  const ctx = $useContext(MetaPageContext);
  return (
    <$show when={ctx?.info.header}>
      {(result) => (
        <div class="flex flex-col space-y-4">
          <h1 class="text-4xl font-bold">
            {result.title}
          </h1>
          <p class="">
            {result.description}
          </p>
        </div>
      )}
    </$show>
  );
}

function MetaPageDemo() {
  const ctx = $useContext(MetaPageContext);
  return () => {
    if (ctx?.name && ctx.info.demo) {
      return (
        <div class="w-full h-[75vh]">
          <DemoPreview src={`/preview/${ctx.name}`} code={ctx.info.demo} />
        </div>
      );
    }
    return null;
  };
}

function MetaPageStructure() {
  const ctx = $useContext(MetaPageContext);

  let snippetLoading = $signal(true);

  function onSnippetLoad() {
    snippetLoading = false;
  }

  return (
    <$show when={ctx?.info.structure}>
      {(result) => (
        <div class="flex flex-col space-y-4">
          <h2 class="text-3xl font-bold">
            Structure
          </h2>
          <p>
            {result.description}
          </p>
          <div class={`rounded-lg border overflow-hidden border-gray-900 dark:border-gray-50 ${snippetLoading ? 'opacity-0' : 'opacity-100'}`}>
            <CodeSnippet code={result.code} onLoad={onSnippetLoad} />
          </div>
        </div>
      )}
    </$show>
  );
}

function MetaPageAPIComponents() {
  const ctx = $useContext(MetaPageContext);

  return (
    <$show when={ctx?.info.api?.components}>
      {(result) => (
        <$for each={result}>
          {(item) => (
            <div class="flex flex-col space-y-2">
              <h3 class="text-2xl font-bold">
                {item.name}
              </h3>
              <p>{item.description}</p>
              <PropsTable props={item.props} />
            </div>
          )}
        </$for>
      )}
    </$show>
  );
}

function MetaPageAPIExtras() {
  const ctx = $useContext(MetaPageContext);

  return (
    <$show when={ctx?.info.api?.extras}>
      {(result) => (
        <$for each={result}>
          {(item) => (
            <div class="flex flex-col space-y-2">
              <CodeSnippet code={item.code} />
              <p>{item.description}</p>
            </div>
          )}
        </$for>
      )}
    </$show>
  );
}

function MetaPageAPIs() {
  const ctx = $useContext(MetaPageContext);

  return (
    <$show when={ctx?.info.api}>
      <div class="flex flex-col space-y-4">
        <h2 class="text-3xl font-bold">
          API
        </h2>
        <MetaPageAPIComponents />
        <MetaPageAPIExtras />
      </div>
    </$show>
  );
}

interface MetaPageProps {
  name: string;
  data: () => Promise<{ default: DocumentInfo }>;
}

function MetaPage(props: MetaPageProps): JSX.Element {
  const [data] = $resource(props.data);
  return (
    <$suspense>
      <$show when={data()}>
        {(result) => (
          <MetaPageContext.Provider value={{ info: result.default, name: props.name }}>
            <MetaPageHeader />
            <MetaPageDemo />
            <MetaPageStructure />
            <MetaPageAPIs />
          </MetaPageContext.Provider>
        )}
      </$show>
    </$suspense>
  );
}

export default function DocumentPage(): JSX.Element {
  const router = useRouter<DocumentParams>();

  return (
    <MainShell>
      <$show when={router.params.target in META}>
        <HighlighterProvider>
          <MetaPage
            name={router.params.target}
            data={META[router.params.target].render}
          />
        </HighlighterProvider>
      </$show>
    </MainShell>
  );
}
