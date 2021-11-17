import { JSX } from 'solid-js';
import { RoundedLink } from './RoundedButton';

export default function Home(): JSX.Element {
  return (
    <RoundedLink href="/" class="text-xl">solid-headless</RoundedLink>
  );
}
