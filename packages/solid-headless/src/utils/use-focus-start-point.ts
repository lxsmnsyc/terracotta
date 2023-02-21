import {
  onCleanup,
} from 'solid-js';
import { isServer } from 'solid-js/web';
import {
  getFocusStartPoint,
  setFocusStartPoint,
} from './focus-start-point';

class FocusStartPoint {
  private returnElement: Element | null | undefined;

  private fsp: HTMLElement | null | undefined;

  constructor() {
    if (typeof document !== 'undefined') {
      this.returnElement = document.activeElement;
      this.fsp = getFocusStartPoint();
    }

    if (!isServer) {
      onCleanup(() => {
        this.load();
      });
    }
  }

  load() {
    if (this.returnElement instanceof HTMLElement) {
      this.returnElement.focus();
    } else {
      setFocusStartPoint(this.fsp);
    }
  }

  save() {
    this.returnElement = document.activeElement;
    this.fsp = getFocusStartPoint();
  }
}

interface FocusStartPoint {
  load(): void;
  save(): void;
}

export default function useFocusStartPoint(): FocusStartPoint {
  return new FocusStartPoint();
}
