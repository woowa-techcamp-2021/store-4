import React from 'react';
import ReviewModel from '../models/review';
import ReviewList from '../components/Review/ReviewList/ReviewList';

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

const AccountReviewContainer = (): JSX.Element => {
  return <ReviewList reviews={mockReviewData} />;
};

export default AccountReviewContainer;
