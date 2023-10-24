import { render } from 'solid-js/web';
import type { JSX } from 'solid-js';
import './style.css';
import SingleExample from './SingleExample';
import MultipleExample from './MultipleExample';

function Root(): JSX.Element {
  return (
    <div class="bg-gradient-to-r from-amber-300 to-orange-500 w-screen h-screen flex overflow-hidden">
      <div class="flex gap-4 items-center justify-center w-full">
        <SingleExample />
        <MultipleExample />
      </div>
    </div>
  );
}

const app = document.getElementById('app');

if (app) {
  render(() => <Root />, app);
}
