import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import provideTheme2Test from '../../../lib/provideTheme2Test';
import userEvent from '@testing-library/user-event';
import ReviewPost from './ReviewPost';

describe('Review Post 버튼 테스트', () => {
  test('유저인 경우 모달창 열림', () => {
    const mockAuthorized = jest.fn(() => true);

    render(provideTheme2Test(<ReviewPost getAuthorization={mockAuthorized} />));
    const writeReviewButton = screen.getByText('상품후기 글쓰기');

    userEvent.click(writeReviewButton);

    expect(screen.getByTestId('review-post-modal')).toBeInTheDocument();
  });

  test('유저인 경우 모달창 열리지 않음', () => {
    const mockAuthorized = jest.fn(() => false);

    render(provideTheme2Test(<ReviewPost getAuthorization={mockAuthorized} />));
    const writeReviewButton = screen.getByText('상품후기 글쓰기');

    userEvent.click(writeReviewButton);

    expect(() => screen.getByTestId('review-post-modal')).toThrow();
  });
});
