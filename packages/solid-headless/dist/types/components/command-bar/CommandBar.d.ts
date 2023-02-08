import { JSX } from 'solid-js';
import { ValidConstructor } from '../../utils/dynamic-prop';
import { CommandBarControlledProps } from './CommandBarControlled';
import { CommandBarUncontrolledProps } from './CommandBarUncontrolled';
export type CommandBarProps<T extends ValidConstructor = 'div'> = CommandBarControlledProps<T> | CommandBarUncontrolledProps<T>;
export declare function CommandBar<T extends ValidConstructor = 'div'>(props: CommandBarProps<T>): JSX.Element;
