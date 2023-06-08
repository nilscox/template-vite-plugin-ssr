import React, { useContext } from 'react';

import { PageContextClient } from './types';

type PageContext = Pick<PageContextClient, 'urlPathname'>;

const pageContext = React.createContext<PageContext>(null as never);

type PageContextProviderProps = {
  context: PageContext;
  children: React.ReactNode;
};

export const PageContextProvider = ({ context, children }: PageContextProviderProps) => (
  <pageContext.Provider value={context}>{children}</pageContext.Provider>
);

const usePageContext = () => {
  const context = useContext(pageContext);

  console.assert(context, 'Missing page context provider');

  return context;
};

export const usePathname = () => {
  return usePageContext().urlPathname;
};
