import './style.css';

import type { JSX } from 'solid-js';

import logoUrl from '../../assets/logo.svg';

export default function Layout(props: { children?: JSX.Element }) {
  return (
    <>
      <img src={logoUrl} height={64} width={64} alt="logo" />
      {props.children}
    </>
  );
}
