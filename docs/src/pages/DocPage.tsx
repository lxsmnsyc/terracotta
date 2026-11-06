import { query, useParams } from '@solidjs/router';
import { type JSX, Loading, useHead } from '@solidjs/web';
import { Show, createMemo } from 'solid-js';
import { pages, sections } from 'virtual:content';
import Demo from '../components/Demo';
import Prose from '../components/Prose';
import TableOfContents from '../components/TableOfContents';
import type { DocModule } from '../lib/content-types';
import type { NavEntry } from 'virtual:content';

export const loadDoc = query(async (slug: string): Promise<DocModule | null> => {
  const loader = pages[slug];
  return loader ? (await loader()).default : null;
}, 'doc');

/**
 * Head tags are read from the build-time content index, not from the page
 * module. The module loads asynchronously, and a `<title>` registered after the
 * SSR shell has flushed never reaches `<head>`; the index is synchronous.
 */
function metaFor(slug: string): NavEntry | undefined {
  for (const section of sections) {
    const entry = section.entries.find((candidate) => candidate.slug === slug);
    if (entry) {
      return entry;
    }
  }
  return undefined;
}

function NotFound(props: { slug: string }): JSX.Element {
  return (
    <article class="page page-missing">
      <h1>Page not found</h1>
      <p>
        There is no document at <code>/{props.slug}</code>.
      </p>
      <p>
        <a href="/">Back to the introduction</a>
      </p>
    </article>
  );
}

export default function DocPage(): JSX.Element {
  const params = useParams<{ slug: string }>();
  const doc = createMemo(() => loadDoc(params.slug));
  const meta = createMemo(() => metaFor(params.slug));

  useHead(() => {
    const entry = meta();
    return entry
      ? [
          { tag: 'title' as const, props: { children: `${entry.title} · Terracotta` } },
          { tag: 'meta' as const, props: { name: 'description', content: entry.description } },
        ]
      : [{ tag: 'title' as const, props: { children: 'Not found · Terracotta' } }];
  });

  return (
    <Loading fallback={<div class="page-loading">Loading…</div>}>
      <Show when={doc()} fallback={<NotFound slug={params.slug} />}>
        {(page) => (
          <div class="page-grid">
            <article class="page">
              <header class="page-header">
                <h1 class="page-title">{page().title}</h1>
                <Show when={page().description}>
                  <p class="page-lede" innerHTML={page().description} />
                </Show>
              </header>

              {/* The component itself, before any prose about it. */}
              <Show when={page().hero}>
                {(hero) => (
                  <Demo
                    id={hero().id}
                    title={hero().title}
                    code={hero().code}
                    caption={hero().caption}
                  />
                )}
              </Show>

              <Prose blocks={page().blocks} />
            </article>
            <TableOfContents headings={page().headings} />
          </div>
        )}
      </Show>
    </Loading>
  );
}
