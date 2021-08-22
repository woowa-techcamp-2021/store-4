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
  {
    id: 5,
    content:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis sed tempora aspernatur sequi molestias nulla voluptatum iusto impedit error consectetur?',
    point: 3,
    reviewImages: [
      'https://source.unsplash.com/random/600x400',
      'https://source.unsplash.com/random/400x300',
    ],
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
  },
  {
    id: 6,
    content:
      'r sit, amet consectetur adipisicing elit. Facilis sed tempora aspernatur sequi molestias nulla voluptatum',
    point: 3,
    reviewImages: [
      'https://source.unsplash.com/random/600x500',
      'https://source.unsplash.com/random/500x400',
    ],
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4),
  },
  {
    id: 7,
    content:
      'um dolor sit, amet consectetur adipisicing elit. Facilis sed tempora aspernatur sequi molestias nulla voluptatum iusto impedit error consect',
    point: 4,
    reviewImages: [
      'https://source.unsplash.com/random/600x400',
      'https://source.unsplash.com/random/400x300',
    ],
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4.5),
  },
  {
    id: 8,
    content: 'olor sit, amet consecte',
    point: 4,
    reviewImages: [],
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
  },
  {
    id: 9,
    content: 'amet consectetur adipisicing elit. Facilis sed tempora aspernatur sequi molestias ',
    point: 2,
    reviewImages: [
      'https://source.unsplash.com/random/600x400',
      'https://source.unsplash.com/random/400x300',
    ],
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
  },
  {
    id: 10,
    content: 'sed tempora aspernatur sequi molestias',
    point: 5,
    reviewImages: [],
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 50),
  },
];

const ReviewConatiner = (): JSX.Element => {
  return <Review reviews={mockReviewData} />;
};

export default ReviewConatiner;
