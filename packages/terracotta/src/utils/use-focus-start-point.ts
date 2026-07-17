import { isServer } from '@solidjs/web';
import { onCleanup } from 'solid-js';
import { getFocusStartPoint, setFocusStartPoint } from './focus-start-point';

class FocusStartPoint {
  private returnElement: Element | null | undefined;

  private fsp: HTMLElement | null | undefined;

  constructor() {
    if (!isServer) {
      this.returnElement = document.activeElement;
      this.fsp = getFocusStartPoint();
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
  const fsp = new FocusStartPoint();
  if (!isServer) {
    onCleanup(() => {
      fsp.load();
    });
  }
  return fsp;
}
