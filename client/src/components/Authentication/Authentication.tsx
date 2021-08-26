import React from 'react';
import { createContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from '../../lib/router';
import toast from '../../lib/toast';
import userStore from '../../stores/userStore';
import { isNone } from '../../utils/typeGuard';

type Props = {
  children: JSX.Element | JSX.Element[];
};

type AuthenticationContextType = {
  onErrorOccurred: () => void;
};

export const AuthenticationContext = createContext({} as AuthenticationContextType);

const AuthenticationProvider = ({ children }: Props): JSX.Element => {
  const [isErrorOccurred, setIsErrorOccurred] = useState(false);
  const routerHistory = useHistory();

  const handleOccurred = () => {
    console.log('pass');
    setIsErrorOccurred(true);
  };

  useEffect(() => {
    if (isNone(localStorage.getItem('token'))) {
      toast.error('로그인이 필요합니다');
      history.back();
    }
  }, []);

  useEffect(() => {
    if (isErrorOccurred) {
      toast.error('세션이 만료되었습니다');
      userStore.logoutUser();
      routerHistory.push('/login');
    }
  }, [isErrorOccurred, routerHistory]);

  const value = {
    onErrorOccurred: handleOccurred,
  };

  return <AuthenticationContext.Provider value={value}>{children}</AuthenticationContext.Provider>;
};

export default AuthenticationProvider;
