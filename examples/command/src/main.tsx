import { render } from 'solid-js/web';
import './style.css';
import SingleSelect from './SingleSelect';
import MultiSelect from './MultiSelect';

function Root() {
  return (
    <div class="bg-gradient-to-r from-amber-300 to-orange-500 w-screen h-screen flex overflow-hidden">
      <div class="flex gap-4 items-center justify-center w-full">
        <SingleSelect />
        {/* <MultiSelect /> */}
      </div>
    </div>
  );
}

const app = document.getElementById('app');

if (app) {
  render(() => <Root />, app);
}
