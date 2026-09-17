import type { JSX } from '@solidjs/web';
import { For, Show } from 'solid-js';
import type { DocHeading } from '../lib/content-types';

export default function TableOfContents(props: { headings: DocHeading[] }): JSX.Element {
  return (
    <Show when={props.headings.length > 1}>
      <nav class="toc" aria-label="On this page">
        <h2 class="toc-title">On this page</h2>
        <ul class="toc-list">
          <For each={props.headings}>
            {(heading) => (
              <li class="toc-item" data-level={heading.level}>
                <a class="toc-link" href={`#${heading.id}`}>
                  {heading.text}
                </a>
              </li>
            )}
          </For>
        </ul>
      </nav>
    </Show>
  );
}
