export const DATA_SET_NAMESPACE = 'tc';

export const TYPE_ATTRIBUTE = `${DATA_SET_NAMESPACE}-type`;

export const DISABLED_NODE = `[${DATA_SET_NAMESPACE}-disabled="true"]`;
export const SELECTED_NODE = `[${DATA_SET_NAMESPACE}-selected="true"]`;
export const CHECKED_NODE = `[${DATA_SET_NAMESPACE}-checked="true"]`;

export function createTag(tag: string) {
  return {
    [TYPE_ATTRIBUTE]: tag,
  };
}
