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

type MatchPathParams = {
  currentPathname: string;
  pathname: string;
  exact?: boolean;
};

type MatchResult = {
  isMatch: boolean;
  keys?: { [key: string]: string };
};

type CompilePathParams = {
  exact: boolean;
  paths: string[];
  currentPaths: string[];
};

const isNone = (value: unknown): boolean => {
  return value === undefined || value === null;
};

const isNotNone = (value: unknown): boolean => {
  return !isNone(value);
};

const removeUrlQuery = (pathname: string) => {
  return pathname.split('?')[0];
};

const compilePath = (params: CompilePathParams) => {
  const { exact, paths, currentPaths } = params;
  let result = { isMatch: true } as MatchResult;

  for (const [index, pathWithQuery] of Object.entries(paths)) {
    const path = removeUrlQuery(pathWithQuery);
    const currentPath = currentPaths[+index];
    const isPathParam = path.includes(':');

    if (!isPathParam && exact && path !== currentPath) {
      return Object.assign(result, { isMatch: false });
    }

    if (isPathParam) {
      const pathParam = path.slice(1);
      const { keys } = result;
      if (keys) {
        const newKeysObject = Object.assign(keys, { [pathParam]: currentPath });
        result = Object.assign(result, { keys: newKeysObject });
      } else {
        result = Object.assign(result, { keys: { [pathParam]: currentPath } });
      }
    }
  }

  return result;
};

export const matchPath = (params: MatchPathParams): MatchResult => {
  const { currentPathname, pathname, exact = false } = params;

  const paths = pathname.split('/').filter(isNotNone);
  const currentPaths = currentPathname.split('/').filter(isNotNone);

  return compilePath({ exact, paths, currentPaths });
};
