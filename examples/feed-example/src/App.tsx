import {
  TailwindFeed,
  TailwindFeedArticle,
  TailwindFeedArticleDescription,
  TailwindFeedArticleLabel,
  TailwindFeedContent,
  TailwindFeedLabel,
} from 'solid-headless';
import { createSignal, For, JSX, Show } from 'solid-js';

function ChevronDownIcon(props: JSX.IntrinsicElements['svg']): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
}

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
      ...loadData(10),
    ]);
    setBusy(false);
  }

  return (
    <div className="w-full flex items-center justify-center">
      <TailwindFeed class="max-h-96 w-96 flex flex-col" busy={busy()} size={articles().length}>
        <div class="flex-none my-2 flex justify-between">
          <TailwindFeedLabel class="text-xl text-white font-bold">Feed</TailwindFeedLabel>
          <Show when={busy()}>
            <SpinnerIcon class="animate-spin w-5 h-5 text-white" />
          </Show>
        </div>
        <TailwindFeedContent
          class="flex-1 overflow-y-scroll flex flex-col rounded-lg bg-indigo-900 bg-opacity-25 p-2"
          onScroll={(e) => {
            const el = e.target as HTMLElement;
            if (el.offsetHeight + el.scrollTop >= el.scrollHeight) {
              loadMore().catch(() => {
                //
              });
            }
          }}
        >
          <For each={articles()}>
            {(article, index) => (
              <TailwindFeedArticle index={index()} class="p-2 m-2 bg-indigo-900 transition bg-opacity-25 rounded focus:outline-none focus-visible:ring focus:bg-indigo-700 focus-visible:ring-indigo-500 focus-visible:ring-opacity-75">
                <TailwindFeedArticleLabel class="text-lg text-white">
                  {article.title}
                </TailwindFeedArticleLabel>
                <TailwindFeedArticleDescription class="text-sm text-white">
                  {article.description}
                </TailwindFeedArticleDescription>
              </TailwindFeedArticle>
            )}
          </For>
          <Show when={busy()}>
            <div class="w-full flex items-center justify-center">
              <SpinnerIcon class="animate-spin w-6 h-6 text-white" />
            </div>
          </Show>
        </TailwindFeedContent>
      </TailwindFeed>
    </div>
  );
}
