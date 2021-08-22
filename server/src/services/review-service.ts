import { getCustomRepository } from 'typeorm';
import ProductNotOrderedException from '../exceptions/product-notordered-exception';
import Review from '../models/review';
import ReviewRepository from '../repositories/review-repository';
import UserRepository from '../repositories/user-repository';

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
    const user = await getCustomRepository(UserRepository).findOneOrFail(userId, {
      relations: ['orders', 'orders.orderDetails', 'orders.orderDetails.product'],
    });

    const product = (function findProductInUserOrders() {
      for (const order of user.orders) {
        for (const orderDetail of order.orderDetails) {
          if (orderDetail.product?.id === productId) {
            return orderDetail.product;
          }
        }
      }

      throw new ProductNotOrderedException(ERROR_MESSAGES['PRODUCT_NOT_ORDERED']);
    })();

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
