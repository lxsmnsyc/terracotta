interface DisabledProps {
    disabled?: boolean;
    'aria-disabled'?: boolean;
    'data-sh-disabled'?: boolean;
}
export declare function createDisabled(disabled: () => boolean | undefined): DisabledProps;
interface ExpandedProps {
    'aria-expanded'?: boolean;
    'data-sh-expanded'?: boolean;
}
export declare function createExpanded(expanded: () => boolean | undefined): ExpandedProps;
interface CheckedProps {
    'aria-checked': boolean | 'mixed';
    'data-sh-checked': boolean | 'mixed';
}
export declare function createChecked(checked: () => boolean | undefined): CheckedProps;
interface SelectedProps {
    'aria-selected': boolean;
    'data-sh-selected': boolean;
}
export declare function createSelected(checked: () => boolean): SelectedProps;
interface ActiveProps {
    'data-sh-active': boolean;
}
export declare function createActive(checked: () => boolean): ActiveProps;
export {};
