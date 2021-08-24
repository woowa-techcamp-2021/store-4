import { createQueryBuilder, EntityRepository, Repository } from 'typeorm';
import Order from '../models/order';

@EntityRepository(Order)
class OrderRepository extends Repository<Order> {
  findWithOrderDetails(userId: number): Promise<Order[]> {
    return createQueryBuilder(Order)
      .leftJoinAndSelect('Order.OrderDetails', 'orderDetails')
      .leftJoinAndSelect('OrderDetails.product', 'orderDetails.product')
      .where('user_id = :userId', { userId })
      .orderBy('created_at', 'DESC')
      .getMany();
  }
}

export default OrderRepository;
