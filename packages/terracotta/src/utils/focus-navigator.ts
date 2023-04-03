import assert from './assert';
import {
  focusNext,
  focusPrev,
  focusFirst,
  focusLast,
  focusMatch,
} from './focus-navigation';
import { DATA_SET_NAMESPACE, DISABLED_NODE } from './namespace';
import { focusVirtually } from './virtual-focus';

const OWNER = `${DATA_SET_NAMESPACE}-owner`;

function queryNodes<T extends Element>(
  el: T,
  ownerID: string,
  condition = '',
): NodeListOf<HTMLElement> {
  // We only query nodes that are:
  // - owned by the root component via ownerID
  // - node isn't disabled
  // - extra condition
  return el.querySelectorAll(`[${OWNER}="${ownerID}"]:not(${DISABLED_NODE})${condition}`);
}

export function createOwnerAttribute(ownerID: string) {
  return {
    [OWNER]: ownerID,
  };
}

export default class FocusNavigator {
  private ownerID: string;

  private virtual: boolean;

  private internalRef?: HTMLElement;

  private current: HTMLElement | undefined;

  constructor(ownerID: string, virtual = false) {
    this.ownerID = ownerID;
    this.virtual = virtual;
  }

  setRef(ref: HTMLElement) {
    this.internalRef = ref;
  }

  private query(ref: HTMLElement, condition = '') {
    return queryNodes(ref, this.ownerID, condition);
  }

  setCurrent(node: HTMLElement) {
    this.current = node;
  }

  setChecked(node: HTMLElement) {
    if (this.virtual) {
      focusVirtually(node);
    } else {
      node.focus();
    }
    this.current = node;
  }

  setNextChecked(loop: boolean) {
    if (this.internalRef instanceof HTMLElement) {
      assert(this.current, new Error('missing current ref'));
      const current = focusNext(
        this.query(this.internalRef),
        this.current,
        loop,
        this.virtual,
      );
      if (current) {
        this.current = current;
      }
    }
  }

  setPrevChecked(loop: boolean) {
    if (this.internalRef instanceof HTMLElement) {
      assert(this.current, new Error('missing current ref'));
      const current = focusPrev(
        this.query(this.internalRef),
        this.current,
        loop,
        this.virtual,
      );
      if (current) {
        this.current = current;
      }
    }
  }

  setFirstChecked(condition = '') {
    if (this.internalRef instanceof HTMLElement) {
      const current = focusFirst(
        this.query(this.internalRef, condition),
        this.virtual,
      );
      if (current) {
        this.current = current;
      }
    }
  }

  setLastChecked(condition = '') {
    if (this.internalRef instanceof HTMLElement) {
      const current = focusLast(
        this.query(this.internalRef, condition),
        this.virtual,
      );
      if (current) {
        this.current = current;
      }
    }
  }

  setFirstMatch(character: string) {
    if (this.internalRef instanceof HTMLElement) {
      const current = focusMatch(
        this.query(this.internalRef),
        character,
        this.virtual,
      );
      if (current) {
        this.current = current;
      }
    }
  }

  getId() {
    return this.ownerID;
  }
}
