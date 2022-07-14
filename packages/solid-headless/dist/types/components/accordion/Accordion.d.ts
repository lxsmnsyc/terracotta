import { JSX } from 'solid-js';
import { ValidConstructor } from '../../utils/dynamic-prop';
import { AccordionMultipleControlledProps } from './AccordionMultipleControlled';
import { AccordionMultipleUncontrolledProps } from './AccordionMultipleUncontrolled';
import { AccordionSingleControlledProps } from './AccordionSingleControlled';
import { AccordionSingleUncontrolledProps } from './AccordionSingleUncontrolled';
export declare type AccordionProps<V, T extends ValidConstructor = 'div'> = AccordionSingleControlledProps<V, T> | AccordionSingleUncontrolledProps<V, T> | AccordionMultipleControlledProps<V, T> | AccordionMultipleUncontrolledProps<V, T>;
export declare function Accordion<V, T extends ValidConstructor = 'div'>(props: AccordionProps<V, T>): JSX.Element;
