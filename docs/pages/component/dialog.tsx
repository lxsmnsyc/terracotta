import { JSX } from 'solid-js';
import MainShell from '../../components/MainShell';
import WindowPreview from '../../components/WindowPreview';

export default function DialogPage(): JSX.Element {
  cleanup: {
    console.log('Unmounted!');
  }
  return (
    <MainShell>
      <div class="w-full h-[75vh]">
        <WindowPreview src="/preview/dialog" canonical="/component/dialog" />
      </div>
    </MainShell>
  );
}
