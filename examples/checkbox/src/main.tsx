import type { JSX } from '@solidjs/web';
import { render } from '@solidjs/web';
import App from './App';

import './style.css';

function Root(): JSX.Element {
  return (
    <div class="bg-linear-to-r from-pink-400 to-fuchsia-500 w-screen h-screen flex overflow-hidden">
      <div class="flex flex-col items-center justify-center w-full">
        <App />
      </div>
    </div>
  );
}

const app = document.getElementById('app');

if (app) {
  render(() => <Root />, app);
}
