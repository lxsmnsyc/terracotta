import { JSX } from 'solid-js';
import { ValidConstructor, WithRef } from '../utils/dynamic-prop';
import { ButtonProps } from './Button';
export declare type ToggleProps<T extends ValidConstructor = 'button'> = {
    defaultPressed?: boolean;
    pressed?: boolean;
    onChange?: (value: boolean) => void;
} & Omit<ButtonProps<T>, 'defaultPressed' | 'pressed' | 'onChange'> & WithRef<T>;
export declare function Toggle<T extends ValidConstructor = 'button'>(props: ToggleProps<T>): JSX.Element;
