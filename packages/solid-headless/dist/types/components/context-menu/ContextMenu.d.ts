import { JSX } from 'solid-js';
import { ValidConstructor } from '../../utils/dynamic-prop';
import { ContextMenuControlledProps } from './ContextMenuControlled';
import { ContextMenuUncontrolledProps } from './ContextMenuUncontrolled';
export type ContextMenuProps<T extends ValidConstructor = 'div'> = ContextMenuControlledProps<T> | ContextMenuUncontrolledProps<T>;
export declare function ContextMenu<T extends ValidConstructor = 'div'>(props: ContextMenuProps<T>): JSX.Element;
