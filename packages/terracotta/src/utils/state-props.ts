/**
 * Hybrid states
 */

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
  selected: () => boolean,
): ARIASelectedProps {
  return {
    get 'aria-selected'() {
      return selected();
    },
  };
}

interface ARIAPressedProps {
  'aria-pressed': boolean;
}

export function createARIAPressedState(
  pressed: () => boolean,
): ARIAPressedProps {
  return {
    get 'aria-pressed'() {
      return pressed();
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
  isChecked: () => boolean | undefined,
): CheckedProps {
  return {
    get 'tc-checked'() {
      const result = isChecked();
      return result == null ? 'mixed' : result;
    },
  };
}

interface SelectedProps {
  'tc-selected': boolean;
}

export function createSelectedState(
  isSelected: () => boolean,
): SelectedProps {
  return {
    get 'tc-selected'() {
      return isSelected();
    },
  };
}

interface ActiveProps {
  'tc-active': boolean;
}

export function createActiveState(
  isActive: () => boolean,
): ActiveProps {
  return {
    get 'tc-active'() {
      return isActive();
    },
  };
}

interface MatchesProps {
  'tc-matches': boolean;
}

export function createMatchesState(
  matches: () => boolean,
): MatchesProps {
  return {
    get 'tc-matches'() {
      return matches();
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

interface HasQueryProps {
  'tc-has-query': boolean;
}

export function createHasQueryState(
  hasQuery: () => boolean,
): HasQueryProps {
  return {
    get 'tc-has-query'() {
      return hasQuery();
    },
  };
}

interface PressedProps {
  'tc-pressed': boolean;
}

export function createPressedState(
  pressed: () => boolean,
): PressedProps {
  return {
    get 'tc-pressed'() {
      return pressed();
    },
  };
}
