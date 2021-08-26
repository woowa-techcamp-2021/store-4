import { createQueryBuilder, EntityRepository, Repository } from 'typeorm';
import Order from '../models/order';

@EntityRepository(Order)
class OrderRepository extends Repository<Order> {
  findWithOrderDetails(userId: number): Promise<Order[]> {
    return createQueryBuilder(Order)
      .leftJoinAndSelect('Order.orderDetails', 'orderDetails')
      .leftJoinAndSelect('orderDetails.product', 'orderDetails.product')
      .where('Order.user_id = :userId', { userId })
      .orderBy('Order.created_at', 'DESC')
      .getMany();
  }
}

export default OrderRepository;
