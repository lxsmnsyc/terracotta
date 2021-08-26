export function excludeProps<T extends Record<string, any>, K extends keyof T>(
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
        enumerable: true,
      });
    }
  }

  return newObject as Pick<T, K>;
}
