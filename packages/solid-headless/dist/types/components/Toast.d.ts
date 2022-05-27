import { JSX } from 'solid-js';
import { DynamicProps, ValidConstructor } from '../utils/dynamic-prop';
export declare type ToastProps<T extends ValidConstructor = 'div'> = {
    as?: T;
    disabled?: boolean;
} & Omit<DynamicProps<T>, 'as'>;
export declare function Toast<T extends ValidConstructor = 'div'>(props: ToastProps<T>): JSX.Element;
export declare type ToasterProps<T extends ValidConstructor = 'div'> = {
    as?: T;
    disabled?: boolean;
} & Omit<DynamicProps<T>, 'as'>;
export declare function Toaster<T extends ValidConstructor = 'div'>(props: ToasterProps<T>): JSX.Element;
export interface ToastData<T> {
    id: string;
    data: T;
}
export declare type ToasterListener<T> = (queue: ToastData<T>[]) => void;
export declare class ToasterStore<T> {
    private static toasterID;
    private id;
    private queue;
    private listeners;
    private toastID;
    constructor();
    subscribe(callback: ToasterListener<T>): () => void;
    private notify;
    create(data: T): string;
    remove(id: string): void;
    clear(): void;
    getQueue(): ToastData<T>[];
}
export declare function useToaster<T>(toaster: ToasterStore<T>): () => ToastData<T>[];
