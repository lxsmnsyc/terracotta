import { JSXElement, Component, children } from 'solid-js';
import copy from 'copy-to-clipboard';

export interface CopyToClipboardProps {
  text: string;
  children: JSXElement;
  eventTrigger?: string;
}

// eslint-disable-next-line react/function-component-definition
export const CopyToClipboard: Component<CopyToClipboardProps> = (props) => {
  const c = children(() => props.children);

  const eventTrigger = {
    [props.eventTrigger ?? 'onClick']: () => copy(props.text),
  };

  return <div {...eventTrigger}>{c()}</div>;
};
