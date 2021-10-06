import {
  Feed,
  FeedArticle,
  FeedArticleDescription,
  FeedArticleLabel,
  FeedContent,
  FeedLabel,
  Transition,
} from 'solid-headless';
import {
  createSignal,
  For,
  JSX,
  Show,
} from 'solid-js';

function SpinnerIcon(props: JSX.IntrinsicElements['svg']): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  );
}

interface Article {
  title: string;
  description: string;
}

const adjectives = ['pretty', 'large', 'big', 'small', 'tall', 'short', 'long', 'handsome', 'plain', 'quaint', 'clean', 'elegant', 'easy', 'angry', 'crazy', 'helpful', 'mushy', 'odd', 'unsightly', 'adorable', 'important', 'inexpensive', 'cheap', 'expensive', 'fancy'];
const colours = ['red', 'yellow', 'blue', 'green', 'pink', 'brown', 'purple', 'brown', 'white', 'black', 'orange'];
const nouns = ['table', 'chair', 'house', 'bbq', 'desk', 'car', 'pony', 'cookie', 'sandwich', 'burger', 'pizza', 'mouse', 'keyboard'];

function random(max: number): number {
  return Math.round(Math.random() * 1000) % max;
}

function loadData(count: number) {
  const data = new Array<Article>(count);
  for (let i = 0; i < count; i += 1) {
    data[i] = {
      title: `${adjectives[random(adjectives.length)]} ${colours[random(colours.length)]} ${nouns[random(nouns.length)]}`,
      description: `${adjectives[random(adjectives.length)]} ${colours[random(colours.length)]} ${nouns[random(nouns.length)]}`,
    };
  }
  return data;
}

function Separator() {
  return (
    <div class="flex items-center" aria-hidden="true">
      <div class="w-full border-t border-gray-200" />
    </div>
  );
}

export default function App(): JSX.Element {
  const [busy, setBusy] = createSignal(false);
  const [articles, setArticles] = createSignal<Article[]>(loadData(10));

  function sleep(timeout: number) {
    return new Promise<boolean>((resolve) => {
      setTimeout(resolve, timeout, true);
    });
  }

  async function loadMore() {
    setBusy(true);
    await sleep(1000);
    setArticles((current) => [
      ...current,
      ...loadData(5),
    ]);
    setBusy(false);
  }

  return (
    <div className="w-full flex items-center justify-center">
      <Feed class="max-h-96 w-96 flex flex-col" busy={busy()} size={articles().length}>
        <div class="flex-none my-2 flex justify-between items-center">
          <FeedLabel class="text-xl text-white font-bold">Feed</FeedLabel>
          <Transition
            show={busy()}
            enter="transform transition duration-200 ease-in"
            enterFrom="opacity-0 scale-50"
            enterTo="opacity-100 scale-100"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-50"
            leave="transform transition duration-200 ease-out"
          >
            <SpinnerIcon class="animate-spin w-5 h-5 text-white" />
          </Transition>
        </div>
        <FeedContent
          class="flex-1 overflow-y-scroll flex flex-col rounded-lg bg-indigo-900 bg-opacity-25 p-2"
          onScroll={(e) => {
            const el = e.target as HTMLElement;
            if (!busy()) {
              if (el.offsetHeight + el.scrollTop >= el.scrollHeight - el.getBoundingClientRect().height) {
                loadMore().catch(() => {
                  //
                });
              }
            }
          }}
        >
          <For each={articles()}>
            {(article, index) => (
              <FeedArticle index={index()} class="p-2 m-2 flex flex-col space-y-1 bg-indigo-900 transition bg-opacity-25 rounded focus:outline-none focus-visible:ring focus:bg-indigo-700 focus-visible:ring-indigo-500 focus-visible:ring-opacity-75">
                <FeedArticleLabel class="text-lg text-white font-bold">
                  {article.title}
                </FeedArticleLabel>
                <Separator />
                <FeedArticleDescription class="text-sm text-white">
                  {article.description}
                </FeedArticleDescription>
              </FeedArticle>
            )}
          </For>
          <Show when={busy()}>
            <div class="w-full flex items-center justify-center">
              <SpinnerIcon class="animate-spin w-5 h-5 text-white" />
            </div>
          </Show>
        </FeedContent>
      </Feed>
    </div>
  );
}
