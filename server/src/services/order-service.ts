import { getCustomRepository } from 'typeorm';
import Order from '../models/order';
import OrderRepository from '../repositories/order-repository';

class OrderService {
  async findByUser(userId: number): Promise<Order[]> {
    const orders = await getCustomRepository(OrderRepository).findWithOrderDetails(userId);

    return orders;
  }
}

export default new OrderService();
