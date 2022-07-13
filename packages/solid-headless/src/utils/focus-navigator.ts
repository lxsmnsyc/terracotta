import {
  ValidConstructor,
  DynamicNode,
} from './dynamic-prop';
import {
  focusNext,
  focusPrev,
  focusFirst,
  focusLast,
  focusMatch,
  focusNextContinuous,
  focusPrevContinuous,
} from './focus-navigation';

function queryNodes<T extends Element>(
  el: T,
  tag: string,
  ownerID: string,
): NodeListOf<HTMLElement> {
  return el.querySelectorAll(`[data-sh-${tag}="${ownerID}"]`);
}

export default class FocusNavigator<T extends ValidConstructor> {
  private ownerID: string;

  private tag: string;

  private internalRef?: DynamicNode<T>;

  constructor(tag: string, ownerID: string) {
    this.ownerID = ownerID;
    this.tag = tag;
  }

  setRef(ref: DynamicNode<T>) {
    this.internalRef = ref;
  }

  private query(ref: HTMLElement) {
    return queryNodes(ref, this.tag, this.ownerID);
  }

  // eslint-disable-next-line class-methods-use-this
  setChecked(node: Element) {
    (node as HTMLElement).focus();
  }

  setNextChecked(node: Element, continuous?: boolean) {
    if (this.internalRef instanceof HTMLElement) {
      if (continuous) {
        focusNextContinuous(
          this.query(this.internalRef),
          node,
        );
      } else {
        focusNext(
          this.query(this.internalRef),
          node,
        );
      }
    }
  }

  setPrevChecked(node: Element, continuous?: boolean) {
    if (this.internalRef instanceof HTMLElement) {
      if (continuous) {
        focusPrevContinuous(
          this.query(this.internalRef),
          node,
        );
      } else {
        focusPrev(
          this.query(this.internalRef),
          node,
        );
      }
    }
  }

  setFirstChecked() {
    if (this.internalRef instanceof HTMLElement) {
      focusFirst(this.query(this.internalRef));
    }
  }

  setLastChecked() {
    if (this.internalRef instanceof HTMLElement) {
      focusLast(this.query(this.internalRef));
    }
  }

  setFirstMatch(character: string) {
    if (this.internalRef instanceof HTMLElement) {
      focusMatch(
        this.query(this.internalRef),
        character,
      );
    }
  }

  getId() {
    return this.ownerID;
  }
}
