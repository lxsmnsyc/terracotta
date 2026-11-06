import { useLocation } from '@solidjs/router';
import type { JSX } from '@solidjs/web';
import { For } from 'solid-js';
import { sections } from 'virtual:content';

export default function Sidebar(): JSX.Element {
  const location = useLocation();

  return (
    <nav class="sidebar-nav" aria-label="Documentation">
      <For each={sections}>
        {(section) => (
          <section class="sidebar-section">
            <h2 class="sidebar-section-title">{section.title}</h2>
            <ul class="sidebar-list">
              <For each={section.entries}>
                {(entry) => {
                  const href = `/${entry.slug}`;
                  return (
                    <li>
                      <a
                        class="sidebar-link"
                        href={href}
                        aria-current={location.pathname === href ? 'page' : undefined}
                      >
                        {entry.title}
                      </a>
                    </li>
                  );
                }}
              </For>
            </ul>
          </section>
        )}
      </For>
    </nav>
  );
}
