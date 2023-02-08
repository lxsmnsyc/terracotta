export interface ToastData<T> {
    id: string;
    data: T;
}
export type ToasterListener<T> = (queue: ToastData<T>[]) => void;
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
