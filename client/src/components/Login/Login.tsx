import React from 'react';
import styled from 'styled-components';
import { OAuthType } from '../../containers/LoginContainer';
import OAuthButton from './OAuthButton';

const Header = styled.h1`
  color: ${(props) => props.theme.color.grey5};
  font-size: ${(props) => props.theme.fontSize.large};
`;

const SocialLoginText = styled.div`
  color: ${(props) => props.theme.color.grey3};
  font-size: ${(props) => props.theme.fontSize.small};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`;

const OAuthButtonWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
`;

type Props = {
  onOAuthButtonClick: (redirectURL: string) => React.MouseEventHandler;
  buttons: {
    [key: string]: {
      content: string;
      redirectURL: string;
    };
  };
};

const Login = (props: Props): JSX.Element => {
  const { onOAuthButtonClick, buttons } = props;

  return (
    <Container>
      <Header>회원 로그인</Header>
      <SocialLoginText>소셜계정으로 간편하게 가입하세요</SocialLoginText>
      <OAuthButtonWrapper>
        <OAuthButton
          index={0}
          onClick={onOAuthButtonClick(buttons[OAuthType.Facebook].redirectURL)}
          {...buttons[OAuthType.Facebook]}
        />
        <OAuthButton
          index={1}
          onClick={onOAuthButtonClick(buttons[OAuthType.Google].redirectURL)}
          {...buttons[OAuthType.Google]}
        />
        <OAuthButton
          index={2}
          onClick={onOAuthButtonClick(buttons[OAuthType.Demo].redirectURL)}
          {...buttons[OAuthType.Demo]}
        />
      </OAuthButtonWrapper>
    </Container>
  );
};

export default Login;
