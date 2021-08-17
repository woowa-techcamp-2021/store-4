import { getCustomRepository } from 'typeorm';
import ReviewRepository from '../repositories/review-repository';
import ProductRepository from '../repositories/product-repository';

type ReviewData = {
  content: string;
  point: number;
  productId: string;
};

export const insertDummyReviewData = async (): Promise<void> => {
  const products = await Promise.all(
    data.map(({ productId }) => getCustomRepository(ProductRepository).findOne(productId))
  );

  const reviewRepository = getCustomRepository(ReviewRepository);

  const reviews = reviewRepository.create(
    data.map((review, index) => ({
      content: review.content,
      point: review.point,
      product: products[index],
    }))
  );

  await reviewRepository.save(reviews);
};

const data: ReviewData[] = [
  {
    content: '좋아요',
    point: 5,
    productId: '1',
  },
  {
    content: '좋아요',
    point: 4,
    productId: '1',
  },
  {
    content: '별로에요',
    point: 3,
    productId: '1',
  },
  {
    content: '좋아요',
    point: 5,
    productId: '2',
  },
  {
    content: '좋아요',
    point: 4,
    productId: '2',
  },
  {
    content: '좋아요',
    point: 4,
    productId: '2',
  },
  {
    content: '좋아요',
    point: 4,
    productId: '2',
  },
  {
    content: '좋아요',
    point: 4,
    productId: '2',
  },
  {
    content: '별로에요',
    point: 3,
    productId: '3',
  },
  {
    content: '별로에요',
    point: 1,
    productId: '3',
  },
];
