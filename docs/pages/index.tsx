import { Meta, Title } from 'rigidity';
import { JSX } from 'solid-js';
import BashSnippet from '../components/BashSnippet';
import MainShell from '../components/MainShell';
import Preview from '../components/Preview';
import Separator from '../components/Separator';
import WindowPreview from '../components/WindowPreview';

function IndexHead() {
  return (
    <>
      <Title>solid-headless</Title>
      <Meta name="title" content="Meta Tags — Preview, Edit and Generate" />
      <Meta name="description" content="With Meta Tags you can edit and experiment with your content then preview how your webpage will look on Google, Facebook, Twitter and more!" />
      <Meta property="og:type" content="website" />
      <Meta property="og:url" content="https://metatags.io/" />
      <Meta property="og:title" content="Meta Tags — Preview, Edit and Generate" />
      <Meta property="og:description" content="With Meta Tags you can edit and experiment with your content then preview how your webpage will look on Google, Facebook, Twitter and more!" />
      <Meta property="og:image" content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png" />
      <Meta property="twitter:card" content="summary_large_image" />
      <Meta property="twitter:url" content="https://metatags.io/" />
      <Meta property="twitter:title" content="Meta Tags — Preview, Edit and Generate" />
      <Meta property="twitter:description" content="With Meta Tags you can edit and experiment with your content then preview how your webpage will look on Google, Facebook, Twitter and more!" />
      <Meta property="twitter:image" content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png" />
    </>
  );
}

export default function Index(): JSX.Element {
  cleanup: {
    console.log('Unmounted!');
  }
  return (
    <MainShell>
      <IndexHead />
      <div class="flex flex-col m-4 space-y-8">
        <div class="flex flex-col space-y-4 md:flex-row-reverse md:space-x-4 md:space-x-reverse">
          <div class="flex-1 flex items-center justify-center">
            <WindowPreview src="/preview/dialog" canonical="/component/dialog" />
          </div>
          <div class="flex-1 flex flex-col space-y-4">
            <span class="text-6xl md:text-8xl font-bold">Headless UI for SolidJS</span>
            <p class="text-xl">Unstyled, accessible, composable components</p>
            <div class="flex flex-col space-y-2">
              <BashSnippet code="npm i solid-headless" />
              <BashSnippet code="yarn add solid-headless" />
              <BashSnippet code="pnpm add solid-headless" />
            </div>
          </div>
        </div>
        <Separator />
      </div>
    </MainShell>
  );
}
