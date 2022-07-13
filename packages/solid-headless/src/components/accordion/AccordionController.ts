import {
  createUniqueId,
} from 'solid-js';
import {
  DynamicNode,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  focusFirst,
  focusLast,
  focusNext,
  focusPrev,
} from '../../utils/focus-navigation';
import {
  queryAccordionButtons,
} from '../../utils/query-nodes';

export default class AccordionController<T extends ValidConstructor = 'div'> {
  private ownerID: string;

  private internalRef?: DynamicNode<T>;

  constructor() {
    this.ownerID = createUniqueId();
  }

  setRef(ref: DynamicNode<T>) {
    this.internalRef = ref;
  }

  setNextChecked(node: Element) {
    if (this.internalRef instanceof HTMLElement) {
      focusNext(
        queryAccordionButtons(this.internalRef, this.ownerID),
        node,
      );
    }
  }

  setPrevChecked(node: Element) {
    if (this.internalRef instanceof HTMLElement) {
      focusPrev(
        queryAccordionButtons(this.internalRef, this.ownerID),
        node,
      );
    }
  }

  setFirstChecked() {
    if (this.internalRef instanceof HTMLElement) {
      focusFirst(queryAccordionButtons(this.internalRef, this.ownerID));
    }
  }

  setLastChecked() {
    if (this.internalRef instanceof HTMLElement) {
      focusLast(queryAccordionButtons(this.internalRef, this.ownerID));
    }
  }

  getId() {
    return this.ownerID;
  }
}
