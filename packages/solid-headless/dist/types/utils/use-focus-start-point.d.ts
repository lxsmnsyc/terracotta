declare class FocusStartPoint {
    private returnElement;
    private fsp;
    constructor();
}
interface FocusStartPoint {
    load(): void;
    save(): void;
}
export default function useFocusStartPoint(): FocusStartPoint;
export {};
