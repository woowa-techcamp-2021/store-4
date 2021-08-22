import { getCustomRepository } from 'typeorm';
import ProductNotOrderedException from '../exceptions/product-notordered-exception';
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
  async postReview({ userId, point, content, productId }: PostReviewQuery): Promise<void> {
    const { orders } = await getCustomRepository(UserRepository).findOneOrFail(userId, {
      relations: ['orders', 'orders.orderDetails', 'orders.orderDetails.product'],
    });

    const productIdsOrderedByUser = Array.from(
      orders.flatMap((order) => order.orderDetails.map((orderDetail) => orderDetail.product?.id))
    );

    if (!productIdsOrderedByUser.includes(productId)) {
      throw new ProductNotOrderedException(ERROR_MESSAGES['PRODUCT_NOT_ORDERED']);
    }
  }
}

export default new ReviewService();
