import { createUniqueId } from 'solid-js';
import {
  DynamicNode,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import { queryAccordionButtons } from '../../utils/query-nodes';

function focus(node: Element) {
  (node as HTMLElement).focus();
}

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
      const radios = queryAccordionButtons(this.internalRef, this.ownerID);
      for (let i = 0, len = radios.length; i < len; i += 1) {
        if (node === radios[i]) {
          if (i === len - 1) {
            focus(radios[0]);
          } else {
            focus(radios[i + 1]);
          }
          break;
        }
      }
    }
  }

  setPrevChecked(node: Element) {
    if (this.internalRef instanceof HTMLElement) {
      const radios = queryAccordionButtons(this.internalRef, this.ownerID);
      for (let i = 0, len = radios.length; i < len; i += 1) {
        if (node === radios[i]) {
          if (i === 0) {
            focus(radios[len - 1]);
          } else {
            focus(radios[i - 1]);
          }
          break;
        }
      }
    }
  }

  setFirstChecked() {
    if (this.internalRef instanceof HTMLElement) {
      const radios = queryAccordionButtons(this.internalRef, this.ownerID);
      focus(radios[0]);
    }
  }

  setLastChecked() {
    if (this.internalRef instanceof HTMLElement) {
      const radios = queryAccordionButtons(this.internalRef, this.ownerID);
      focus(radios[radios.length - 1]);
    }
  }

  getId() {
    return this.ownerID;
  }
}
