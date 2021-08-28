import React from 'react';
import toast from '../lib/toast';
import LoginPage from '../pages/Login';
import userStore from '../stores/userStore';
import { observer } from 'mobx-react';
import { useEffect } from 'react';

const withAuthentication = <P,>(
  WrappedComponent: React.ComponentType<P>,
  path: string
): ((props: P) => JSX.Element) => {
  const WithAuth = (props: P) => {
    const { user } = userStore;

    useEffect(() => {
      const replacePath = user === null ? 'login' : path;

      history.replaceState(null, '', `/${replacePath}`);
    }, [user]);

    if (user === null) {
      setTimeout(() => toast.info('로그인이 필요합니다'), 0);

      return <LoginPage />;
    }

    return <WrappedComponent {...props} />;
  };

  return observer(WithAuth);
};

export default withAuthentication;
