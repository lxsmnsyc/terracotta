type Booleanish = '' | undefined;

function toBooleanish(value?: boolean): Booleanish {
  return value ? '' : undefined;
}

/**
 * `aria-*` states are enumerated, not boolean: they need the literal strings
 * `"true"` and `"false"`. A boolean would be rendered as a boolean attribute,
 * which drops it entirely when false and writes an empty value when true, and
 * a missing `aria-pressed` reads as "not a toggle button" rather than "not
 * pressed". `undefined` still means "omit the attribute".
 */
type ARIABooleanish = 'true' | 'false' | undefined;

function toARIABooleanish(value?: boolean): ARIABooleanish {
  return value == null ? undefined : value ? 'true' : 'false';
}

/**
 * ARIA states
 */

interface ARIADisabledProps {
  disabled?: boolean;
  'aria-disabled'?: ARIABooleanish;
}

export function createARIADisabledState(disabled: () => boolean | undefined): ARIADisabledProps {
  return {
    // `disabled` is a real boolean attribute, so it stays a boolean.
    get disabled(): boolean | undefined {
      return disabled();
    },
    get 'aria-disabled'(): ARIABooleanish {
      return toARIABooleanish(disabled());
    },
  };
}

interface ARIAExpandedProps {
  'aria-expanded'?: ARIABooleanish;
}

export function createARIAExpandedState(expanded: () => boolean | undefined): ARIAExpandedProps {
  return {
    get 'aria-expanded'(): ARIABooleanish {
      return toARIABooleanish(expanded());
    },
  };
}

interface ARIACheckedProps {
  'aria-checked': ARIABooleanish | 'mixed';
}

export function createARIACheckedState(checked: () => boolean | undefined): ARIACheckedProps {
  return {
    get 'aria-checked'(): ARIABooleanish | 'mixed' {
      return toARIABooleanish(checked()) ?? 'mixed';
    },
  };
}
interface ARIASelectedProps {
  'aria-selected': ARIABooleanish;
}

export function createARIASelectedState(selected: () => boolean): ARIASelectedProps {
  return {
    get 'aria-selected'(): ARIABooleanish {
      return toARIABooleanish(selected());
    },
  };
}

interface ARIAPressedProps {
  'aria-pressed': ARIABooleanish;
}

export function createARIAPressedState(pressed: () => boolean): ARIAPressedProps {
  return {
    get 'aria-pressed'(): ARIABooleanish {
      return toARIABooleanish(pressed());
    },
  };
}

/**
 * Terracotta States
 */

interface DisabledProps {
  'tc-disabled'?: Booleanish;
}

export function createDisabledState(disabled: () => boolean | undefined): DisabledProps {
  return {
    get 'tc-disabled'(): Booleanish {
      return toBooleanish(disabled());
    },
  };
}

interface ExpandedProps {
  'tc-expanded'?: Booleanish;
}

export function createExpandedState(expanded: () => boolean | undefined): ExpandedProps {
  return {
    get 'tc-expanded'(): Booleanish {
      return toBooleanish(expanded());
    },
  };
}

interface CheckedProps {
  'tc-checked': Booleanish | 'mixed';
}

export function createCheckedState(isChecked: () => boolean | undefined): CheckedProps {
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

export function createHasSelectedState(hasSelected: () => boolean): HasSelectedProps {
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
