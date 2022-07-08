import {
  onCleanup,
} from 'solid-js';
import {
  getFocusStartPoint,
  setFocusStartPoint,
} from './focus-start-point';

class FocusStartPoint {
  private returnElement: HTMLElement | null | undefined;

  constructor() {
    if (typeof document !== 'undefined') {
      this.returnElement = getFocusStartPoint();
    }

    onCleanup(() => {
      this.load();
    });
  }

  load() {
    setFocusStartPoint(this.returnElement);
  }

  save() {
    this.returnElement = getFocusStartPoint();
  }
}

interface FocusStartPoint {
  load(): void;
  save(): void;
}

export default function useFocusStartPoint(): FocusStartPoint {
  return new FocusStartPoint();
}
