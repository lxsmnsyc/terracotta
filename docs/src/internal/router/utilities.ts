export function getLocationOrigin(): string {
  const { protocol, hostname, port } = window.location;
  return `${protocol}//${hostname}${port ? `:${port}` : ''}`;
}

export function isLocalURL(url: string): boolean {
  // prevent a hydration mismatch on href for url with anchor refs
  if (url.startsWith('/') || url.startsWith('#') || url.startsWith('?')) {
    return true;
  }
  try {
    // absolute urls can be local if they are on the same origin
    const locationOrigin = getLocationOrigin();
    const resolved = new URL(url, locationOrigin);
    return resolved.origin === locationOrigin;
  } catch (_) {
    return false;
  }
}

export function isModifiedEvent(event: MouseEvent): boolean {
  const { target } = event.currentTarget as HTMLAnchorElement;
  return (
    (target && target !== '_self')
    || event.metaKey
    || event.ctrlKey
    || event.shiftKey
    || event.altKey // triggers resource download
  );
}

export function normalizeURL(url: string): string {
  const locationOrigin = getLocationOrigin();
  const resolved = new URL(url, locationOrigin);
  return resolved.pathname;
}

export function omitProps<T extends Record<string, any>, K extends keyof T>(
  value: T,
  keys: K[],
): Omit<T, K> {
  const newObject = {};

  const currentKeys = Object.keys(value);

  for (let i = 0, len = currentKeys.length; i < len; i += 1) {
    const key = currentKeys[i];
    if (!keys.includes(key as K)) {
      Object.defineProperty(newObject, key, {
        get() {
          return value[key];
        },
        configurable: true,
        enumerable: true,
      });
    }
  }

  return newObject as Omit<T, K>;
}

export function pickProps<T extends Record<string, any>, K extends keyof T>(
  value: T,
  keys: K[],
): Pick<T, K> {
  const newObject = {};

  const currentKeys = Object.keys(value);

  for (let i = 0, len = currentKeys.length; i < len; i += 1) {
    const key = currentKeys[i];
    if (keys.includes(key as K)) {
      Object.defineProperty(newObject, key, {
        get() {
          return value[key];
        },
        configurable: true,
        enumerable: true,
      });
    }
  }

  return newObject as Pick<T, K>;
}
