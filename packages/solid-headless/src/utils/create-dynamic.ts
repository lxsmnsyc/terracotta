import {
  Accessor,
  createMemo,
  JSX,
  sharedConfig,
  untrack,
} from 'solid-js';
import {
  getNextElement,
  SVGElements,
  spread,
} from 'solid-js/web';
import {
  DynamicProps,
  ValidConstructor,
} from './dynamic-prop';

const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

function createElement(tagName: string, isSVG = false): HTMLElement | SVGElement {
  return isSVG ? document.createElementNS(SVG_NAMESPACE, tagName) : document.createElement(tagName);
}

export default function createDynamic<T extends ValidConstructor>(
  source: () => T,
  props: DynamicProps<T>,
): Accessor<JSX.Element> {
  const cached = createMemo(source);
  return createMemo(() => {
    const component = cached();
    if (typeof component === 'function') {
      return untrack(() => component(props));
    }
    const isSvg = SVGElements.has(component);
    const el = sharedConfig.context ? getNextElement() : createElement(component, isSvg);
    spread(el, props, isSvg);
    return el;
  });
}
