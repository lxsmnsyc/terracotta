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
    path: '/component/[target]',
    component: $lazy(import('./pages/component/[target]')),
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
