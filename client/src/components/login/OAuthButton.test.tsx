import React from 'react';
import { render, screen } from '@testing-library/react';
import OAuthButton from './OAuthButton';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

describe('OAuthButton 컴포넌트', () => {
  const onClick = jest.fn();
  const CONTENT = 'oauthButton';
  const props = { icon: '', fontColor: '', backgroundColor: '', content: CONTENT };

  beforeEach(() => {
    render(<OAuthButton {...props} onClick={onClick} />);
  });

  test('OAuthButton 버튼 UI', () => {
    screen.getByText(CONTENT);
  });

  test('OAuthButton 버튼 click', () => {
    const oauthButton = screen.getByText(CONTENT);
    userEvent.click(oauthButton);

    expect(onClick).toBeCalledTimes(1);
  });
});
