import { EntityRepository, Repository, createQueryBuilder } from 'typeorm';
import OrderDetail from '../models/order-detail';

@EntityRepository(OrderDetail)
class OrderDetailRepository extends Repository<OrderDetail> {
  async findByProduct(product: string): Promise<OrderDetail[]> {
    return createQueryBuilder(OrderDetail).where({ product }).getMany();
  }
}

export default OrderDetailRepository;
