import { isServer } from '@solidjs/web';
import { onCleanup } from 'solid-js';
import { getFocusStartPoint, setFocusStartPoint } from './focus-start-point';

/**
 * Remembers where focus was when a component opened, and moves it back when
 * the component closes or unmounts.
 *
 * It only moves focus back after `save()` has run, which happens when the
 * component opens. A component that was never opened does not move focus when
 * it closes or unmounts.
 */
class FocusStartPoint {
  private returnElement: Element | null | undefined;

  private fsp: HTMLElement | null | undefined;

  private saved = false;

  load(): void {
    if (!this.saved) {
      return;
    }
    this.saved = false;
    if (this.returnElement instanceof HTMLElement) {
      this.returnElement.focus();
    } else {
      setFocusStartPoint(this.fsp);
    }
  }

  save(): void {
    this.returnElement = document.activeElement;
    this.fsp = getFocusStartPoint();
    this.saved = true;
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
