import React from 'react';
import styled from 'styled-components';
import { OAuthType } from '../../containers/LoginContainer';
import OAuthButton from './OAuthButton';

const Header = styled.h1`
  font-size: ${(props) => props.theme.fontSize.large};
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

type Props = {
  onOAuthButtonClick: (redirectURL: string) => React.MouseEventHandler;
  buttons: {
    [key: string]: {
      backgroundColor: string;
      fontColor: string;
      icon: string;
      content: string;
      redirectURL: string;
    };
  };
};

const Login = (props: Props): JSX.Element => {
  const { onOAuthButtonClick, buttons } = props;

  return (
    <LoginContainer>
      <Header>회원 로그인</Header>
      <OAuthButtonWrapper>
        <OAuthButton
          onClick={onOAuthButtonClick(buttons[OAuthType.Facebook].redirectURL)}
          {...buttons[OAuthType.Facebook]}
        />
        <OAuthButton
          onClick={onOAuthButtonClick(buttons[OAuthType.Google].redirectURL)}
          {...buttons[OAuthType.Google]}
        />
      </OAuthButtonWrapper>
    </LoginContainer>
  );
};

export default Login;
