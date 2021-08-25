import React from 'react';
import { render, screen } from '@testing-library/react';
import OAuthButton from './OAuthButton';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import provideTheme2Test from '../../lib/provideTheme2Test';

describe('OAuthButton 컴포넌트', () => {
  const onClick = jest.fn();
  const CONTENT = 'oauthButton';
  const props = { content: CONTENT };

  beforeEach(() => {
    render(provideTheme2Test(<OAuthButton index={0} {...props} onClick={onClick} />));
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
