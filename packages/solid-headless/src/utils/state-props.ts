interface DisabledProps {
  disabled?: boolean;
  'aria-disabled'?: boolean;
  'data-sh-disabled'?: boolean;
}

export function createDisabled(
  disabled: () => boolean | undefined,
): DisabledProps {
  return {
    get disabled() {
      return disabled();
    },
    get 'aria-disabled'() {
      return disabled();
    },
    get 'data-sh-disabled'() {
      return disabled();
    },
  };
}

interface ExpandedProps {
  'aria-expanded'?: boolean;
  'data-sh-expanded'?: boolean;
}

export function createExpanded(
  expanded: () => boolean | undefined,
): ExpandedProps {
  return {
    get 'aria-expanded'() {
      return expanded();
    },
    get 'data-sh-expanded'() {
      return expanded();
    },
  };
}
