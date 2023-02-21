import { JSX } from 'solid-js';
import assert from '../assert';
import { Meta } from '../meta/interface';

export interface RouterParams {
  [key: string]: string | string[];
}

export interface RouterNode<T> {
  key: string;
  value?: T;
  normal: Record<string, RouterNode<T>>;
  glob?: RouterNode<T>;
  named?: RouterNode<T>;
}

function createRouterNode<T>(key: string, value?: T): RouterNode<T> {
  return {
    key,
    value,
    normal: {},
  };
}

function addRoute<T>(
  parent: RouterNode<T>,
  path: string[],
  value: T,
) {
  let node = parent;
  let paths = '';
  for (let i = 0, len = path.length; i < len; i += 1) {
    const current = path[i];
    if (i !== 0) {
      paths += `/${current}`;
    }
    if (/^\[\.\.\.[a-zA-Z0-9]+\]$/.test(current)) {
      const key = current.substring(4, current.length - 1);
      let matched = node.glob;
      assert(!(matched && matched.key !== key && matched.value), new Error(`Conflicting glob path at ${paths}`));
      if (!matched) {
        matched = createRouterNode(key, i === len - 1 ? value : undefined);
        node.glob = matched;
      } else if (i === len - 1) {
        matched.value = value;
      }
      node = matched;
    } else if (/^\[[a-zA-Z0-9]+\]$/.test(current)) {
      const key = current.substring(1, current.length - 1);
      let matched = node.named;
      assert(!(matched && matched.key !== key && matched.value), new Error(`Conflicting named path at ${paths}`));
      if (!matched) {
        matched = createRouterNode(key, i === len - 1 ? value : undefined);
        node.named = matched;
      } else if (i === len - 1) {
        matched.value = value;
      }
      node = matched;
    } else {
      let matched = node.normal[current];
      assert(!(matched && i === len - 1 && matched.value), new Error(`Conflicting path at ${paths}`));
      if (!matched) {
        matched = createRouterNode(current, i === len - 1 ? value : undefined);
        node.normal[current] = matched;
      } else if (i === len - 1) {
        matched.value = value;
      }
      node = matched;
    }
  }
}

export function normalizePath(route: string): string {
  return route.endsWith('/')
    ? route.substring(0, route.length - 1)
    : route;
}

export interface Route<T> {
  path: string;
  value: T;
}

export function createRouterTree<T>(routes: Route<T>[]): RouterNode<T> {
  const root = createRouterNode<T>('');

  for (let i = 0, len = routes.length; i < len; i += 1) {
    const route = routes[i];
    addRoute(root, normalizePath(route.path).split('/'), route.value);
  }

  return root;
}

export interface RouterResult<T> {
  value?: T;
  path: string;
  params: RouterParams;
}

export function matchRoute<T>(root: RouterNode<T>, path: string): RouterResult<T>[] {
  const params: RouterParams = {};
  const results: RouterResult<T>[] = [];
  const paths = normalizePath(path).split('/');
  let node = root;

  for (let i = 0, len = paths.length; i < len; i += 1) {
    const current = paths[i];
    if (current in node.normal) {
      node = node.normal[current];
      const result = i === 0 ? '/' : paths.slice(0, i + 1).join('/');
      results.push({
        value: node.value,
        path: result,
        params: { ...params },
      });
    } else if (node.named) {
      node = node.named;
      params[node.key] = current;
      const result = i === 0 ? '/' : paths.slice(0, i + 1).join('/');
      results.push({
        value: node.value,
        path: result,
        params: { ...params },
      });
    } else if (node.glob) {
      node = node.glob;
      params[node.key] = paths.slice(i);
      results.push({
        value: node.value,
        path: paths.join('/'),
        params: { ...params },
      });
      break;
    } else {
      return [];
    }
  }

  return results;
}

export interface PageProps<P> {
  path: string;
  isLayout: boolean;
  data: P;
  children?: JSX.Element;
}

export interface Page<P> {
  (props: PageProps<P>): JSX.Element;
}

export type PageRoute = Route<Page<any>>;
export type PageRouter = RouterNode<Page<any>>;

export interface SuccessResult<T> {
  props: T;
  meta?: Meta;
}

export interface NotFoundResult {
  notFound: true;
}

export interface RedirectResult {
  redirect: string;
}

export type LoadResult<T> =
  | SuccessResult<T>
  | NotFoundResult
  | RedirectResult;

export type Load = <T, P extends RouterParams>(
  request: Request,
  params: P,
) => (Promise<LoadResult<T>>);
export type LoadRoute = Route<Load>;
export type LoadRouter = RouterNode<Load>;

export interface SSRPage {
  default: Page<any>;
  load?: Load;
}

export function createPage<P>(page: Page<P>): Page<P> {
  return page;
}
