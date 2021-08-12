import { EntityRepository, Repository } from 'typeorm';
import Order from '../models/order';

@EntityRepository(Order)
class OrderRepository extends Repository<Order> {}

export default OrderRepository;
