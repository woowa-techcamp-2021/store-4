import React, { useContext, useEffect, useState, PropsWithChildren } from 'react';
import { createContext } from 'react';

type HistoryContextType = {
  currentPathname: string;
  setCurrentPath: React.Dispatch<React.SetStateAction<string>>;
  history: History;
};

const HistoryContext = createContext({} as HistoryContextType);

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

export const Router = (props: RouterProps): React.ReactElement => {
  const initialPath = window.location.pathname;
  const [currentPathname, setCurrentPath] = useState(initialPath);
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
    <HistoryContext.Provider value={{ history, currentPathname, setCurrentPath }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const Route = (props: RouteProps): React.ReactElement | null => {
  const { currentPathname } = useContext(HistoryContext);
  const { path, component, exact = false, children } = props;
  const { isMatch } = matchPath({ pathname: path, currentPathname, exact });

  if (!isMatch) {
    return null;
  }

  if (children) {
    return <>{children}</>;
  }

  if (component) {
    const value = React.createElement(component, {});
    if (value === undefined) {
      throw new Error('Component는 react element 또는 null을 반환해야 합니다.');
    }
    return value;
  }

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
  paths: string[];
  currentPaths: string[];
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

  console.log(paths, currentPaths);

  if (exact && currentPaths.length !== paths.length) {
    return { isMatch: false };
  }

  return compilePath({ currentPaths, paths });
};
