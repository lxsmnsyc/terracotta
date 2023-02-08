import { JSX } from 'solid-js';
import { ValidConstructor } from '../../utils/dynamic-prop';
import { TabGroupControlledProps } from './TabGroupControlled';
import { TabGroupUncontrolledProps } from './TabGroupUncontrolled';
export type TabGroupProps<V, T extends ValidConstructor = 'div'> = TabGroupControlledProps<V, T> | TabGroupUncontrolledProps<V, T>;
export declare function TabGroup<V, T extends ValidConstructor = 'div'>(props: TabGroupProps<V, T>): JSX.Element;
