import { createRouter } from '@solidjs/router';
import DocsLayout from './components/DocsLayout';
import DemoHost from './pages/DemoHost';
import DocPage, { loadDoc } from './pages/DocPage';
import Home from './pages/Home';

/**
 * The route components are imported eagerly rather than through `lazy`. A lazy
 * route only hydrates if its chunk was preloaded before the client resumes, and
 * nothing in this setup declares the matched route's module to the build
 * manifest. A lazy route therefore throws during hydration and the whole site
 * falls back to static HTML: no client-side navigation, no theme switching, no
 * messaging into the demo frames.
 *
 * Nothing is lost by it. The weight of this site is in the page content and the
 * demos, and both of those still load on demand: `virtual:content` and
 * `virtual:demo-registry` hand out dynamic imports, so a page's prose and its
 * examples remain their own chunks.
 *
 * `/demo/*` is deliberately a sibling of the docs tree rather than a child of
 * it: a demo document carries no header, no sidebar and no page padding, so it
 * can be framed at its own natural size.
 */
export const Router = createRouter({
  routes: [
    { path: '/demo/*id', component: DemoHost },
    {
      path: '/',
      component: DocsLayout,
      children: [
        { path: '/', component: Home },
        {
          path: '/*slug',
          component: DocPage,
          // Starts the page load as the route renders. On the server it also
          // fills the query cache the client hydrates from, so the first
          // render on both sides sees the same, already-resolved page.
          preload: ({ params }) => {
            loadDoc(params.slug ?? '').catch(() => {
              // The page component reports the failure; the preload only warms.
            });
          },
        },
      ],
    },
  ],
});

export const { paths } = Router;
