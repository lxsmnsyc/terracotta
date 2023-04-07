export const DATA_SET_NAMESPACE = 'tc';

export const TYPE_ATTRIBUTE = `${DATA_SET_NAMESPACE}-type`;

export const DISABLED_NODE = `[${DATA_SET_NAMESPACE}-disabled]`;
export const SELECTED_NODE = `[${DATA_SET_NAMESPACE}-selected]`;
export const CHECKED_NODE = `[${DATA_SET_NAMESPACE}-checked]`;
export const MATCHES_NODE = `[${DATA_SET_NAMESPACE}-matches]`;

export function createTag(tag: string) {
  return {
    [TYPE_ATTRIBUTE]: tag,
  };
}
