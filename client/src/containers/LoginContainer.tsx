import React, { useCallback } from 'react';
import Login from '../components/login/Login';
import FACEBOOK from '../assets/icons/facebook.svg';
import GOOGLE from '../assets/icons/google.svg';

export enum OAuthType {
  Facebook,
  Google,
}

const BUTTONS = {
  [OAuthType.Facebook]: {
    backgroundColor: '#4267b2',
    fontColor: '#ffffff',
    icon: FACEBOOK,
    content: '페이스북으로 로그인',
    redirectURL: `${process.env.SERVER_URL}/auth/facebook-login`,
  },
  [OAuthType.Google]: {
    backgroundColor: '#EA4335',
    fontColor: '#ffffff',
    icon: GOOGLE,
    content: '구글로 로그인',
    redirectURL: `${process.env.SERVER_URL}/auth/google-login`,
  },
};

const LoginContainer = (): JSX.Element => {
  const handleOAuthButtonClick = useCallback((redirectURL: string) => {
    return () => (location.href = redirectURL);
  }, []);

  return <Login onOAuthButtonClick={handleOAuthButtonClick} buttons={BUTTONS} />;
};

export default LoginContainer;
