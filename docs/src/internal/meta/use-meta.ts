import { createEffect } from 'solid-js';
import { SuccessResult } from '../router';
import resolveMeta from './resolve-meta';

export default function useMeta<T>(source: SuccessResult<T>) {
  createEffect(() => {
    // Get anchor node
    let node = document.head.firstChild;
    let anchor: Node | undefined;

    let begin = false;

    const nodes: Node[] = [];

    while (node) {
      if (node.nodeType === Node.COMMENT_NODE) {
        if ((node as Comment).data === 'astro:meta:start') {
          begin = true;
        } else if ((node as Comment).data === 'astro:meta:end') {
          anchor = node;
          break;
        } else {
          nodes.push(node);
        }
      } else if (begin) {
        nodes.push(node);
      }
      node = node.nextSibling;
    }

    for (const temp of nodes) {
      document.head.removeChild(temp);
    }

    if (anchor && source.meta) {
      const resolved = resolveMeta(source);

      for (const item of resolved) {
        const current = document.createElement(item.tag);
        if (item.attributes) {
          for (const [key, value] of Object.entries(item.attributes)) {
            if (typeof value === 'string') {
              current.setAttribute(key, value);
            } else if (value === true || value === false) {
              current.setAttribute(key, value ? 'true' : 'false');
            }
          }
        }
        if (item.content) {
          current.innerText = item.content;
        }
        document.head.insertBefore(current, anchor);
      }
    }
  });
}
