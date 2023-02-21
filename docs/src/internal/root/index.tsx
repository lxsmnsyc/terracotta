import {
  createContext,
  JSX,
  onMount,
  Show,
  useContext,
} from 'solid-js';
import useMeta from '../meta/use-meta';
import {
  createRouterTree,
  Load,
  LoadResult,
  matchRoute,
  Page,
  PageProps,
  Router,
  useFallback,
  useRouter,
} from '../router';
import { CacheBoundary, useCache } from './cache';

const Data = createContext<{ initial: boolean }>();

function createPage<P>(
  Comp: Page<P>,
): Page<P> {
  return function CustomPage(props: PageProps<P>) {
    const ctx = useContext(Data)!;
    const router = useRouter();
    const yieldFallback = useFallback();
    const data = useCache(
      () => props.path,
      ctx.initial
        ? { initialData: props.data as LoadResult<P>, hydrate: true }
        : { shouldRevalidate: true },
    );

    onMount(() => {
      ctx.initial = false;
    });

    return (
      <Show when={data()} keyed>
        {(loaded) => {
          if ('redirect' in loaded) {
            router.push(loaded.redirect);
            return null;
          }
          if ('notFound' in loaded) {
            yieldFallback();
            return null;
          }
          if (!ctx.initial) {
            useMeta(loaded);
          }
          return (
            <Comp path={props.path} isLayout={props.isLayout} data={loaded.props}>
              {props.children}
            </Comp>
          );
        }}
      </Show>
    );
  };
}

function normalizeRoute(path: string, offset: number): string {
  const base = path.substring(offset, path.length - 4);
  if (base.endsWith('/index')) {
    if (base === '/index') {
      return '/';
    }
    return base.substring(0, base.length - 6);
  }
  return base;
}

export interface LoaderConfig {
  routes: {
    path: string;
    imports: Record<string, Load>;
  };
}

export interface RendererConfig {
  routes: {
    path: string;
    imports: Record<string, () => JSX.Element>;
  };
  pages: {
    404: () => JSX.Element;
  };
}

export function defineLoaderRouter(config: LoaderConfig) {
  const offset = config.routes.path.length;
  const rawLoaders = Object.entries(config.routes.imports)
    .map(([key, value]) => ({
      path: normalizeRoute(key, offset),
      value,
    }));

  const loaders = createRouterTree(rawLoaders);

  return (url: URL) => matchRoute(loaders, url.pathname);
}

export interface RouterProps<T> {
  data: LoadResult<T>[];
  pathname: string;
  search: string;
}

export function definePageRouter(config: RendererConfig) {
  const offset = config.routes.path.length;
  const rawPages = Object.entries(config.routes.imports)
    .map(([key, value]) => ({
      path: normalizeRoute(key, offset),
      value: createPage(value),
    }));

  const pages = createRouterTree(rawPages);

  return function Renderer<T>(props: RouterProps<T>) {
    return (
      <CacheBoundary>
        <Data.Provider value={{ initial: true }}>
          <Router
            routes={pages}
            data={props.data}
            location={{
              pathname: props.pathname,
              search: props.search,
            }}
            fallback={config.pages[404]}
          />
        </Data.Provider>
      </CacheBoundary>
    );
  };
}
