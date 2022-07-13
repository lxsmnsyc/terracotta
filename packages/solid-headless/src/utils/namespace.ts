export const DATA_SET_NAMESPACE = 'data-sh';

export function createTag(tag: string) {
  return {
    [DATA_SET_NAMESPACE]: tag,
  };
}
