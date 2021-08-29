import React, { useEffect } from 'react';
import toast from '../lib/toast';
import LoginPage from '../pages/Login';
import userStore from '../stores/userStore';
import { observer } from 'mobx-react';
import { useHistory } from '../lib/router';

const withAuthentication = <P,>(
  WrappedComponent: React.ComponentType<P>
): ((props: P) => JSX.Element) => {
  const WithAuth = (props: P) => {
    const { user, status } = userStore;
    const history = useHistory();

    useEffect(() => {
      if (status === 'DONE' && user === null) {
        toast.info('로그인이 필요합니다');
        history.replace('/login');
      }
    }, [status, user, history]);

    if (status !== 'DONE') {
      return <></>;
    }

    if (user === null) {
      return <LoginPage />;
    }

    return <WrappedComponent {...props} />;
  };

  return observer(WithAuth);
};

export default withAuthentication;
