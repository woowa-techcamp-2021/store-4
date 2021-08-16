import { getCustomRepository } from 'typeorm';
import OrderDetailRepository from '../repositories/order-detail-repository';

class OrderDetailService {
  async countTotalSalesOfProduct(productId: string): Promise<number> {
    const orderDetails = await getCustomRepository(OrderDetailRepository).findByProduct(productId);

    return orderDetails.reduce((acc, val) => acc + val.quantity, 0);
  }
}

export default new OrderDetailService();
