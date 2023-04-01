import {
  createEffect,
  onCleanup,
  JSX,
  createComponent,
} from 'solid-js';
import {
  DisclosureStateChild,
  useDisclosureState,
} from '../../states/create-disclosure-state';

export default function CommandBarEvents(props: { children: JSX.Element }): JSX.Element {
  const properties = useDisclosureState();

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

  return createComponent(DisclosureStateChild, {
    get children() {
      return props.children;
    },
  });
}
