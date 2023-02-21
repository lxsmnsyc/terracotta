import { JSX } from 'solid-js';

export default function ClientOnly(props: { children: JSX.Element }) {
  let flag = $signal(false);

  $mount(() => {
    flag = true;
  });

  return <Show when={flag}>{props.children}</Show>;
}
