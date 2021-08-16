import { getCustomRepository } from 'typeorm';
import OrderDetailRepository from '../repositories/order-detail-repository';

class OrderDetailService {
  async countTotalSalesOfProduct(productId: string): Promise<number> {
    const orderDetails = await getCustomRepository(OrderDetailRepository).findByProduct(productId);
    if (orderDetails.length === 0) return 0;

    return orderDetails.map(({ quantity }) => quantity).reduce((acc, val) => acc + val, 0);
  }
}

export default new OrderDetailService();
