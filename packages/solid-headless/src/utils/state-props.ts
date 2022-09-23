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

interface CheckedProps {
  'aria-checked': boolean | 'mixed';
  'data-sh-checked': boolean | 'mixed';
}

export function createChecked(
  checked: () => boolean | undefined,
): CheckedProps {
  return {
    get 'aria-checked'() {
      return checked() ?? 'mixed';
    },
    get 'data-sh-checked'() {
      return checked() ?? 'mixed';
    },
  };
}

interface SelectedProps {
  'aria-selected': boolean;
  'data-sh-selected': boolean;
}

export function createSelected(
  checked: () => boolean,
): SelectedProps {
  return {
    get 'aria-selected'() {
      return checked();
    },
    get 'data-sh-selected'() {
      return checked();
    },
  };
}

interface ActiveProps {
  'data-sh-active': boolean;
}

export function createActive(
  checked: () => boolean,
): ActiveProps {
  return {
    get 'data-sh-active'() {
      return checked();
    },
  };
}
