import { JSX } from 'solid-js';
import { Link, AppProps } from 'rigidity';
import { Dynamic } from 'solid-js/web';
import styles from '../styles/main.css?url';

export default function App(props: AppProps): JSX.Element {
  return (
    <>
      <Link rel="stylesheet" href={styles} />
      <Dynamic component={props.Component} />
    </>
  );
}
