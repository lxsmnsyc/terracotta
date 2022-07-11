import {
  createEffect,
  onCleanup,
  JSX,
  createMemo,
} from 'solid-js';
import {
  useHeadlessDisclosureProperties,
} from '../../headless/disclosure';

export default function CommandBarEvents(props: { children: JSX.Element }): JSX.Element {
  const properties = useHeadlessDisclosureProperties();

  createEffect(() => {
    const onKeyDown = (ev: KeyboardEvent) => {
      if ((ev.metaKey || ev.ctrlKey) && ev.key === 'k' && ev.defaultPrevented === false) {
        ev.preventDefault();
        properties.setState(true);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    onCleanup(() => {
      window.removeEventListener('keydown', onKeyDown);
    });
  });

  return createMemo(() => props.children);
}
