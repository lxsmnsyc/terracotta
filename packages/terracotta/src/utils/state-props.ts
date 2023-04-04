/**
 * ARIA states
 */

interface ARIADisabledProps {
  disabled?: boolean;
  'aria-disabled'?: boolean;
}

export function createARIADisabledState(
  disabled: () => boolean | undefined,
): ARIADisabledProps {
  return {
    get disabled() {
      return disabled();
    },
    get 'aria-disabled'() {
      return disabled();
    },
  };
}

interface ARIAExpandedProps {
  'aria-expanded'?: boolean;
}

export function createARIAExpandedState(
  expanded: () => boolean | undefined,
): ARIAExpandedProps {
  return {
    get 'aria-expanded'() {
      return expanded();
    },
  };
}

interface ARIACheckedProps {
  'aria-checked': boolean | 'mixed';
}

export function createARIACheckedState(
  checked: () => boolean | undefined,
): ARIACheckedProps {
  return {
    get 'aria-checked'() {
      return checked() ?? 'mixed';
    },
  };
}
interface ARIASelectedProps {
  'aria-selected': boolean;
}

export function createARIASelectedState(
  checked: () => boolean,
): ARIASelectedProps {
  return {
    get 'aria-selected'() {
      return checked();
    },
  };
}

/**
 * Terracotta States
 */

interface DisabledProps {
  'tc-disabled'?: boolean;
}

export function createDisabledState(
  disabled: () => boolean | undefined,
): DisabledProps {
  return {
    get 'tc-disabled'() {
      return disabled();
    },
  };
}

interface ExpandedProps {
  'tc-expanded'?: boolean;
}

export function createExpandedState(
  expanded: () => boolean | undefined,
): ExpandedProps {
  return {
    get 'tc-expanded'() {
      return expanded();
    },
  };
}

interface CheckedProps {
  'tc-checked': boolean | 'mixed';
}

export function createCheckedState(
  checked: () => boolean | undefined,
): CheckedProps {
  return {
    get 'tc-checked'() {
      return checked() ?? 'mixed';
    },
  };
}

interface SelectedProps {
  'tc-selected': boolean;
}

export function createSelectedState(
  checked: () => boolean,
): SelectedProps {
  return {
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

interface MatchesProps {
  'tc-matches': boolean;
}

export function createMatchesState(
  checked: () => boolean,
): MatchesProps {
  return {
    get 'tc-matches'() {
      return checked();
    },
  };
}

interface HasSelectedProps {
  'tc-has-selected': boolean;
}

export function createHasSelectedState(
  hasSelected: () => boolean,
): HasSelectedProps {
  return {
    get 'tc-has-selected'() {
      return hasSelected();
    },
  };
}

interface HasActiveProps {
  'tc-has-active': boolean;
}

export function createHasActiveState(
  hasActive: () => boolean,
): HasActiveProps {
  return {
    get 'tc-has-active'() {
      return hasActive();
    },
  };
}
