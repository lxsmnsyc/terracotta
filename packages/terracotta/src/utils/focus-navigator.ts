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
import { DATA_SET_NAMESPACE } from './namespace';

const OWNER = `${DATA_SET_NAMESPACE}-owner`;

function queryNodes<T extends Element>(
  el: T,
  ownerID: string,
): NodeListOf<HTMLElement> {
  return el.querySelectorAll(`[${OWNER}="${ownerID}"]`);
}

export function createOwnerAttribute(ownerID: string) {
  return {
    [OWNER]: ownerID,
  };
}

export default class FocusNavigator<T extends ValidConstructor> {
  private ownerID: string;

  private internalRef?: DynamicNode<T>;

  constructor(ownerID: string) {
    this.ownerID = ownerID;
  }

  setRef(ref: DynamicNode<T>) {
    this.internalRef = ref;
  }

  private query(ref: HTMLElement) {
    return queryNodes(ref, this.ownerID);
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
