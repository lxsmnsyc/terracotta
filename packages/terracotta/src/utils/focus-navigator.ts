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
} from './focus-navigation';
import { DATA_SET_NAMESPACE } from './namespace';
import { focusVirtually } from './virtual-focus';

const OWNER = `${DATA_SET_NAMESPACE}-owner`;

function queryNodes<T extends Element>(
  el: T,
  ownerID: string,
  condition = '',
): NodeListOf<HTMLElement> {
  return el.querySelectorAll(`[${OWNER}="${ownerID}"]${condition}`);
}

export function createOwnerAttribute(ownerID: string) {
  return {
    [OWNER]: ownerID,
  };
}

export default class FocusNavigator<T extends ValidConstructor> {
  private ownerID: string;

  private virtual: boolean;

  private internalRef?: DynamicNode<T>;

  constructor(ownerID: string, virtual = false) {
    this.ownerID = ownerID;
    this.virtual = virtual;
  }

  setRef(ref: DynamicNode<T>) {
    this.internalRef = ref;
  }

  private query(ref: HTMLElement, condition = '') {
    return queryNodes(ref, this.ownerID, condition);
  }

  // eslint-disable-next-line class-methods-use-this
  setChecked(node: Element) {
    if (this.virtual) {
      focusVirtually(node as HTMLElement);
    } else {
      (node as HTMLElement).focus();
    }
  }

  setNextChecked(node: Element, loop: boolean) {
    if (this.internalRef instanceof HTMLElement) {
      focusNext(
        this.query(this.internalRef),
        node,
        loop,
        this.virtual,
      );
    }
  }

  setPrevChecked(node: Element, loop: boolean) {
    if (this.internalRef instanceof HTMLElement) {
      focusPrev(
        this.query(this.internalRef),
        node,
        loop,
        this.virtual,
      );
    }
  }

  setFirstChecked(condition = '') {
    if (this.internalRef instanceof HTMLElement) {
      focusFirst(this.query(this.internalRef, condition), this.virtual);
    }
  }

  setLastChecked(condition = '') {
    if (this.internalRef instanceof HTMLElement) {
      focusLast(this.query(this.internalRef, condition), this.virtual);
    }
  }

  setFirstMatch(character: string) {
    if (this.internalRef instanceof HTMLElement) {
      focusMatch(
        this.query(this.internalRef),
        character,
        this.virtual,
      );
    }
  }

  getId() {
    return this.ownerID;
  }
}
