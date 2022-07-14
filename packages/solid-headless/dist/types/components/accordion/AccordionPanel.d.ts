import { JSX } from 'solid-js';
import { HeadlessSelectOptionChildProps } from '../../headless/select';
import { ValidConstructor, HeadlessProps } from '../../utils/dynamic-prop';
import { UnmountableProps } from '../../utils/Unmountable';
export declare type AccordionPanelProps<T extends ValidConstructor = 'div'> = HeadlessProps<T, HeadlessSelectOptionChildProps & UnmountableProps>;
export declare function AccordionPanel<T extends ValidConstructor = 'div'>(props: AccordionPanelProps<T>): JSX.Element;
