import React from 'react';
import { render } from '@testing-library/react';
import Login from './Login';

describe('Login 컴포넌트', () => {
  test('facebook 버튼 UI', () => {
    const login = render(<Login />);

    login.getByText('페이스북으로 로그인');
  });

  test('google 버튼 UI', () => {
    const login = render(<Login />);

    login.getByText('구글로 로그인');
  });
});
