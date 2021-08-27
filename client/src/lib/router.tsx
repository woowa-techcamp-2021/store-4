import React, {
  useContext,
  useEffect,
  useState,
  PropsWithChildren,
  useCallback,
  createContext,
} from 'react';
import { isNone, isNotNone } from '../utils/typeGuard';

type RouterContextType = {
  currentPathname: string;
  setCurrentPath: React.Dispatch<React.SetStateAction<string>>;
  routeInfo: MatchResult;
  history: HistoryType;
};

type RouterProps = PropsWithChildren<{
  basename?: string;
}>;

type RouteProps = PropsWithChildren<{
  component?: React.ComponentType;
  exact?: boolean;
  path: string;
  matchResult?: MatchResult;
}>;

type SwitchProps = {
  children?: React.ReactNode;
};

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
  pathParams?: { [key: string]: string };
};

type CompilePathParams = {
  paths: string[];
  currentPaths: string[];
};

type HistoryType = {
  push: (pathname: string) => void;
};

const RouterContext = createContext({} as RouterContextType);

/**
 * window에 popState 함수를 등록하고, RouterContext에 currentPathname, setCurrentPath, routeInfo, handleHistoryPush 지정
 * @param {RouterProps} props
 * @param {ReactNode} props.children
 * @returns
 */

export const Router = (props: RouterProps): React.ReactElement => {
  const initialPath = `${window.location.pathname}${window.location.search}`;
  const [currentPathname, setCurrentPath] = useState(initialPath);
  const { children } = props;
  const { history } = window;
  const routeInfo = { isMatch: true, keys: {} };
  initialPath;

  const handlePopState = useCallback((event: PopStateEvent) => {
    event.preventDefault();
    const path = `${window.location.pathname}${window.location.search}`;
    setCurrentPath(path);
  }, []);

  useEffect(() => {
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [handlePopState]);

  const handleHistoryPush = useCallback(
    (pathname: string) => {
      history.pushState({}, pathname, window.location.origin + pathname);
      setCurrentPath(pathname);
    },
    [history]
  );

  return (
    <RouterContext.Provider
      value={{
        history: {
          push: handleHistoryPush,
        },
        currentPathname,
        setCurrentPath,
        routeInfo,
      }}
    >
      {children}
    </RouterContext.Provider>
  );
};

/**
 component?: React.ComponentType;
  exact?: boolean;
  path: string;
  matchResult?: MatchResult;
 */

/**
 * path와 currentPath를 비교해서 matching이 된다면 children, component를 반환하는 컴포넌트(우선순위: children > component)
 * @param {RouterProps} props
 * @param {string} props.path
 * @param {boolean} props.exact - true인 경우 path를 엄격하게 비교 currentPath와 path가 완전히 같아야 matching, false인 경우는 currentPath에 path가 포함이면 matching.
 * @param {MatchResult} props.matchResult
 * @param {boolean} matchResult.isMatch - path와 currentPath를 비교해서 matching되는 route인지에 대한 boolean 값
 * @param {object} matchResult.pathparams - ex. { postId : "1" }로 path Parameter들을 가지고 있는 객체
 * @param {ComponentType} props.component - route에 매칭되면 렌더링할 component
 * @param {ReactNode} props.children - route에 매칭되면 렌더링할 children
 * @returns
 */
export const Route = (props: RouteProps): React.ReactElement | null => {
  const context = useContext(RouterContext);
  const { currentPathname } = context;
  const { path, component, exact = false, children } = props;
  const matchResult = props.matchResult || matchPath({ pathname: path, currentPathname, exact });

  if (!matchResult.isMatch) {
    return null;
  }

  if (isNotNone(children)) {
    return (
      <RouterContext.Provider value={{ ...context, routeInfo: matchResult }}>
        {children}
      </RouterContext.Provider>
    );
  }

  if (isNotNone(component)) {
    const reactElement = React.createElement(component, {});
    if (reactElement === undefined) {
      throw new Error('Component는 react element 또는 null을 반환해야 합니다.');
    }
    return (
      <RouterContext.Provider value={{ ...context, routeInfo: matchResult }}>
        {reactElement}
      </RouterContext.Provider>
    );
  }

  return null;
};

/**
 * 자식인 Route 컴포넌트들 중 처음으로 matching되는 Route 컴포넌트를 반환하는 컴포넌트
 * @param {SwitchProps} props
 * @param {ReactNode} props.children - Route 컴포넌트(들)
 * @returns
 */

export const Switch = (props: SwitchProps): React.ReactElement => {
  const { children } = props;
  const context = useContext(RouterContext);
  const { currentPathname } = context;

  const childArr = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const { path, exact } = child.props;
      const matchResult = matchPath({ currentPathname, pathname: path, exact });
      return { child, matchResult };
    }
    return {};
  });

  if (isNone(childArr)) {
    return <></>;
  }

  if (childArr.length === 0) {
    return <></>;
  }

  const matchedChildren = childArr.filter(({ matchResult }) => {
    if (!matchResult) {
      return false;
    }

    return matchResult.isMatch;
  });

  if (matchedChildren.length === 0) {
    return <></>;
  }

  const { child } = matchedChildren[0];

  return <>{child}</>;
};

/**
 * props.path으로 RouteContext currentPathname을 바꾸는 컴포넌트
 * @param {LinkProps} props
 * @param {string} props.to - 이동하려고하는 path
 * @param {ReactNode} props.children
 * @returns
 */
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

/**
 * path parameter에 대한 정보를 반환하는 함수
 * @returns { [key:string]: string } - path parameters들을 가지고 있는 객체를 반환
 */
export const useParams = (): { [key: string]: string } => {
  const { routeInfo } = useContext(RouterContext);
  return routeInfo.pathParams ?? {};
};

/**
 * history 객체를 반환.
 * @returns {HistoryType} - push 메소드를 가지는 객체를 반환. push 메소드는 pathname을 받아 RouterContext currentPathname를 변경
 */
export const useHistory = (): HistoryType => {
  const { history } = useContext(RouterContext);
  return history;
};

const removeUrlQuery = (pathname: string) => {
  return pathname.split('?')[0];
};

/**
 * matchPath함수의 보조 함수로, MatchResult를 반환
 * @param {CompilePathParams} params
 * @param {string} params.currentPathname - RouterContext currentPathname
 * @param {string} params.pathname - Route component path prop
 *
 * @returns {MatchResult} - pathname, currentPathname의 매칭 상태와 path parameter들을 가지고 있는 객체
 * @param {boolean} matchResult.isMatch - path와 currentPath를 비교해서 matching되는 route인지에 대한 boolean 값
 * @param {object} matchResult.pathparams - ex. { postId : "1" }로 path Parameter들을 가지고 있는 객체
 */
const compilePath = (params: CompilePathParams) => {
  const { paths, currentPaths } = params;

  let result = { isMatch: true } as MatchResult;

  for (let index = 0; index < paths.length; index++) {
    const path = paths[index];
    const currentPath = currentPaths[index];
    const isPathParam = path.includes(':');

    if (!isPathParam && path !== currentPath) {
      return { isMatch: false };
    }

    if (isPathParam) {
      const pathParam = path.slice(1);
      const { pathParams } = result;

      if (isNotNone(pathParams)) {
        const newPathParamsObject = {
          ...pathParams,
          [pathParam]: currentPath,
        };

        result = { ...result, pathParams: newPathParamsObject };
      } else {
        result = { ...result, pathParams: { [pathParam]: currentPath } };
      }
    }
  }

  return result;
};

/**
 * RouterContext currentPathname과 Route path props를 비교해서 매칭여부와 path parameter가 존재한다면 path parameter들을 반환
 * @param params
 * @param {string} params.currentPathname - 현재 RouterContext의 currentPathname
 * @param {string} params.pathname - 등록된 Route의 path
 * @param {boolean} param.exact - Route exact props 엄격한 검사의 유무(기본값 false)
 *
 * @returns {MatchResult} - pathname, currentPathname의 매칭 상태와 path parameter들을 가지고 있는 객체
 * @param {boolean} matchResult.isMatch - path와 currentPath를 비교해서 matching되는 route인지에 대한 boolean 값
 * @param {object} matchResult.pathparams - ex. { postId : "1" }로 path Parameter들을 가지고 있는 객체
 */
export const matchPath = (params: MatchPathParams): MatchResult => {
  const { currentPathname, pathname, exact = false } = params;

  const paths = pathname
    .split('?')[0]
    .split('/')
    .filter((path) => path !== '');
  const currentPaths = removeUrlQuery(currentPathname)
    .split('/')
    .filter((path) => path !== '');

  if (currentPaths.length < paths.length) {
    return { isMatch: false };
  }

  if (exact && currentPaths.length !== paths.length) {
    return { isMatch: false };
  }

  return compilePath({ currentPaths, paths });
};
