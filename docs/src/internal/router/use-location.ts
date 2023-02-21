import { createSignal, createEffect, onCleanup } from 'solid-js';
import { isServer } from 'solid-js/web';
import { isLocalURL, normalizeURL } from './utilities';
import { matchRoute, PageRouter } from './router-node';

// https://github.com/GoogleChromeLabs/quicklink/blob/master/src/prefetch.mjs
function hasPrefetch(): boolean {
  const link = document.createElement('link');
  return link.relList && link.relList.supports && link.relList.supports('prefetch');
}

function viaDOM(url: string): Promise<void> {
  return new Promise<void>((res, rej) => {
    if (!document.querySelector(`link[rel="prefetch"][href="${url}"][as="fetch"]`)) {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.as = 'document';
      link.onload = () => res();
      link.onerror = rej;
      link.href = url;

      document.head.appendChild(link);
    } else {
      res();
    }
  });
}

function viaXHR(url: string): Promise<void> {
  return new Promise((res, rej) => {
    const req = new XMLHttpRequest();

    req.withCredentials = true;
    req.open('GET', url, true);

    req.onload = () => {
      if (req.status === 200) {
        res();
      } else {
        rej();
      }
    };

    req.send();
  });
}

async function priority(url: string): Promise<void> {
  // TODO: Investigate using preload for high-priority
  // fetches. May have to sniff file-extension to provide
  // valid 'as' values. In the future, we may be able to
  // use Priority Hints here.
  //
  // As of 2018, fetch() is high-priority in Chrome
  // and medium-priority in Safari.
  if ('fetch' in window) {
    await fetch(url, { credentials: 'include' });
  } else {
    await viaXHR(url);
  }
}

const links = new Set<string>();

async function prefetch(url: string, isPriority = false): Promise<void> {
  if (!links.has(url)) {
    links.add(url);
    if (isPriority) {
      await priority(url);
    } else if (hasPrefetch()) {
      try {
        await viaDOM(url);
      } catch (error) {
        await viaXHR(url);
      }
    } else {
      await viaXHR(url);
    }
  }
}

export interface UseLocationOptions {
  pathname: string;
  search: string;
}

interface LocationPushOptions {
  scroll: ScrollBehavior;
}

export interface UseLocation {
  pathname: string;
  search: string;
  push: (url: string, options?: Partial<LocationPushOptions>) => void;
  replace: (url: string, options?: Partial<LocationPushOptions>) => void;
  prefetch: (url: string, isPriority?: boolean) => Promise<void>;
  back: (opts?: Partial<LocationPushOptions>) => void;
  forward: (opts?: Partial<LocationPushOptions>) => void;
  reload: () => void;
}

function noop() {
  // no-op
}

export default function useLocation(
  routes: () => PageRouter,
  options?: Partial<UseLocationOptions>,
): UseLocation {
  if (isServer) {
    return {
      pathname: options?.pathname ?? '',
      search: options?.search ?? '',
      push: noop,
      replace: noop,
      prefetch: noop as unknown as UseLocation['prefetch'],
      back: noop,
      forward: noop,
      reload: noop,
    };
  }
  const [pathname, setPathname] = createSignal(window.location.pathname);
  const [search, setSearch] = createSignal(window.location.search);

  function updateLocation() {
    setPathname(window.location.pathname);
    setSearch(window.location.search);
  }

  createEffect(() => {
    window.addEventListener('popstate', updateLocation);
    onCleanup(() => {
      window.removeEventListener('popstate', updateLocation);
    });
  });

  function applyLocationUpdate(opts?: Partial<LocationPushOptions>) {
    updateLocation();
    const behavior = opts && 'scroll' in opts ? opts.scroll : 'auto';
    if (behavior) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior,
      });
    }
  }

  function push(url: string, opts?: Partial<LocationPushOptions>) {
    window.history.pushState(null, '', url);
    applyLocationUpdate(opts);
  }

  function replace(url: string, opts?: Partial<LocationPushOptions>) {
    window.history.replaceState(null, '', url);
    applyLocationUpdate(opts);
  }

  function back(opts?: Partial<LocationPushOptions>) {
    window.history.back();
    applyLocationUpdate(opts);
  }

  function forward(opts?: Partial<LocationPushOptions>) {
    window.history.forward();
    applyLocationUpdate(opts);
  }

  function reload() {
    window.location.reload();
  }

  return {
    get pathname() {
      return pathname();
    },
    get search() {
      return search();
    },
    push,
    replace,
    async prefetch(url, isPriority) {
      if (isLocalURL(url)) {
        const matchedNode = matchRoute(routes(), normalizeURL(url));
        if (matchedNode && matchedNode.value && matchedNode.value.preload) {
          await matchedNode.value.preload();
        }
      }
      return prefetch(url, isPriority);
    },
    back,
    forward,
    reload,
  };
}
