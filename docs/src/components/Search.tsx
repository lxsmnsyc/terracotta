import { useNavigate } from '@solidjs/router';
import { type JSX, isServer } from '@solidjs/web';
import { For, Show, createEffect, createSignal } from 'solid-js';
import {
  Command,
  CommandInput,
  CommandLabel,
  CommandOption,
  CommandOptions,
} from 'terracotta/command';
import {
  CommandBar,
  CommandBarDescription,
  CommandBarOverlay,
  CommandBarPanel,
  CommandBarTitle,
} from 'terracotta/command-bar';
import type { SearchPage } from 'virtual:search-index';
import { useColorScheme, useNativeColorScheme } from '../lib/color-scheme';
import { BoltIcon, ComponentIcon, HashIcon, PageIcon, SearchIcon } from '../lib/icons';
import { useTheme } from '../lib/theme';
import { THEMES } from '../themes';

const REPO = 'https://github.com/lxsmnsyc/terracotta';
const INSTALL = 'pnpm add terracotta@next';

type Kind = 'guide' | 'component' | 'section' | 'action';

interface Result {
  /** A path to open, or `action:` and the name of an action. */
  key: string;
  title: string;
  /** The line under the title: a page's lede, or where a section is. */
  detail: string;
  kind: Kind;
  /** The page a section belongs to, so one page cannot fill the list. */
  page: string;
  /** The text the query is matched against, beyond the title. */
  body: string;
}

interface Group {
  title: string;
  items: Result[];
}

const ACTIONS: Result[] = [
  {
    key: 'action:theme',
    title: 'Next theme',
    detail: 'Restyle the whole site, demos included',
    kind: 'action',
    page: '',
    body: 'theme style skin switch change',
  },
  {
    key: 'action:scheme',
    title: 'Toggle light and dark',
    detail: 'Switch the colour scheme',
    kind: 'action',
    page: '',
    body: 'dark light mode colour color scheme',
  },
  {
    key: 'action:install',
    title: 'Copy the install command',
    detail: INSTALL,
    kind: 'action',
    page: '',
    body: 'install npm pnpm yarn add copy',
  },
  {
    key: 'action:github',
    title: 'Open Terracotta on GitHub',
    detail: 'lxsmnsyc/terracotta',
    kind: 'action',
    page: '',
    body: 'github source repository code',
  },
];

/** What the palette shows before anything is typed. */
const START_SLUGS = ['guides/getting-started', 'guides/styling', 'components/dialog', 'states'];

function buildResults(pages: SearchPage[]): Result[] {
  const results: Result[] = [];
  for (const page of pages) {
    const href = `/${page.slug}`;
    results.push({
      key: href,
      title: page.title,
      detail: page.description.replace(/<[^>]+>/g, ''),
      kind: page.slug.startsWith('components/') ? 'component' : 'guide',
      page: href,
      body: `${page.section} ${page.description}`,
    });
    for (const heading of page.headings) {
      results.push({
        key: `${href}#${heading.id}`,
        title: heading.text,
        detail: heading.snippet ? `${page.title} · ${heading.snippet}` : page.title,
        kind: 'section',
        page: href,
        body: `${page.title} ${heading.snippet}`,
      });
    }
  }
  return results;
}

function termsOf(query: string): string[] {
  const terms: string[] = [];
  for (const term of query.toLowerCase().split(/\s+/)) {
    if (term) {
      terms.push(term);
    }
  }
  return terms;
}

/**
 * How well a text matches every term: most at the start of the text, then at
 * the start of a word, then anywhere. Zero if any term is missing.
 */
function scoreText(text: string, terms: string[]): number {
  const lower = text.toLowerCase();
  let score = 0;
  for (const term of terms) {
    const at = lower.indexOf(term);
    if (at === -1) {
      return 0;
    }
    if (at === 0) {
      score += 6;
    } else if (/[\s<#(/-]/.test(lower[at - 1] ?? '')) {
      score += 4;
    } else {
      score += 2;
    }
  }
  return score;
}

/** The title counts most, then everything else. A page edges out its sections. */
function scoreResult(result: Result, terms: string[]): number {
  const score =
    scoreText(result.title, terms) * 3 || scoreText(`${result.title} ${result.body}`, terms);
  if (score === 0) {
    return 0;
  }
  const exact = result.title.toLowerCase() === terms.join(' ') ? 20 : 0;
  return score + exact + (result.kind === 'section' ? 0 : 1);
}

const PER_GROUP = 6;
const PER_PAGE = 2;

/** The best matches of one kind, at most two sections from any one page. */
function bestOf(results: Result[], terms: string[]): { items: Result[]; top: number } {
  const scored: { result: Result; score: number }[] = [];
  for (const result of results) {
    const score = scoreResult(result, terms);
    if (score > 0) {
      scored.push({ result, score });
    }
  }
  scored.sort((a, b) => b.score - a.score);

  const items: Result[] = [];
  const perPage = new Map<string, number>();
  for (const { result } of scored) {
    const count = perPage.get(result.page) ?? 0;
    if (result.page && count === PER_PAGE) {
      continue;
    }
    perPage.set(result.page, count + 1);
    items.push(result);
    if (items.length === PER_GROUP) {
      break;
    }
  }
  return { items, top: scored[0]?.score ?? 0 };
}

const GROUPS: { title: string; kind: Kind }[] = [
  { title: 'Components', kind: 'component' },
  { title: 'Guides', kind: 'guide' },
  { title: 'Sections', kind: 'section' },
];

/** The groups to show for a query, the group with the best match first. */
function groupResults(results: Result[], query: string): Group[] {
  const terms = termsOf(query);
  if (terms.length === 0) {
    const start: Result[] = [];
    for (const slug of START_SLUGS) {
      const found = results.find((result) => result.key === `/${slug}`);
      if (found) {
        start.push(found);
      }
    }
    // Before the index arrives there is nothing to start from but actions.
    return start.length > 0
      ? [
          { title: 'Start here', items: start },
          { title: 'Actions', items: ACTIONS },
        ]
      : [{ title: 'Actions', items: ACTIONS }];
  }

  const ranked: { group: Group; top: number }[] = [];
  for (const entry of GROUPS) {
    const ofKind: Result[] = [];
    for (const result of results) {
      if (result.kind === entry.kind) {
        ofKind.push(result);
      }
    }
    const { items, top } = bestOf(ofKind, terms);
    if (items.length > 0) {
      ranked.push({ group: { title: entry.title, items }, top });
    }
  }
  ranked.sort((a, b) => b.top - a.top);

  const groups: Group[] = [];
  for (const entry of ranked) {
    groups.push(entry.group);
  }
  const actions = bestOf(ACTIONS, terms).items;
  if (actions.length > 0) {
    groups.push({ title: 'Actions', items: actions });
  }
  return groups;
}

const KIND_ICONS: Record<Kind, (props: { class?: string }) => JSX.Element> = {
  component: ComponentIcon,
  section: HashIcon,
  action: BoltIcon,
  guide: PageIcon,
};

function KindIcon(props: { kind: Kind }): JSX.Element {
  return KIND_ICONS[props.kind]({});
}

export interface SearchController {
  open: () => boolean;
  results: () => Result[];
  toggle: (next: boolean) => void;
  /** Starts loading the index. Safe to call more than once. */
  load: () => void;
}

/**
 * The state the search button and the palette share. The palette cannot live
 * beside the button: the masthead's `backdrop-filter` makes it the containing
 * block of anything `position: fixed` inside it, which would pin the overlay
 * to the masthead's height. So the layout creates this once and renders the
 * two halves in different places.
 */
export function createSearch(): SearchController {
  const [open, setOpen] = createSignal(false);
  const [results, setResults] = createSignal<Result[]>([]);
  let loading: Promise<void> | undefined;

  function load(): void {
    loading ??= import('virtual:search-index').then(
      (module) => {
        setResults(buildResults(module.pages));
      },
      () => {
        loading = undefined;
      },
    );
  }

  return {
    open,
    results,
    load,
    toggle(next) {
      if (next) {
        load();
      }
      setOpen(next);
    },
  };
}

/** The masthead button. ⌘K and Ctrl+K are registered by the `CommandBar`. */
export function SearchTrigger(props: { search: SearchController }): JSX.Element {
  // The server cannot know the platform, so the hint starts as the server
  // rendered it and steps to the right one after hydration, as a change.
  const [shortcut, setShortcut] = createSignal('Ctrl K');
  createEffect(
    () => true,
    () => {
      if (!isServer && /Mac|iPhone|iPad/.test(navigator.platform)) {
        setShortcut('⌘K');
      }
    },
  );

  return (
    <button
      type="button"
      class="control search-trigger"
      onClick={() => {
        props.search.toggle(true);
      }}
      onPointerEnter={props.search.load}
      onFocus={props.search.load}
    >
      <SearchIcon />
      <span class="search-trigger-label">Search</span>
      <kbd class="search-trigger-key">{shortcut()}</kbd>
    </button>
  );
}

/**
 * The palette: a `CommandBar` holding a `Command`, the same pair the
 * CommandBar page documents. Results are grouped and ranked here, and each
 * group is a `role="group"` inside the listbox. The `Command` does not need
 * to know about the groups: it finds its options anywhere below
 * `CommandOptions`.
 */
export function SearchPalette(props: { search: SearchController }): JSX.Element {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [, setScheme] = useColorScheme();
  const native = useNativeColorScheme();

  function run(result: Result): void {
    props.search.toggle(false);
    switch (result.key) {
      case 'action:theme': {
        const index = THEMES.findIndex((entry) => entry.id === theme());
        setTheme(THEMES[(index + 1) % THEMES.length]!.id);
        return;
      }
      case 'action:scheme':
        setScheme(native() === 'dark' ? 'light' : 'dark');
        return;
      case 'action:install':
        navigator.clipboard.writeText(INSTALL).catch(() => {
          // Clipboard access denied. The command is in the result's detail.
        });
        return;
      case 'action:github':
        window.open(REPO, '_blank', 'noreferrer');
        return;
      default:
        navigate(result.key);
    }
  }

  return (
    <CommandBar class="commandbar" isOpen={props.search.open()} onChange={props.search.toggle}>
      <CommandBarOverlay class="commandbar-overlay search-overlay" />
      <CommandBarPanel class="commandbar-panel search-panel">
        <CommandBarTitle class="visually-hidden">Search the documentation</CommandBarTitle>
        <CommandBarDescription class="visually-hidden">
          Type to find components, guides and sections, or run an action. Press Enter to go.
        </CommandBarDescription>

        <Command<Result>
          class="command search"
          defaultValue={undefined}
          by={(a, b) => a.key === b.key}
          // Grouping and ranking happen below, so every rendered option matches.
          matchBy={() => true}
          onChange={(result) => {
            if (result) {
              run(result);
            }
          }}
        >
          {(state) => {
            const groups = (): Group[] => groupResults(props.search.results(), state.query());

            // A new query replaces the options, and the one that was active may
            // be gone, so the best match becomes active and Enter goes there.
            createEffect(
              () => groups()[0]?.items[0],
              (first) => {
                if (first) {
                  state.focus(first);
                } else {
                  state.blur();
                }
              },
            );

            return (
              <>
                <CommandLabel class="visually-hidden">Search</CommandLabel>
                <div class="search-field">
                  <SearchIcon class="search-field-icon" />
                  <CommandInput
                    class="search-input"
                    placeholder="Search components, guides and sections…"
                  />
                  <kbd class="search-key">esc</kbd>
                </div>

                <CommandOptions as="div" class="search-options">
                  <For each={groups()}>
                    {(entry) => (
                      <div class="search-group" role="group" aria-label={entry.title}>
                        <div class="search-group-title" aria-hidden="true">
                          {entry.title}
                        </div>
                        <For each={entry.items}>
                          {(result) => (
                            <CommandOption as="div" class="search-option" value={result}>
                              <span class="search-option-icon" data-kind={result.kind}>
                                <KindIcon kind={result.kind} />
                              </span>
                              <span class="search-option-text">
                                <span class="search-option-title">{result.title}</span>
                                <Show when={result.detail}>
                                  <span class="search-option-detail">{result.detail}</span>
                                </Show>
                              </span>
                              <span class="search-option-enter" aria-hidden="true">
                                ↵
                              </span>
                            </CommandOption>
                          )}
                        </For>
                      </div>
                    )}
                  </For>
                </CommandOptions>

                <Show when={props.search.results().length > 0 && groups().length === 0}>
                  <p class="search-empty">
                    Nothing matches “{state.query()}”. Try a component such as “combo”, or an
                    attribute such as “tc-expanded”.
                  </p>
                </Show>

                <p class="search-foot" aria-hidden="true">
                  <span>
                    <kbd>↑</kbd>
                    <kbd>↓</kbd> move
                  </span>
                  <span>
                    <kbd>↵</kbd> open
                  </span>
                  <span>
                    <kbd>esc</kbd> close
                  </span>
                </p>
              </>
            );
          }}
        </Command>
      </CommandBarPanel>
    </CommandBar>
  );
}
