import { createMemo } from 'solid-js';
import { usePageContext } from 'vike-solid/usePageContext';

export function Link(props: {
  href: string;
  class?: string;
  activeClass?: string;
  children: string;
}) {
  const pageContext = usePageContext();

  const isActive = createMemo(() =>
    props.href === '/'
      ? pageContext.urlPathname === props.href
      : pageContext.urlPathname.startsWith(props.href),
  );

  return (
    <a
      href={props.href}
      class={`${props.class}${isActive() && props.activeClass ? ` ${props.activeClass}` : ''}`}
    >
      {props.children}
    </a>
  );
}
