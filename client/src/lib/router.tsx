import React, { useContext, useEffect, useState, PropsWithChildren, useCallback } from 'react';
import { createContext } from 'react';

type RouterContextType = {
  currentPathname: string;
  setCurrentPath: React.Dispatch<React.SetStateAction<string>>;
  routeInfo: MatchResult;
  history: History;
};

type RouterProps = PropsWithChildren<{
  basename?: string;
}>;

type RouteProps = PropsWithChildren<{
  component?: React.ComponentType;
  exact?: boolean;
  path: string;
}>;

type LinkProps = PropsWithChildren<{
  to: string;
}>;

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
  paths: string[];
  currentPaths: string[];
};

const RouterContext = createContext({} as RouterContextType);

export const Router = (props: RouterProps): React.ReactElement => {
  const initialPath = window.location.pathname;
  const [currentPathname, setCurrentPath] = useState(initialPath);
  const { children } = props;
  const { history } = window;
  const routeInfo = { isMatch: true, keys: {} };

  const handlePopState = useCallback((event: PopStateEvent) => {
    event.preventDefault();
    const path = window.location.pathname;
    setCurrentPath(path);
  }, []);

  useEffect(() => {
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [handlePopState]);

  return (
    <RouterContext.Provider value={{ history, currentPathname, setCurrentPath, routeInfo }}>
      {children}
    </RouterContext.Provider>
  );
};
3;

export const Route = (props: RouteProps): React.ReactElement | null => {
  const context = useContext(RouterContext);
  const { currentPathname } = context;
  const { path, component, exact = false, children } = props;
  const matchResult = matchPath({ pathname: path, currentPathname, exact });

  if (!matchResult.isMatch) {
    return null;
  }

  if (children) {
    return (
      <RouterContext.Provider value={Object.assign(context, { routeInfo: matchResult })}>
        {children}
      </RouterContext.Provider>
    );
  }

  if (component) {
    const value = React.createElement(component, {});
    if (value === undefined) {
      throw new Error('Component는 react element 또는 null을 반환해야 합니다.');
    }
    return (
      <RouterContext.Provider value={Object.assign(context, { routeInfo: matchResult })}>
        {value}
      </RouterContext.Provider>
    );
  }

  return null;
};

export const Link = (props: LinkProps): React.ReactElement => {
  const { setCurrentPath } = useContext(RouterContext);
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

export const useParams = (): { [key: string]: string } => {
  const { routeInfo } = useContext(RouterContext);
  return routeInfo.keys || {};
};

const removeUrlQuery = (pathname: string) => {
  return pathname.split('?')[0];
};

const compilePath = (params: CompilePathParams) => {
  const { paths, currentPaths } = params;

  let result = { isMatch: true } as MatchResult;

  for (const [index, path] of Object.entries(paths)) {
    const currentPath = currentPaths[+index];
    const isPathParam = path.includes(':');

    if (!isPathParam && path !== currentPath) {
      return { isMatch: false };
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

  const paths = pathname.split('/').filter((e) => e !== '');
  const currentPaths = removeUrlQuery(currentPathname)
    .split('/')
    .filter((e) => e !== '');

  if (currentPaths.length < paths.length) {
    return { isMatch: false };
  }

  if (exact && currentPaths.length !== paths.length) {
    return { isMatch: false };
  }

  return compilePath({ currentPaths, paths });
};
