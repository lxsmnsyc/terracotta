import { onCleanup } from 'solid-js';
import { isServer } from 'solid-js/web';
import { getFocusStartPoint, setFocusStartPoint } from './focus-start-point';

class FocusStartPoint {
  private returnElement: Element | null | undefined;

  private fsp: HTMLElement | null | undefined;

  constructor() {
    if (!isServer) {
      this.returnElement = document.activeElement;
      this.fsp = getFocusStartPoint();
      onCleanup(() => {
        this.load();
      });
    }
  }

  load(): void {
    if (this.returnElement instanceof HTMLElement) {
      this.returnElement.focus();
    } else {
      setFocusStartPoint(this.fsp);
    }
  }

  save(): void {
    this.returnElement = document.activeElement;
    this.fsp = getFocusStartPoint();
  }
}

export default function useFocusStartPoint(): FocusStartPoint {
  return new FocusStartPoint();
}
