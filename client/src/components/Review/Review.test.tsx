import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import provideTheme2Test from '../../lib/provideTheme2Test';
import Review, { REVIEW_PER_PAGE } from './Review';
import userEvent from '@testing-library/user-event';
import ReviewModel from '../../models/review';

describe('Review 컴포넌트 테스트: 상품후기 없을 때', () => {
  const mockReviewData: ReviewModel[] = [];

  beforeEach(() => {
    render(provideTheme2Test(<Review reviews={mockReviewData} />));
  });

  test('상품후기 개수 badge 랜더링', () => {
    expect(screen.getByTestId('review-badge').textContent).toBe('0');
  });

  test('상품후기 없음 표시', () => {
    expect(screen.getByTestId('no-review')).toBeInTheDocument();
  });
});

describe('Review 컴포넌트 테스트', () => {
  const mockReviewData: ReviewModel[] = [
    {
      id: 1,
      content:
        '상당히 마음에 듭니다. 더 살지 고민이에요. 너무 좋아요 하하하하하. 고민 중이라면 그냥 사세요. 두 번 사세요. 세 번 사세요.',
      point: 5,
      reviewImages: [{ id: 1, url: 'https://source.unsplash.com/random/300x400' }],
      updatedAt: new Date(),
      createdAt: new Date(),
    },
    {
      id: 2,
      content: '별로에요 별로에요 별로에요 별로에요',
      point: 2,
      reviewImages: [],
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
      createdAt: new Date(),
    },
    {
      id: 3,
      content: '좋아요',
      point: 4,
      reviewImages: [{ id: 2, url: 'https://source.unsplash.com/random/700x500' }],
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
      createdAt: new Date(),
    },
    {
      id: 4,
      content: '그냥저냥',
      point: 3,
      reviewImages: [
        { id: 3, url: 'https://source.unsplash.com/random/600x400' },
        { id: 4, url: 'https://source.unsplash.com/random/400x300' },
      ],
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
      createdAt: new Date(),
    },
    {
      id: 5,
      content:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis sed tempora aspernatur sequi molestias nulla voluptatum iusto impedit error consectetur?',
      point: 3,
      reviewImages: [
        { id: 5, url: 'https://source.unsplash.com/random/600x400' },
        { id: 6, url: 'https://source.unsplash.com/random/400x300' },
      ],
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
      createdAt: new Date(),
    },
    {
      id: 6,
      content:
        'r sit, amet consectetur adipisicing elit. Facilis sed tempora aspernatur sequi molestias nulla voluptatum',
      point: 3,
      reviewImages: [
        { id: 7, url: 'https://source.unsplash.com/random/600x500' },
        { id: 8, url: 'https://source.unsplash.com/random/500x400' },
      ],
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4),
      createdAt: new Date(),
    },
    {
      id: 7,
      content:
        'um dolor sit, amet consectetur adipisicing elit. Facilis sed tempora aspernatur sequi molestias nulla voluptatum iusto impedit error consect',
      point: 4,
      reviewImages: [
        { id: 9, url: 'https://source.unsplash.com/random/600x400' },
        { id: 10, url: 'https://source.unsplash.com/random/400x300' },
      ],
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4.5),
      createdAt: new Date(),
    },
  ];

  beforeEach(() => {
    render(provideTheme2Test(<Review reviews={mockReviewData} />));
  });

  test('상품후기 개수 badge 랜더링', () => {
    expect(screen.getByTestId('review-badge').textContent).toBe(String(mockReviewData.length));
  });

  test('상품후기 목록 첫 페이지 랜더링', () => {
    expect(screen.getAllByTestId('review-list-item').length).toBe(REVIEW_PER_PAGE);
  });

  test('Pagination 숫자 버튼 랜더링', () => {
    expect(screen.getByTestId('pagination-button-list').childNodes.length).toBe(
      Math.ceil(mockReviewData.length / REVIEW_PER_PAGE)
    );
  });

  test('Pagination 숫자 버튼 기능: Page 2 클릭 -> 상품후기 개수 2개', () => {
    const pageButton2 = screen.getByTestId('number-button-2');
    userEvent.click(pageButton2);

    expect(screen.getAllByTestId('review-list-item').length).toBe(2);
  });
});
