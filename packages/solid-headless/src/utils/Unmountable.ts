import {
  createComponent,
  JSX,
  Show,
} from 'solid-js';

export interface UnmountableProps {
  unmount?: boolean;
}

export function createUnmountable(
  props: UnmountableProps,
  shouldMount: () => boolean,
  render: () => JSX.Element,
): JSX.Element {
  return createComponent(Show, {
    get when() {
      return props.unmount ?? true;
    },
    get fallback() {
      return render();
    },
    get children() {
      return createComponent(Show, {
        get when() {
          return shouldMount();
        },
        get children() {
          return render();
        },
      });
    },
  });
}
