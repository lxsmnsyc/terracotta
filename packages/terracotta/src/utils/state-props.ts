type Booleanish = '' | undefined;

function toBooleanish(value?: boolean): Booleanish {
  return value ? '' : undefined;
}

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
    get disabled(): boolean | undefined {
      return disabled();
    },
    get 'aria-disabled'(): boolean | undefined {
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
    get 'aria-expanded'(): boolean | undefined {
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
    get 'aria-checked'(): boolean | 'mixed' {
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
    get 'aria-selected'(): boolean {
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
    get 'aria-pressed'(): boolean {
      return pressed();
    },
  };
}

/**
 * Terracotta States
 */

interface DisabledProps {
  'tc-disabled'?: Booleanish;
}

export function createDisabledState(
  disabled: () => boolean | undefined,
): DisabledProps {
  return {
    get 'tc-disabled'(): Booleanish {
      return toBooleanish(disabled());
    },
  };
}

interface ExpandedProps {
  'tc-expanded'?: Booleanish;
}

export function createExpandedState(
  expanded: () => boolean | undefined,
): ExpandedProps {
  return {
    get 'tc-expanded'(): Booleanish {
      return toBooleanish(expanded());
    },
  };
}

interface CheckedProps {
  'tc-checked': Booleanish | 'mixed';
}

export function createCheckedState(
  isChecked: () => boolean | undefined,
): CheckedProps {
  return {
    get 'tc-checked'(): Booleanish | 'mixed' {
      const result = isChecked();
      return result == null ? 'mixed' : toBooleanish(result);
    },
  };
}

interface SelectedProps {
  'tc-selected': Booleanish;
}

export function createSelectedState(isSelected: () => boolean): SelectedProps {
  return {
    get 'tc-selected'(): Booleanish {
      return toBooleanish(isSelected());
    },
  };
}

interface ActiveProps {
  'tc-active': Booleanish;
}

export function createActiveState(isActive: () => boolean): ActiveProps {
  return {
    get 'tc-active'(): Booleanish {
      return toBooleanish(isActive());
    },
  };
}

interface MatchesProps {
  'tc-matches': Booleanish;
}

export function createMatchesState(matches: () => boolean): MatchesProps {
  return {
    get 'tc-matches'(): Booleanish {
      return toBooleanish(matches());
    },
  };
}

interface HasSelectedProps {
  'tc-has-selected': Booleanish;
}

export function createHasSelectedState(
  hasSelected: () => boolean,
): HasSelectedProps {
  return {
    get 'tc-has-selected'(): Booleanish {
      return toBooleanish(hasSelected());
    },
  };
}

interface HasActiveProps {
  'tc-has-active': Booleanish;
}

export function createHasActiveState(hasActive: () => boolean): HasActiveProps {
  return {
    get 'tc-has-active'(): Booleanish {
      return toBooleanish(hasActive());
    },
  };
}

interface HasQueryProps {
  'tc-has-query': Booleanish;
}

export function createHasQueryState(hasQuery: () => boolean): HasQueryProps {
  return {
    get 'tc-has-query'(): Booleanish {
      return toBooleanish(hasQuery());
    },
  };
}

interface PressedProps {
  'tc-pressed': Booleanish;
}

export function createPressedState(pressed: () => boolean): PressedProps {
  return {
    get 'tc-pressed'(): Booleanish {
      return toBooleanish(pressed());
    },
  };
}
