export const DATA_SET_NAMESPACE = 'tc';

export const TYPE_ATTRIBUTE = `${DATA_SET_NAMESPACE}-type` as const;

export const DISABLED_NODE = `[${DATA_SET_NAMESPACE}-disabled]`;
export const SELECTED_NODE = `[${DATA_SET_NAMESPACE}-selected]`;
export const CHECKED_NODE = `[${DATA_SET_NAMESPACE}-checked]`;
export const MATCHES_NODE = `[${DATA_SET_NAMESPACE}-matches]`;

type TerracottaTag = {
  [key in typeof TYPE_ATTRIBUTE]: string;
};

export function createTag(tag: string): TerracottaTag {
  return {
    [TYPE_ATTRIBUTE]: tag,
  };
}
