import { Accessor } from 'solid-js';
export default function useControlledSignal<T>(initialValue: T, read: Accessor<T> | undefined, write: (value: T) => void): [Accessor<T>, (value: T) => void];
