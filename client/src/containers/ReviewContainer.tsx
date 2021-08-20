import React from 'react';
import Review from '../components/Review/Review';

export type Mock = {
  id: number;
  content: string;
  point: number;
  reviewImages: string[];
  updatedAt: Date;
};
const mockReviewData: Mock[] = [
  {
    id: 1,
    content:
      '상당히 마음에 듭니다. 더 살지 고민이에요. 너무 좋아요 하하하하하. 고민 중이라면 그냥 사세요. 두 번 사세요. 세 번 사세요.',
    point: 5,
    reviewImages: ['https://source.unsplash.com/random/300x400'],
    updatedAt: new Date(),
  },
  {
    id: 2,
    content: '별로에요 별로에요 별로에요 별로에요',
    point: 2,
    reviewImages: [],
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
  {
    id: 3,
    content: '좋아요',
    point: 4,
    reviewImages: ['https://source.unsplash.com/random/700x500'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
  },
  {
    id: 4,
    content: '그냥저냥',
    point: 3,
    reviewImages: [
      'https://source.unsplash.com/random/600x400',
      'https://source.unsplash.com/random/400x300',
    ],
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
  },
];

const ReviewConatiner = (): JSX.Element => {
  return <Review reviews={mockReviewData} />;
};

export default ReviewConatiner;
