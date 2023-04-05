import { render } from 'solid-js/web';
import './style.css';
import SingleExample from './SingleExample';
import MultipleExample from './MultipleExample';

document.body.addEventListener('focusin', (e) => {
  console.log('FOCUSED', document.activeElement, e.relatedTarget);
});

document.body.addEventListener('focusout', (e) => {
  console.log('BLURRED', document.activeElement, e.relatedTarget);
});

function Root() {
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
