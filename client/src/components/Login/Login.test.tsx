import React from 'react';
import { render } from '@testing-library/react';
import Login from './Login';
import provideTheme2Test from '../../lib/provideTheme2Test';
import { OAuthType } from '../../containers/LoginContainer';

describe('Login 컴포넌트', () => {
  const FB_LOGIN_CONTENT = '페이스북';
  const GOOGLE_LOGIN_CONTENT = '구글';
  const BUTTONS = {
    [OAuthType.Facebook]: {
      backgroundColor: '#4267b2',
      fontColor: '#ffffff',
      icon: '',
      content: FB_LOGIN_CONTENT,
      redirectURL: `${process.env.SERVER_URL}/auth/facebook-login`,
    },
    [OAuthType.Google]: {
      backgroundColor: '#EA4335',
      fontColor: '#ffffff',
      icon: '',
      content: GOOGLE_LOGIN_CONTENT,
      redirectURL: `${process.env.SERVER_URL}/auth/google-login`,
    },
  };
  const handleOAuthButtonClick = jest.fn();

  beforeEach(() => {
    render(
      provideTheme2Test(<Login buttons={BUTTONS} onOAuthButtonClick={handleOAuthButtonClick} />)
    );
  });

  test(`렌더 시 onOAuthButtonClick가 ${Object.entries(BUTTONS).length}번 불러와져야한다.`, () => {
    expect(handleOAuthButtonClick).toBeCalledTimes(Object.entries(BUTTONS).length);
  });
});