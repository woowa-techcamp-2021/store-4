import React, { useCallback } from 'react';
import Login from '../components/Login/Login';
import FACEBOOK from '../assets/icons/facebook.svg';
import GOOGLE from '../assets/icons/google.svg';
import theme from '../styles/theme';

export enum OAuthType {
  Facebook,
  Google,
}

const FACEBOOK_COLOR = '#4267b2';
const GOOGLE_COLOR = '#EA4335';

const BUTTONS = {
  [OAuthType.Facebook]: {
    backgroundColor: FACEBOOK_COLOR,
    fontColor: theme.color.white1,
    icon: FACEBOOK,
    content: '페이스북으로 로그인',
    redirectURL: `${process.env.SERVER_URL}/auth/facebook-login`,
  },
  [OAuthType.Google]: {
    backgroundColor: GOOGLE_COLOR,
    fontColor: theme.color.white1,
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
