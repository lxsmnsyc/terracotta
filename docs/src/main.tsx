import { render } from 'solid-js/web';
import { createRouterTree, Router } from 'solid-tiny-router';

import './main.css';

const routes = createRouterTree([
  {
    path: '/',
    component: $lazy(import('./pages')),
  },
  {
    path: '/preview/[example]',
    component: $lazy(import('./pages/preview/[example]')),
  },
  {
    path: '/component/dialog',
    component: $lazy(import('./pages/component/dialog')),
  },
  {
    path: '/component/toaster',
    component: $lazy(import('./pages/component/toaster')),
  },
]);

const root = document.getElementById('app');

if (root) {
  render(
    () => (
      <Router
        routes={routes}
      />
    ),
    root,
  );
}
