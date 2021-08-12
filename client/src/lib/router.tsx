import React, { useContext, useEffect, useState, PropsWithChildren } from 'react';
import { createContext } from 'react';

type HistoryContextType = {
  currentPath: string;
  setCurrentPath: React.Dispatch<React.SetStateAction<string>>;
  history: History;
};

const HistoryContext = createContext({} as HistoryContextType);

type RouterProps = PropsWithChildren<{
  basename?: string;
}>;

type RouteProps = {
  component: () => React.ReactElement;
  exact?: boolean;
  path: string;
};

type LinkProps = PropsWithChildren<{
  to: string;
}>;

export const Router = (props: RouterProps): React.ReactElement => {
  const initialPath = window.location.pathname;
  const [currentPath, setCurrentPath] = useState(initialPath);
  const { children } = props;
  const { history } = window;

  useEffect(() => {
    window.addEventListener('popstate', (event: PopStateEvent) => {
      event.preventDefault();

      const path = window.location.pathname;
      setCurrentPath(path);
    });
  }, []);

  return (
    <HistoryContext.Provider value={{ history, currentPath, setCurrentPath }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const Route = (props: RouteProps): React.ReactElement | null => {
  const { currentPath } = useContext(HistoryContext);
  const { path, component, exact = false } = props;
  if (exact && path === currentPath) return component();
  if (currentPath.includes(path)) return component();
  return null;
};

export const Link = (props: LinkProps): React.ReactElement => {
  const { setCurrentPath } = useContext(HistoryContext);
  const { to, children } = props;
  const handleClickLink = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    history.pushState({}, '', to);
    setCurrentPath(to);
  };
  return (
    <a href={to} onClick={handleClickLink}>
      {children}
    </a>
  );
};
