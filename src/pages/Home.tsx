import { type JSX, useHead } from '@solidjs/web';
import { For } from 'solid-js';
import { sections } from 'virtual:content';
import Demo from '../components/Demo';
import {
  code as showcaseCode,
  id as showcaseId,
  title as showcaseTitle,
} from 'virtual:demo-source/disclosure/basic';

export default function Home(): JSX.Element {
  useHead(() => [
    { tag: 'title' as const, props: { children: 'Terracotta · Headless UI for SolidJS' } },
    {
      tag: 'meta' as const,
      props: {
        name: 'description',
        content:
          'Terracotta is a headless UI library for SolidJS: behaviour, keyboard handling and ARIA wiring, with no styles of its own.',
      },
    },
  ]);

  return (
    <div class="home">
      <section class="hero">
        <h1 class="hero-title">Behaviour, not decoration.</h1>
        <p class="hero-lede">
          Terracotta gives SolidJS the accessible half of a component library — state, keyboard
          handling and ARIA wiring — and leaves every pixel to you. It reports what it is doing
          through <code>tc-</code> attributes and never touches your <code>class</code>.
        </p>

        <div class="hero-actions">
          <a class="control control-primary" href="/guides/getting-started">
            Get started
          </a>
          <a class="control" href="/components/disclosure">
            Browse components
          </a>
        </div>

        <pre class="hero-install">
          <code>pnpm add terracotta@next</code>
        </pre>
      </section>

      <section class="pitch">
        <h2 class="pitch-title">Change the theme. Watch the markup stay put.</h2>
        <p class="pitch-body">
          Every demo on this site runs in its own document, and every one of them is wearing the
          theme you picked in the header. Switch it and nothing about the components changes — only
          the stylesheet reading their state attributes does. That is the entire argument for
          headless components, and you can run it yourself right here.
        </p>

        <Demo id={showcaseId} title={showcaseTitle} code={showcaseCode} caption="" />
      </section>

      <section class="index" id="components">
        <For each={sections}>
          {(section) => (
            <div class="index-section">
              <h2 class="index-title">{section.title}</h2>
              <ul class="index-list">
                <For each={section.entries}>
                  {(entry) => (
                    <li>
                      <a class="index-link" href={`/${entry.slug}`}>
                        {entry.title}
                      </a>
                    </li>
                  )}
                </For>
              </ul>
            </div>
          )}
        </For>
      </section>
    </div>
  );
}
