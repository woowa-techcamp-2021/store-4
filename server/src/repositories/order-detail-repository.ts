import { EntityRepository, Repository } from 'typeorm';
import OrderDetail from '../models/order-detail';

@EntityRepository(OrderDetail)
class OrderDetailRepository extends Repository<OrderDetail> {}

export default OrderDetailRepository;
