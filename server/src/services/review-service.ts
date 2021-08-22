import { getCustomRepository } from 'typeorm';
import ProductNotOrderedException from '../exceptions/product-notordered-exception';
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

const ERROR_MESSAGES = {
  PRODUCT_NOT_ORDERED: '해당 상품 구매내역이 없습니다',
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
}

export default new ReviewService();
