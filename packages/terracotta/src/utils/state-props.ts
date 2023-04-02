interface DisabledProps {
  disabled?: boolean;
  'aria-disabled'?: boolean;
  'data-tc-disabled'?: boolean;
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
    get 'data-tc-disabled'() {
      return disabled();
    },
  };
}

interface ExpandedProps {
  'aria-expanded'?: boolean;
  'data-tc-expanded'?: boolean;
}

export function createExpanded(
  expanded: () => boolean | undefined,
): ExpandedProps {
  return {
    get 'aria-expanded'() {
      return expanded();
    },
    get 'data-tc-expanded'() {
      return expanded();
    },
  };
}

interface CheckedProps {
  'aria-checked': boolean | 'mixed';
  'data-tc-checked': boolean | 'mixed';
}

export function createChecked(
  checked: () => boolean | undefined,
): CheckedProps {
  return {
    get 'aria-checked'() {
      return checked() ?? 'mixed';
    },
    get 'data-tc-checked'() {
      return checked() ?? 'mixed';
    },
  };
}

interface SelectedProps {
  'aria-selected': boolean;
  'data-tc-selected': boolean;
}

export function createSelected(
  checked: () => boolean,
): SelectedProps {
  return {
    get 'aria-selected'() {
      return checked();
    },
    get 'data-tc-selected'() {
      return checked();
    },
  };
}

interface ActiveProps {
  'data-tc-active': boolean;
}

export function createActive(
  checked: () => boolean,
): ActiveProps {
  return {
    get 'data-tc-active'() {
      return checked();
    },
  };
}