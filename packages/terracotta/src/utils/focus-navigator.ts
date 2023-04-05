import assert from './assert';
import {
  focusNode,
  focusNext,
  focusPrev,
  focusFirst,
  focusLast,
  focusMatch,
} from './focus-navigation';
import { DATA_SET_NAMESPACE, DISABLED_NODE } from './namespace';

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
  const query = `[${OWNER}="${ownerID}"]:not(${DISABLED_NODE})${condition}`;
  const nodes = el.querySelectorAll<HTMLElement>(query);
  return nodes;
}

export function createOwnerAttribute(ownerID: string) {
  return {
    [OWNER]: ownerID,
  };
}

export interface FocusNavigatorOptions {
  virtual: boolean;
  base: string;
}

export default class FocusNavigator {
  private ownerID: string;

  private options: FocusNavigatorOptions;

  private internalRef?: HTMLElement;

  private current: HTMLElement | undefined;

  constructor(ownerID: string, options: Partial<FocusNavigatorOptions> = {}) {
    this.ownerID = ownerID;
    this.options = {
      virtual: options.virtual ?? false,
      base: options.base ?? '',
    };
  }

  setRef(ref: HTMLElement) {
    this.internalRef = ref;
  }

  clearRef() {
    this.internalRef = undefined;
  }

  private query(ref: HTMLElement, condition = '') {
    return queryNodes(ref, this.ownerID, `${this.options.base}${condition}`);
  }

  setCurrent(node: HTMLElement) {
    this.current = node;
  }

  setChecked(node: HTMLElement) {
    this.current = focusNode(node, this.options.virtual);
  }

  setNextChecked(loop: boolean) {
    if (this.internalRef instanceof HTMLElement) {
      assert(this.current, new Error('missing current ref'));
      const current = focusNext(
        this.query(this.internalRef),
        this.current,
        loop,
        this.options.virtual,
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
        this.options.virtual,
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
        this.options.virtual,
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
        this.options.virtual,
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
        this.options.virtual,
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
