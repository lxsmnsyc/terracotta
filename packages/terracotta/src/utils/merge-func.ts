export function mergeFunc(
  ...args: ((() => void) | false | undefined)[]
): () => void {
  return () => {
    for (
      let i = 0, len = args.length, current: (() => void) | false | undefined;
      i < len;
      i++
    ) {
      current = args[i];
      if (current) {
        current();
      }
    }
  };
}
