import { getCustomRepository } from 'typeorm';
import ProductNotOrderedException from '../exceptions/product-notordered-exception';
import ReviewNotfoundException from '../exceptions/review-notfound-exception';
import ReviewNotWrittenByUserException from '../exceptions/review-notwrittenbyuser-exception';
import Review from '../models/review';
import ProductRepository from '../repositories/product-repository';
import ReviewRepository from '../repositories/review-repository';
import UserRepository from '../repositories/user-repository';
import { isNone } from '../util/type-guard';

type PostReviewQuery = {
  userId: number;
  point: number;
  content: string;
  productId: number;
};

type DeleteReviewQuery = {
  userId: number;
  reviewId: number;
};

const ERROR_MESSAGES = {
  PRODUCT_NOT_ORDERED: '해당 상품 구매내역이 없습니다',
  REVIEW_NOT_FOUND: '리뷰가 존재하지 않습니다',
  REVIEW_NOT_WRITTEN_BY_USER: '해당 리뷰에 대한 권한이 없습니다',
};

class ReviewService {
  async postReview({ userId, point, content, productId }: PostReviewQuery): Promise<Review> {
    const user = await getCustomRepository(UserRepository).findWithProduct(userId, productId);

    if (isNone(user)) {
      throw new ProductNotOrderedException(ERROR_MESSAGES['PRODUCT_NOT_ORDERED']);
    }

    const product = await getCustomRepository(ProductRepository).findOneOrFail(productId);

    return getCustomRepository(ReviewRepository).save({
      user,
      point,
      content,
      product,
      reviewImages: [],
    });
  }

  async deleteReview({ userId, reviewId }: DeleteReviewQuery): Promise<void> {
    const review = await getCustomRepository(ReviewRepository).findOne(reviewId, {
      relations: ['user'],
    });

    if (isNone(review)) {
      throw new ReviewNotfoundException(ERROR_MESSAGES['REVIEW_NOT_FOUND']);
    }

    if (review.user?.id !== userId) {
      throw new ReviewNotWrittenByUserException(ERROR_MESSAGES['REVIEW_NOT_WRITTEN_BY_USER']);
    }

    await getCustomRepository(ReviewRepository).delete(reviewId);
  }
}

export default new ReviewService();
