interface DisabledProps {
  disabled?: boolean;
  'aria-disabled'?: boolean;
  'tc-disabled'?: boolean;
}

export function createDisabledState(
  disabled: () => boolean | undefined,
): DisabledProps {
  return {
    get disabled() {
      return disabled();
    },
    get 'aria-disabled'() {
      return disabled();
    },
    get 'tc-disabled'() {
      return disabled();
    },
  };
}

interface ExpandedProps {
  'aria-expanded'?: boolean;
  'tc-expanded'?: boolean;
}

export function createExpandedState(
  expanded: () => boolean | undefined,
): ExpandedProps {
  return {
    get 'aria-expanded'() {
      return expanded();
    },
    get 'tc-expanded'() {
      return expanded();
    },
  };
}

interface CheckedProps {
  'aria-checked': boolean | 'mixed';
  'tc-checked': boolean | 'mixed';
}

export function createCheckedState(
  checked: () => boolean | undefined,
): CheckedProps {
  return {
    get 'aria-checked'() {
      return checked() ?? 'mixed';
    },
    get 'tc-checked'() {
      return checked() ?? 'mixed';
    },
  };
}

interface SelectedProps {
  'aria-selected': boolean;
  'tc-selected': boolean;
}

export function createSelectedState(
  checked: () => boolean,
): SelectedProps {
  return {
    get 'aria-selected'() {
      return checked();
    },
    get 'tc-selected'() {
      return checked();
    },
  };
}

interface ActiveProps {
  'tc-active': boolean;
}

export function createActiveState(
  checked: () => boolean,
): ActiveProps {
  return {
    get 'tc-active'() {
      return checked();
    },
  };
}
