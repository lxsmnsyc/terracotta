import { JSX } from 'solid-js';
import { HeadlessDisclosureRootChildren, HeadlessDisclosureControlledOptions } from '../../headless/disclosure';
import { HeadlessProps, ValidConstructor } from '../../utils/dynamic-prop';
import Fragment from '../../utils/Fragment';
declare type DisclosureControlledBaseProps = HeadlessDisclosureControlledOptions & HeadlessDisclosureRootChildren;
export declare type DisclosureControlledProps<T extends ValidConstructor = typeof Fragment> = HeadlessProps<T, DisclosureControlledBaseProps>;
export declare function DisclosureControlled<T extends ValidConstructor = typeof Fragment>(props: DisclosureControlledProps<T>): JSX.Element;
export {};
