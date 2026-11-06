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

interface Result {
  key: string;
  href: string;
  title: string;
  /** Where the result sits: its section for a page, its page for a heading. */
  context: string;
  /** Everything the query is matched against, lowercased once. */
  haystack: string;
  heading: boolean;
}

function buildResults(pages: SearchPage[]): Result[] {
  const results: Result[] = [];
  // Pages first, then headings. The palette keeps this order, so an exact
  // page name always sits above the sections that mention it.
  for (const page of pages) {
    results.push({
      key: page.slug,
      href: `/${page.slug}`,
      title: page.title,
      context: page.section,
      haystack: `${page.title} ${page.section} ${page.description}`.toLowerCase(),
      heading: false,
    });
  }
  for (const page of pages) {
    for (const heading of page.headings) {
      results.push({
        key: `${page.slug}#${heading.id}`,
        href: `/${page.slug}#${heading.id}`,
        title: heading.text,
        context: page.title,
        haystack: `${heading.text} ${page.title}`.toLowerCase(),
        heading: true,
      });
    }
  }
  return results;
}

/** Every word of the query has to appear. With no query, only pages show. */
function matches(result: Result, query: string): boolean {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) {
    return !result.heading;
  }
  for (const word of words) {
    if (!result.haystack.includes(word)) {
      return false;
    }
  }
  return true;
}

/**
 * Lower is better. A title that starts with the query beats one that contains
 * it, which beats a match found only in the lede, and a page beats a heading
 * at the same rank.
 */
function scoreFor(result: Result, query: string): number {
  const title = result.title.toLowerCase();
  const needle = query.trim().toLowerCase();
  let score = 3;
  if (title === needle) {
    score = 0;
  } else if (title.startsWith(needle)) {
    score = 1;
  } else if (title.includes(needle)) {
    score = 2;
  }
  return score * 2 + (result.heading ? 1 : 0);
}

const LIMIT = 40;

/** The matching results, best first, capped so the list stays short. */
function rank(results: Result[], query: string): Result[] {
  const scored: { result: Result; score: number; order: number }[] = [];
  let order = 0;
  for (const result of results) {
    if (matches(result, query)) {
      scored.push({ result, score: scoreFor(result, query), order });
    }
    order += 1;
  }
  scored.sort((a, b) => a.score - b.score || a.order - b.order);
  const ranked: Result[] = [];
  for (const entry of scored.slice(0, LIMIT)) {
    ranked.push(entry.result);
  }
  return ranked;
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
      <svg class="icon" viewBox="0 0 16 16" width="1em" height="1em" aria-hidden="true">
        <circle cx="7" cy="7" r="4.5" fill="none" stroke="currentColor" stroke-width="1.75" />
        <path
          d="M10.5 10.5L14 14"
          stroke="currentColor"
          stroke-width="1.75"
          stroke-linecap="round"
        />
      </svg>
      <span class="search-trigger-label">Search</span>
      <kbd class="search-trigger-key">{shortcut()}</kbd>
    </button>
  );
}

/**
 * The palette: a `CommandBar` holding a `Command`, the same pair the
 * CommandBar page documents. Results are ranked here and rendered in order,
 * so the `Command` only ever holds options that match. The index loads the
 * first time the palette opens.
 */
export function SearchPalette(props: { search: SearchController }): JSX.Element {
  const navigate = useNavigate();

  return (
    <CommandBar class="commandbar" isOpen={props.search.open()} onChange={props.search.toggle}>
      <CommandBarOverlay class="commandbar-overlay" />
      <CommandBarPanel class="commandbar-panel search-panel">
        <CommandBarTitle class="visually-hidden">Search the documentation</CommandBarTitle>
        <CommandBarDescription class="visually-hidden">
          Type to filter pages and sections, then press Enter to go there.
        </CommandBarDescription>

        <Command<Result>
          class="command search"
          defaultValue={undefined}
          by={(a, b) => a.key === b.key}
          matchBy={matches}
          onChange={(result) => {
            if (result) {
              props.search.toggle(false);
              navigate(result.href);
            }
          }}
        >
          {(state) => (
            <>
              <CommandLabel class="visually-hidden">Search</CommandLabel>
              <CommandInput
                class="command-input search-input"
                placeholder="Search components, guides and sections…"
              />
              <CommandOptions class="command-options search-options">
                <For each={rank(props.search.results(), state.query())}>
                  {(result) => (
                    <CommandOption class="command-option search-option" value={result}>
                      <span class="search-option-kind" aria-hidden="true">
                        {result.heading ? '#' : '◆'}
                      </span>
                      <span class="search-option-title">{result.title}</span>
                      <span class="search-option-context">{result.context}</span>
                    </CommandOption>
                  )}
                </For>
              </CommandOptions>
              <Show
                when={
                  props.search.results().length > 0 &&
                  rank(props.search.results(), state.query()).length === 0
                }
              >
                <p class="search-empty">Nothing matches “{state.query()}”.</p>
              </Show>
              <p class="search-foot" aria-hidden="true">
                <span>
                  <kbd>↑</kbd> <kbd>↓</kbd> to move
                </span>
                <span>
                  <kbd>Enter</kbd> to open
                </span>
                <span>
                  <kbd>Esc</kbd> to close
                </span>
              </p>
            </>
          )}
        </Command>
      </CommandBarPanel>
    </CommandBar>
  );
}
