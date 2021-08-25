import { getCustomRepository } from 'typeorm';
import ProductNotfoundException from '../exceptions/product-notfound-exception';
import ProductNotOrderedException from '../exceptions/product-notordered-exception';
import ReviewNotfoundException from '../exceptions/review-notfound-exception';
import ReviewNotWrittenByUserException from '../exceptions/review-notwrittenbyuser-exception';
import UserNotfoundException from '../exceptions/user-notfound-exception';
import Review from '../models/review';
import ProductRepository from '../repositories/product-repository';
import ReviewImageRepository from '../repositories/review-image-repository';
import ReviewRepository from '../repositories/review-repository';
import UserRepository from '../repositories/user-repository';
import { isNone } from '../util/type-guard';
import ReviewPost from '../validations/review-post';

type DeleteReviewQuery = {
  userId: number;
  reviewIds: number[];
};

const ERROR_MESSAGES = {
  PRODUCT_NOT_ORDERED: '해당 상품 구매내역이 없습니다',
  PRODUCT_NOT_FOUND: '해당 상품이 존재하지 않습니다',
  REVIEW_NOT_FOUND: '리뷰가 존재하지 않습니다',
  REVIEW_NOT_WRITTEN_BY_USER: '해당 리뷰에 대한 권한이 없습니다',
  USER_NOT_FOUND: '유저가 존재하지 않습니다',
};

class ReviewService {
  async getReviewByUser(userId: number): Promise<Review[]> {
    const user = await getCustomRepository(UserRepository).findOne(userId);

    if (isNone(user)) {
      throw new UserNotfoundException(ERROR_MESSAGES['USER_NOT_FOUND']);
    }

    return getCustomRepository(ReviewRepository).findByUser(userId);
  }

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

    const product = await getCustomRepository(ProductRepository).findOne(productId);

    if (isNone(product)) {
      throw new ProductNotfoundException(ERROR_MESSAGES['PRODUCT_NOT_FOUND']);
    }

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

  async deleteReview({ userId, reviewIds }: DeleteReviewQuery): Promise<void> {
    const reviews = await getCustomRepository(ReviewRepository).findByIds(reviewIds, {
      relations: ['user'],
    });

    if (reviews.some((review) => isNone(review))) {
      throw new ReviewNotfoundException(ERROR_MESSAGES['REVIEW_NOT_FOUND']);
    }

    if (reviews.some((review) => review.user?.id !== userId)) {
      throw new ReviewNotWrittenByUserException(ERROR_MESSAGES['REVIEW_NOT_WRITTEN_BY_USER']);
    }

    getCustomRepository(ReviewRepository).delete(reviewIds);
  }
}

export default new ReviewService();
