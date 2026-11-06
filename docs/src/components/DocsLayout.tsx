import { useLocation } from '@solidjs/router';
import type { JSX } from '@solidjs/web';
import { Show } from 'solid-js';
import { Disclosure, DisclosureButton, DisclosurePanel } from 'terracotta/disclosure';
import SchemePicker from './SchemePicker';
import Sidebar from './Sidebar';
import ThemePicker from './ThemePicker';
import { ChevronRightIcon } from '../lib/icons';

const REPO = 'https://github.com/lxsmnsyc/terracotta';

export default function DocsLayout(props: { children?: JSX.Element }): JSX.Element {
  // The landing page runs full width, without the sidebar.
  const location = useLocation();
  const docs = (): boolean => location.pathname !== '/';

  return (
    <div class="shell">
      <header class="masthead">
        <a class="brand" href="/">
          <span class="brand-mark" aria-hidden="true" />
          <span class="brand-name">Terracotta</span>
        </a>

        <nav class="masthead-nav" aria-label="Site">
          <a class="masthead-nav-link" href="/guides/getting-started">
            Docs
          </a>
          <a class="masthead-nav-link" href="/components/accordion">
            Components
          </a>
        </nav>

        <div class="masthead-actions">
          <ThemePicker />
          <SchemePicker />
          <a class="control masthead-link" href={REPO} rel="noreferrer">
            GitHub
          </a>
        </div>
      </header>

      <Show when={docs()} fallback={<main class="landing-main">{props.children}</main>}>
        {/* The mobile navigation is a `Disclosure`, the same component the
            Disclosure page documents, doing a real job rather than a demo one. */}
        <Disclosure class="mobile-nav" defaultOpen={false}>
          <DisclosureButton class="control mobile-nav-button">
            Menu
            <span class="mobile-nav-chevron" aria-hidden="true">
              <ChevronRightIcon />
            </span>
          </DisclosureButton>
          <DisclosurePanel class="mobile-nav-panel panel">
            <Sidebar />
          </DisclosurePanel>
        </Disclosure>

        <div class="layout">
          <aside class="sidebar">
            <Sidebar />
          </aside>
          <main class="content">{props.children}</main>
        </div>
      </Show>
    </div>
  );
}
