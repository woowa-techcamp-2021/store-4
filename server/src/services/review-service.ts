import { getCustomRepository } from 'typeorm';
import ProductNotOrderedException from '../exceptions/product-notordered-exception';
import ReviewNotfoundException from '../exceptions/review-notfound-exception';
import ReviewNotWrittenByUserException from '../exceptions/review-notwrittenbyuser-exception';
import Review from '../models/review';
import ProductRepository from '../repositories/product-repository';
import ReviewImageRepository from '../repositories/review-image-repository';
import ReviewRepository from '../repositories/review-repository';
import UserRepository from '../repositories/user-repository';
import { isNone } from '../util/type-guard';
import ReviewPost from '../validations/review-post';

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
  async postReview({
    userId,
    productId,
    point,
    content,
    imageLocations,
  }: ReviewPost): Promise<Review> {
    const user = await getCustomRepository(UserRepository).findWithProduct(userId, productId);

    if (isNone(user)) {
      throw new ProductNotOrderedException(ERROR_MESSAGES['PRODUCT_NOT_ORDERED']);
    }

    const product = await getCustomRepository(ProductRepository).findOneOrFail(productId);

    const review = await getCustomRepository(ReviewRepository).save({
      user,
      point,
      content,
      product,
    });

    await Promise.all(
      imageLocations.map((url) => getCustomRepository(ReviewImageRepository).save({ review, url }))
    );

    return review;
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

    getCustomRepository(ReviewRepository).delete(reviewId);
  }
}

export default new ReviewService();
