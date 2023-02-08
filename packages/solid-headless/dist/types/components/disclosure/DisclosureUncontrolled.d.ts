import { JSX } from 'solid-js';
import { HeadlessDisclosureRootChildren, HeadlessDisclosureUncontrolledOptions } from '../../headless/disclosure';
import { HeadlessProps, ValidConstructor } from '../../utils/dynamic-prop';
import Fragment from '../../utils/Fragment';
type DisclosureUncontrolledBaseProps = HeadlessDisclosureUncontrolledOptions & HeadlessDisclosureRootChildren;
export type DisclosureUncontrolledProps<T extends ValidConstructor = typeof Fragment> = HeadlessProps<T, DisclosureUncontrolledBaseProps>;
export declare function DisclosureUncontrolled<T extends ValidConstructor = typeof Fragment>(props: DisclosureUncontrolledProps<T>): JSX.Element;
export {};
