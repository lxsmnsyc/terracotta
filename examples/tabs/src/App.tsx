import {
  Tab,
  TabGroup,
  TabList,
  TabPanel,
} from 'solid-headless';
import { For, JSX } from 'solid-js';

function classNames(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
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

const CATEGORIES = [
  'Best',
  'Top',
  'New',
];

const FEED: Record<string, Article[]> = CATEGORIES.reduce((acc, current) => ({
  ...acc,
  [current]: loadData(10),
}), {});

function Separator() {
  return (
    <div class="flex items-center" aria-hidden="true">
      <div class="w-full border-t border-gray-200" />
    </div>
  );
}

export default function App(): JSX.Element {
  return (
    <div class="w-full">
      <div class="w-full max-w-md mx-auto">
        <TabGroup
          class="w-full flex flex-col items-stretch justify-center p-4 space-y-2 rounded-lg bg-rose-900 bg-opacity-25"
          defaultValue={CATEGORIES[0]}
          horizontal
        >
          {({ isSelected, isActive }) => (
            <>
              <TabList
                class="w-full flex items-stretch justify-between space-x-2"
              >
                <For each={CATEGORIES}>
                  {(category) => (
                    <Tab
                      class={classNames(
                        isSelected(category) ? 'bg-rose-900 bg-opacity-75 text-white' : 'bg-white',
                        isActive(category) && 'ring-2 ring-offset-2 ring-offset-rose-300 ring-white ring-opacity-60',
                        'w-full flex items-center justify-center rounded-lg shadow-md px-4 py-2 cursor-pointer focus:outline-none font-semibold',
                      )}
                      value={category}
                    >
                      {category}
                    </Tab>
                  )}
                </For>
              </TabList>
              <div>
                <For each={CATEGORIES}>
                  {(category) => (
                    <TabPanel
                      value={category}
                      class={classNames(
                        'w-full h-96 p-2 rounded-lg bg-white overflow-y-auto focus:outline-none',
                        'focus:ring-2 focus:ring-offset-2 focus:ring-offset-rose-300 focus:ring-white focus:ring-opacity-60',
                      )}
                    >
                      <For each={FEED[category]}>
                        {(item) => (
                          <div tabindex={0} class="p-2 m-2 flex flex-col space-y-1 bg-opacity-25 rounded focus:outline-none focus-visible:ring focus-visible:ring-rose-500 focus-visible:ring-opacity-75">
                            <div class="text-lg text-gray-900 font-bold">
                              {item.title}
                            </div>
                            <Separator />
                            <div class="text-sm text-gray-900">
                              {item.description}
                            </div>
                          </div>
                        )}
                      </For>
                    </TabPanel>
                  )}
                </For>
              </div>
            </>
          )}
        </TabGroup>
      </div>
    </div>
  );
}
