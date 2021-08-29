import React, { useCallback } from 'react';
import Login from '../components/Login/Login';

export enum OAuthType {
  Facebook,
  Google,
  Demo,
}

const BUTTONS = {
  // [OAuthType.Facebook]: {
  //   content: '페이스북으로 계속하기',
  //   redirectURL: `${process.env.SERVER_URL}/auth/facebook-login`,
  // },
  [OAuthType.Google]: {
    content: '구글로 계속하기',
    redirectURL: `${process.env.SERVER_URL}/auth/google-login`,
  },
  [OAuthType.Demo]: {
    content: '시연용 계정으로 계속하기',
    redirectURL: `${process.env.SERVER_URL}/auth/demo`,
  },
};

const LoginContainer = (): JSX.Element => {
  const handleOAuthButtonClick = useCallback((redirectURL: string) => {
    return () => (location.href = redirectURL);
  }, []);

  return <Login onOAuthButtonClick={handleOAuthButtonClick} buttons={BUTTONS} />;
};

export default LoginContainer;
