import type { JSX } from '@solidjs/web';
import { Disclosure, DisclosureButton, DisclosurePanel } from 'terracotta/disclosure';
import SchemePicker from './SchemePicker';
import Sidebar from './Sidebar';
import ThemePicker from './ThemePicker';

const REPO = 'https://github.com/lxsmnsyc/terracotta';

export default function DocsLayout(props: { children?: JSX.Element }): JSX.Element {
  return (
    <div class="shell">
      <header class="masthead">
        <a class="brand" href="/">
          <span class="brand-mark" aria-hidden="true" />
          <span class="brand-name">Terracotta</span>
        </a>

        <div class="masthead-actions">
          <ThemePicker />
          <SchemePicker />
          <a class="control masthead-link" href={REPO} rel="noreferrer">
            GitHub
          </a>
        </div>
      </header>

      {/* The mobile navigation is a `Disclosure`, the same component the
          Disclosure page documents, doing a real job rather than a demo one. */}
      <Disclosure class="mobile-nav" defaultOpen={false}>
        <DisclosureButton class="control mobile-nav-button">
          Menu
          <span class="mobile-nav-chevron" aria-hidden="true">
            ▸
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
    </div>
  );
}
