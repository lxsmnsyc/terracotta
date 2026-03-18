export function mergeFunc(...args: (() => void)[]): () => void {
  return () => {
    for (let i = 0, len = args.length; i < len; i++) {
      args[i]();
    }
  };
}
