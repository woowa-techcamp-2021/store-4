import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import OAuthButton from './OAuthButton';
import FACEBOOK from './facebook.svg';
import GOOGLE from './google.svg';

enum OAuthType {
  Facebook,
  Google,
}

const Header = styled.h1`
  font-size: 24px;
  font-weight: normal;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const OAuthButtonWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
`;

const Login = (): JSX.Element => {
  const handleOAuthButtonClick = useCallback((redirectURL: string) => {
    return () => (location.href = redirectURL);
  }, []);

  const BUTTON_PROPS = useMemo(
    () => ({
      [OAuthType.Facebook]: {
        backgroundColor: '#4267b2',
        fontColor: '#ffffff',
        icon: FACEBOOK,
        content: '페이스북으로 로그인',
        onClick: handleOAuthButtonClick(`${process.env.SERVER_URL}/auth/facebook-login`),
      },
      [OAuthType.Google]: {
        backgroundColor: '#EA4335',
        fontColor: '#ffffff',
        icon: GOOGLE,
        content: '구글로 로그인',
        onClick: handleOAuthButtonClick(`${process.env.SERVER_URL}/auth/google-login`),
      },
    }),
    [handleOAuthButtonClick]
  );

  return (
    <LoginContainer>
      <Header>회원 로그인</Header>
      <OAuthButtonWrapper>
        <OAuthButton {...BUTTON_PROPS[OAuthType.Facebook]} />
        <OAuthButton {...BUTTON_PROPS[OAuthType.Google]} />
      </OAuthButtonWrapper>
    </LoginContainer>
  );
};

export default Login;
