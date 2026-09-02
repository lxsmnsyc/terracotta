import type { JSX } from '@solidjs/web';
import { Button } from 'terracotta/button';
import { Toolbar } from 'terracotta/toolbar';

const ACTIONS = ['Bold', 'Italic', 'Underline'];

export default function ToolbarCase(): JSX.Element {
  return (
    <div>
      <button type="button" data-testid="before">
        Before
      </button>
      <Toolbar>
        {ACTIONS.map((action) => (
          <Button>{action}</Button>
        ))}
      </Toolbar>
      <button type="button" data-testid="after">
        After
      </button>
    </div>
  );
}
