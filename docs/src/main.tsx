import { render } from 'solid-js/web';
import './style.css';

function Root() {
  return (
    <div className="bg-gradient-to-r from-violet-400 to-indigo-600 w-screen h-screen flex overflow-hidden">
      <div className="flex flex-col items-center justify-center w-full">
      </div>
    </div>
  );
}

const app = document.getElementById('app');

if (app) {
  render(() => <Root />, app);
}
