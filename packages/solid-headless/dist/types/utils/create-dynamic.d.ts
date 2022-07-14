import { Accessor, JSX } from 'solid-js';
import { DynamicProps, ValidConstructor } from './dynamic-prop';
export default function createDynamic<T extends ValidConstructor>(source: () => T, props: DynamicProps<T>): Accessor<JSX.Element>;
