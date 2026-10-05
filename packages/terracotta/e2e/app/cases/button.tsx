import type { JSX } from '@solidjs/web';
import { createSignal } from 'solid-js';
import { Button } from 'terracotta/button';

export default function ButtonCase(): JSX.Element {
  const [count, setCount] = createSignal(0);

  return (
    <div style={{ height: '3000px' }}>
      <Button
        as="div"
        onClick={() => {
          setCount((value) => value + 1);
        }}
      >
        Save
      </Button>
      <Button
        as="div"
        disabled
        onClick={() => {
          setCount((value) => value + 1);
        }}
      >
        Disabled
      </Button>
      <div data-testid="count">{count()}</div>
    </div>
  );
}
