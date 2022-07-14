export interface ListboxBaseProps {
    horizontal?: boolean;
    onDisclosureChange?: (value: boolean) => void;
}
export interface ListboxMultipleBaseProps<V> {
    onSelectChange?: (value: V[]) => void;
}
export interface ListboxSingleBaseProps<V> {
    onSelectChange?: (value?: V) => void;
}
