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

  test('유저 아닌 경우 또는 상품 미구매시 모달창 열리지 않음', () => {
    const mockAuthorized = jest.fn(() => false);

    render(provideTheme2Test(<ReviewPost getAuthorization={mockAuthorized} />));
    const writeReviewButton = screen.getByText('상품후기 글쓰기');

    userEvent.click(writeReviewButton);

    expect(() => screen.getByTestId('review-post-modal')).toThrow();
  });
});

describe('Review Post 모달 테스트', () => {
  beforeEach(() => {
    const mockAuthorized = jest.fn(() => true);

    render(provideTheme2Test(<ReviewPost getAuthorization={mockAuthorized} />));
    const writeReviewButton = screen.getByText('상품후기 글쓰기');

    userEvent.click(writeReviewButton);
  });

  test('닫기 버튼 클릭시 닫힘', () => {
    const postCancelButton = screen.getByTestId('post-cancel-button');
    userEvent.click(postCancelButton);

    expect(() => screen.getByTestId('review-post-modal')).toThrow();
  });

  test('오버레이 클릭시 닫힘', () => {
    const overlay = screen.getByTestId('review-post-overlay');
    userEvent.click(overlay);

    expect(() => screen.getByTestId('review-post-modal')).toThrow();
  });

  test('모달 클릭시 닫히지 않음', () => {
    const modal = screen.getByTestId('review-post-modal');
    userEvent.click(modal);

    expect(modal).toBeInTheDocument();
  });
});
